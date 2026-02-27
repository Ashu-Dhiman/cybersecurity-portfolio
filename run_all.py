import subprocess
import signal
import sys
import time

processes = []

def start(name, cmd):
    print(f"[+] Starting {name}")
    p = subprocess.Popen(
        cmd,
        cwd="/",
        stdout=sys.stdout,
        stderr=sys.stderr
    )
    processes.append(p)
    time.sleep(1)

def shutdown(sig, frame):
    print("\n[!] Stopping all services...")
    for p in processes:
        try:
            p.terminate()
        except Exception:
            pass
    sys.exit(0)

signal.signal(signal.SIGINT, shutdown)
signal.signal(signal.SIGTERM, shutdown)

# --------------------------------------------------
# START SERVICES USING MODULE MODE
# --------------------------------------------------

start(
    "Pattern Matcher (9001)",
    ["python3", "-m", "website.matcher.matcher"]
)

start(
    "Gate Service (8081)",
    ["python3", "-m", "website.gate.gate"]
)

print("\n[✓] All honeypot Python services are running")
print("[✓] Press Ctrl+C to stop everything\n")

while True:
    time.sleep(10)
