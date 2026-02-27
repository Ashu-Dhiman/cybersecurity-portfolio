import json

PATTERN_FILE = "/website/patterns/pattern.json" # Chnage ##3

def load_patterns():
    with open(PATTERN_FILE, "r") as f:
        data = json.load(f)
    return data.get("patterns", [])


