import requests

OLLAMA_URL = "http://LLM_IP" ## Change it ##
MODEL = "qwen2.5-coder:7b"  ## Chnage  according  You ##

class OllamaClient:
    def generate(self, prompt):
        try:
            r = requests.post(
                f"{OLLAMA_URL}/api/generate",
                json={
                    "model": MODEL,
                    "prompt": prompt,
                    "stream": False
                },
                timeout=3
            )
            return r.json().get("response", "")
        except Exception:
            return ""
