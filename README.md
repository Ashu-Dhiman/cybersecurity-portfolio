🧠 TrapMind — AI-Driven Deception Honeypot
(CVE-2025-55182 Focused Research Edition)TrapMind is an intelligent web-based deception honeypot engineered specifically for controlled research and behavioral analysis of exploits related to CVE-2025-55182.This version is designed for localhost testing environments only and is not intended for public deployment.TrapMind detects exploit patterns, redirects attackers into a realistic AI-generated fake shell, and stores all interaction data using Retrieval Augmented Generation (RAG) for advanced behavioral analysis. 
<img width="2245" height="1587" alt="image" src="https://github.com/user-attachments/assets/d7ac1fc8-8003-4bbd-806b-434a0be7ce79" />
TrapMind is an intelligent web-based honeypot that detects attacker behavior and dynamically generates realistic fake shell interactions using Large Language Models (LLMs).
The system captures attacker commands, generates contextual responses, and continuously learns through Retrieval Augmented Generation (RAG).
TrapMind is designed for modern detection engineering, deception research, and autonomous security experimentation.
🎯 Special Focus: CVE-2025-55182
This build of TrapMind includes:
Custom detection patterns aligned with CVE-2025-55182 behavior
 -Payload structure monitoring
 -Exploit chain tracking
 -Controlled fake reverse shell simulation
 -Session capture for exploit research
The objective is to observe attacker behavior after initial exploitation attempt.
🚀 Core Features
🎭 Web-based deception honeypot
🧪 CVE-2025-55182 pattern detection module
💻 AI-generated fake reverse shell
🤖 LLM powered contextual command responses
🧠 RAG memory for interaction learning
📝 Full session logging & replay
✍️ Manual analyst response injection
📊 Threat intelligence dataset creation
🔒 Localhost isolated execution environment
🧩 System Workflow
1.Attacker interacts with vulnerable endpoint.
2.Detection engine checks exploit signature.
3.If CVE pattern matches → attacker redirected to fake shell.
4.LLM dynamically generates shell responses.
5.Commands and outputs stored in RAG memory.
6.Analyst can override or inject custom responses.
7.Session stored for exploit behavior study.
🏗️ Architecture Overview
Attacker
→ Vulnerable Endpoint (Simulated CVE-2025-55182)
→ Detection Engine
→ Fake Shell Interface
→ LLM Response Engine
→ RAG Memory (Vector Store)
→ Log Storage
→ Analyst Dashboard
🛠️ Technology Stack
1.Python
2.FastAPI / Flask
3.Docker (localhost deployment)
4.Vector Database (FAISS / Chroma)
5.LLM (OpenAI or local model)
6.Optional: Elasticsearch / Wazuh
📈 Future Enhancements
-> Multi-CVE simulation engine
-> Automated exploit behavior clustering
-> AI-generated Sigma rule suggestions
-> Attacker persona modeling
-> Full SOC simulation mode
🧪 Proof of Concept (POC)
This section demonstrates TrapMind detecting a CVE-2025-55182 exploit attempt and redirecting the attacker into an AI-generated fake shell environment.
🔎 1️⃣ Exploit Attempt Detection
Attacker sends crafted payload
Detection engine matches CVE signature
Session flagged and redirected
<img width="1398" height="627" alt="Screenshot 2026-03-02 110848" src="https://github.com/user-attachments/assets/a31d9b69-73e5-4691-87b8-344228af1188" />
<img width="1420" height="473" alt="Screenshot 2026-03-02 112155" src="https://github.com/user-attachments/assets/b20bbea0-2e79-4f8d-a24a-de85be150722" />
💻 2️⃣ Fake Shell Activation
Once the exploit pattern matches, TrapMind deploys a controlled fake shell environment.
No real command execution
Fully simulated Linux environment
Safe sandbox behavior
🤖 3️⃣ AI-Generated Command Responses
All shell outputs are dynamically generated using LLM logic.
Context-aware responses
Realistic Linux output simulation
Command history tracking
<img width="1586" height="918" alt="Screenshot 2026-03-02 112345" src="https://github.com/user-attachments/assets/c9a5fff5-f679-4254-bfbd-a42b2bcf2d91" />
<img width="1209" height="859" alt="Screenshot 2026-03-02 112423" src="https://github.com/user-attachments/assets/36afa3ab-f9c9-4080-adf6-95a043d9b210" />
🧠 4️⃣ RAG Memory Storage
Every attacker interaction is stored in vector memory for:
Behavioral analysis
Pattern improvement
Research dataset creation
<img width="1587" height="905" alt="Screenshot 2026-03-02 112619" src="https://github.com/user-attachments/assets/b1dc0f41-dab6-4e18-bbb1-824d3ea2fffa" />
<img width="1264" height="922" alt="Screenshot 2026-03-02 112637" src="https://github.com/user-attachments/assets/f3360b50-2872-4f73-a5df-b70383756378" />


