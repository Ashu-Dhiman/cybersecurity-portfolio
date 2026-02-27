import json
import os
import uuid
from datetime import datetime

LOG_DIR = "/website/data/sessions" # Change #
 os.makedirs(LOG_DIR, exist_ok=True)


def now():
    return datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S")


def new_session(attacker_ip, port):
    session_id = uuid.uuid4().hex[:8]

    data = {
        "session_id": session_id,
        "attacker_ip": attacker_ip,
        "port": port,
        "start_time": now(),
        "events": []
    }

    with open(f"{LOG_DIR}/{session_id}.json", "w") as f:
        json.dump(data, f, indent=2)

    return session_id


def log_event(session_id, event_type, data):
    path = f"{LOG_DIR}/{session_id}.json"

    if not os.path.exists(path):
        return

    with open(path, "r") as f:
        session_data = json.load(f)

    session_data["events"].append({
        "time": now(),
        "type": event_type,
        "data": data
    })

    with open(path, "w") as f:
        json.dump(session_data, f, indent=2)

