from flask import Flask, request, Response
import requests, time, threading

from website.fake_shell.socket_shell import start_fake_socket_shell
from website.fake_shell.fake_shell import handle_command
from website.fake_shell.ollama_client import OllamaClient

MATCHER = "http://127.0.0.1:9001/match"
LOGGER  = "http://127.0.0.1:5000"

ACTIVE_SHELLS = {}
STARTED_SHELLS = set()
SHELL_TTL = 300

def shell_active(attacker):
    ts = ACTIVE_SHELLS.get(attacker)
    if not ts:
        return False
    if time.time() - ts > SHELL_TTL:
        ACTIVE_SHELLS.pop(attacker, None)
        STARTED_SHELLS.discard(attacker)
        return False
    return True

ollama = OllamaClient()
app = Flask(__name__)

@app.route("/", defaults={"path": ""}, methods=["GET","POST","PUT","DELETE","PATCH"])
@app.route("/<path:path>", methods=["GET","POST","PUT","DELETE","PATCH"])
def gate(path):

    attacker_id = request.remote_addr or "unknown"

    # GET → logger only
    if request.method == "GET":
        r = requests.request(
            method=request.method,
            url=f"{LOGGER}/{path}",
            headers=request.headers,
            data=request.get_data(),
            allow_redirects=False
        )
        return Response(r.content, r.status_code, r.headers.items())

    payload = {
        "method": request.method,
        "headers": {"Content-Type": request.headers.get("Content-Type", "")},
        "body": request.get_data(as_text=True)
    }

    try:
        r = requests.post(MATCHER, json=payload, timeout=2)
        matched_now = r.json().get("matched", False)
    except Exception:
        matched_now = False

    if matched_now:
        print(">>> MATCHED REQUEST FROM:", attacker_id)
        ACTIVE_SHELLS[attacker_id] = time.time()

        if attacker_id not in STARTED_SHELLS:
            STARTED_SHELLS.add(attacker_id)
            print(f"[+] Starting fake interactive shell for {attacker_id}")

            try:
                thread = threading.Thread(
                    target=start_fake_socket_shell,
                    args=(4444, attacker_id, ollama),
                    daemon=True
                )
                thread.start()
                print(">>> THREAD STARTED")
            except Exception as e:
                print(">>> THREAD ERROR:", e)

        matched = True
    else:
        matched = shell_active(attacker_id)

    if not matched:
        r = requests.request(
            method=request.method,
            url=f"{LOGGER}/{path}",
            headers=request.headers,
            data=request.get_data(),
            allow_redirects=False
        )
        return Response(r.content, r.status_code, r.headers.items())

    command = request.get_data(as_text=True).strip()

    # exploit payload → silent 200 OK
    if any(x in command for x in ("spawn(", "Socket", "child_process", "__proto__")):
        return Response("", 200)

    output = handle_command(attacker_id, command, ollama)
    return Response(output + "\n", 200, mimetype="text/plain")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8081)
