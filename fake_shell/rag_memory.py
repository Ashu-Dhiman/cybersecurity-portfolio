import json
import os
from datetime import datetime

RAG_DIR = "/website/data/rag" ## Change #
os.makedirs(RAG_DIR, exist_ok=True)

def _file(attacker_id):
    return os.path.join(RAG_DIR, f"{attacker_id}.json")

def load_history(attacker_id):
    path = _file(attacker_id)
    if not os.path.exists(path):
        return []
    with open(path, "r") as f:
        try:
           return json.load(f)
        except Exception:
            return []
def store_event(attacker_id, command, cwd, output):
    history = load_history(attacker_id)
    history.append({
        "time": datetime.utcnow().isoformat(),
        "command": command,
        "cwd": cwd,
        "output": output
    })
    tmp = _file(attacker_id) + ".tmp"

    with open(tmp, "w") as f:
        json.dump(history, f, indent=2)
    
    os.replace(tmp, _file(attacker_id))

def lookup(attacker_id, command, cwd):
    history = load_history(attacker_id)

    for h in reversed(history):
        if h.get("command") != command:
            continue

        # backward compatibility:
        if "cwd" not in h:
            return h.get("output")

        if h["cwd"] == cwd:
            return h.get("output")

    return None

