from flask import Flask, request
import datetime
import json
import base64
import os

app = Flask(__name__)

LOG_FILE = "/var/log/nginx/honeypot_access.log"
os.makedirs("/honeypot_access.log", exist_ok=True)

IST_OFFSET = datetime.timedelta(hours=5, minutes=30)

def ist_now():
    return (datetime.datetime.utcnow() + IST_OFFSET).isoformat()

def get_real_ip():
    if request.headers.get("X-Forwarded-For"):
        return request.headers.get("X-Forwarded-For").split(",")[0].strip()
    return request.remote_addr


def log_request():
    raw_body = request.get_data()

    if raw_body:
        try:
            body = raw_body.decode("utf-8")
            body_type = "text"
        except Exception:
            body = base64.b64encode(raw_body).decode()
            body_type = "base64"
    else:
        body = ""
        body_type = "none"

    event = {
        "time": ist_now(),
        "remote_ip": request.headers.get("X-Real-IP", request.remote_addr),
        "remote_port": request.headers.get("X-Remote-Port", "unknown"),
        "local_ip": request.headers.get("X-Local-IP", "unknown"),
        "local_port": request.headers.get("X-Local-Port", "unknown"),
        "attack_data": {
            "method": request.method,
            "path": request.path,
            "full_path": request.full_path,
            "query_string": request.query_string.decode(errors="ignore"),
            "headers": {
                "User-Agent": request.headers.get("User-Agent"),
                "Content-Type": request.headers.get("Content-Type"),
                "Content-Length": request.headers.get("Content-Length")
            },
            "body_type": body_type,
            "body": body
        }
    }

    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(event) + "\n")


# -------------------------------------------------
# 🔹 Hidden JS Beacon Endpoint (SAME LOG FORMAT)
# -------------------------------------------------

@app.route("/__hp_collect__", methods=["POST"])
def hp_collect():
    # Reuse SAME logging structure
    raw_body = request.get_data()

    try:
        body = raw_body.decode("utf-8")
        body_type = "text"
    except Exception:
        body = base64.b64encode(raw_body).decode()
        body_type = "base64"

    event = {
        "time": ist_now(),
        "remote_ip": request.headers.get("X-Real-IP", request.remote_addr),
        "remote_port": request.headers.get("X-Remote-Port", "unknown"),
        "local_ip": request.headers.get("X-Local-IP", "unknown"),
        "local_port": request.headers.get("X-Local-Port", "unknown"),
        "attack_data": {
            "method": request.method,
            "path": request.path,
            "full_path": request.full_path,
            "query_string": request.query_string.decode(errors="ignore"),
            "headers": {
                "User-Agent": request.headers.get("User-Agent"),
                "Content-Type": request.headers.get("Content-Type"),
                "Content-Length": request.headers.get("Content-Length")
            },
            "body_type": body_type,
            "body": body
        }
    }

    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(event) + "\n")

    return "", 204


# -------------------------------------------------
# 🔹 JasperServer realistic endpoints
# -------------------------------------------------

@app.route("/jasperserver", methods=["GET", "POST"])
@app.route("/jasperserver/login.html", methods=["GET", "POST"])
@app.route("/reportservice", methods=["GET", "POST"])
@app.route("/flow.html", methods=["GET", "POST"])
@app.route("/rest_v2/reports", methods=["GET", "POST"])
def jasper_endpoints():
    log_request()
    return "OK", 200


# -------------------------------------------------
# 🔹 Catch-all for ANY path
# -------------------------------------------------

@app.route("/", defaults={"path": ""}, methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
@app.route("/<path:path>", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
def catch_all(path):
    log_request()
    return "OK", 200


# -------------------------------------------------
# 🔹 App start
# -------------------------------------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
