import socket
from website.fake_shell.fake_shell import handle_command, get_session
from website.fake_shell.session_logger import new_session, log_event

PROMPT = "www-data@ubuntu-22:/home/www-data$"

def start_fake_socket_shell(port, attacker_id, ollama):

    print(">>> Socket shell function called")
    print(">>> Binding on port:", port)

    s = socket.socket()
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind(("0.0.0.0", port))
    s.listen(1)

    conn, addr = s.accept()

    # ⭐ create logging session
    session_id = new_session(addr[0], port)

    log_event(session_id, "connection", {
        "message": "Shell connected"
    })

    # ⭐ your existing session logic
    session = get_session(attacker_id)

    conn.sendall(PROMPT.encode())

    while True:
        data = conn.recv(4096)
        if not data:
            break

        cmd = data.decode(errors="ignore").strip()
        if cmd in ("exit", "logout"):
            log_event(session_id, "disconnect", {
                "message": "Attacker disconnected"
            })
            break

        # ⭐ your existing command handling
        output = handle_command(attacker_id, cmd, ollama, session)

        # ⭐ log request + response
        log_event(session_id, "command", {
            "command": cmd,
            "output": output
        })

        if output:
            conn.sendall((output + "\n").encode())

        conn.sendall(PROMPT.encode())

    conn.close()
    s.close()
