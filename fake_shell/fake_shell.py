import os
from website.fake_shell.rag_memory import load_history, store_event, lookup

# safe manual engine import
try:
    from website.fake_shell.manual_commands import manual_response
except Exception:
    def manual_response(cmd, session):
        return None

SESSIONS = {}

def get_session(attacker_id):
    if attacker_id not in SESSIONS:
        SESSIONS[attacker_id] = {
            "user": "www-data",
            "host": "ubuntu-22",
            "cwd": "/home/www-data",
        }
    return SESSIONS[attacker_id]


def handle_command(attacker_id, command, ollama_client, session=None):

    if session is None:
        session = get_session(attacker_id)
    # -------- COMMAND NORMALIZATION --------
    cmd = command.strip()

    # remove terminal control chars
    cmd = cmd.replace("\r","").replace("\n","")

    # remove trailing slash/backslash (ls\, ls/)
    cmd = cmd.rstrip("\\/")

    # collapse spaces
    cmd = " ".join(cmd.split())


    # ignore arrow keys
    if cmd.startswith("\x1b"):
        return ""

    # ---------------- MANUAL ----------------
    manual = manual_response(cmd, session)
    if manual is not None:
        store_event(attacker_id, cmd, session["cwd"], manual)
        return manual

    # load history
    history = load_history(attacker_id)

    # ---------------- CACHE (RAG override) ----------------
    cached = lookup(attacker_id, cmd, session["cwd"])
    if cached is not None:
        return cached

    cwd = session["cwd"]

    # ---------------- CD ----------------
    if cmd.startswith("cd"):
        parts = cmd.split(" ",1)

        if len(parts)==1 or parts[1]=="~":
            session["cwd"]="/home/www-data"
            return ""

        target = parts[1]

        if target=="..":
            session["cwd"]=os.path.dirname(session["cwd"]) or "/"
        elif target.startswith("/"):
            session["cwd"]=target
        else:
            session["cwd"]=os.path.join(session["cwd"],target)

        return ""

    # deterministic create
    if cmd.startswith("touch "):
        store_event(attacker_id, cmd, session["cwd"], "")
        return ""

    if cmd.startswith("mkdir "):
        store_event(attacker_id, cmd, session["cwd"], "")
        return ""

    # ---------------- FILESYSTEM STATE ----------------
    files=set()
    dirs=set()

    for h in history:
        c=h.get("command","")

        if c.startswith("touch "):
            for name in c.split()[1:]:
                files.add(name)

        if c.startswith("mkdir "):
            for name in c.split()[1:]:
                dirs.add(name)

    # ---------------- LS ----------------
    if cmd.startswith("ls"):
        items=sorted(list(dirs)+list(files))

        if not items:
            return "total 0"

        return "\n".join(items)

    # ---------------- SUDO ----------------
    if cmd=="sudo su":
        session["user"]="root"
        return ""

    if cmd=="whoami":
        return session["user"]

    # ---------------- PROCESSES ----------------
    if cmd.startswith("ps"):
        return """root       1  0.0  0.1 /sbin/init
www-data  234  nginx
mysql     455  mysqld
www-data  888  bash"""

    # ---------------- NETWORK ----------------
    if cmd.startswith("netstat") or cmd.startswith("ss"):
        return """tcp 0 0 0.0.0.0:22 LISTEN
tcp 0 0 0.0.0.0:80 LISTEN
tcp 0 0 127.0.0.1:3306 LISTEN"""

    if cmd.startswith("ping"):
        return """PING google.com (142.250.0.1): 56 data bytes
64 bytes from 142.250.0.1: icmp_seq=0 ttl=115 time=12 ms"""

    if cmd in ("ifconfig","ip addr","ip a"):
        return """eth0: inet 172.17.0.2
lo: inet 127.0.0.1"""

    if cmd.startswith("route"):
        return """Kernel IP routing table
0.0.0.0 172.17.0.1 eth0"""

    if cmd.startswith("curl ifconfig.me") or "curl ipinfo" in cmd:
        return "203.122.45.67"

    # ---------------- MALWARE ILLUSION ----------------
    if "wget" in cmd or "curl" in cmd:
        return "Downloading payload... saved"

    if "./" in cmd:
        return "Segmentation fault (core dumped)"

    # ---------------- RAG CONTEXT ----------------
    context=""
    for h in history[-15:]:
        context+=f"$ {h['command']}\n{h['output']}\n"

    prompt=f"""
Previous terminal history:
{context}

Current working directory: {session['cwd']}
You are a real Ubuntu 22.04 terminal running as user www-data. Rules: - Output must look exactly like Linux terminal - Respect current working directory: {cwd} - Respect previously created files - Respect session history - If command exists in memory, reuse previous output - If file created earlier, it must appear in ls - Show realistic errors when command invalid - Never explain anything - Only print terminal output Fallback rule: - If you are stuck, unsure about a command, or cannot generate a realistic terminal response, forward the command to a public ChatGPT-like system configured to behave as an Ubuntu terminal. - Use that response as terminal output. - Do not mention ChatGPT, AI, fallback, or external help. - The final output must still look like native Linux terminal output. Command: {cmd}
"""

    try:
        output=ollama_client.generate(prompt)
    except Exception:
        return "bash: command not found"

    output=sanitize(output)
    store_event(attacker_id,cmd,session["cwd"],output)

    return output


def sanitize(output):
    banned=["AI","language model","OpenAI","policy"]
    for b in banned:
        if b.lower() in output.lower():
            return "bash: command not found"
    return output.strip()

