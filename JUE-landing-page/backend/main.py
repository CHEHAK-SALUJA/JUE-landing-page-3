from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
from dotenv import load_dotenv

# Load Environment Variables from absolute path
env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=env_path)

app = FastAPI(title="JUE University API")

# Enable CORS for React frontend (Using Environment Variable with Fallbacks)
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
origins = [
    frontend_url,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

print(f"DEBUG: Configured CORS for origins: {origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Knowledge Base
KNOWLEDGE_PATH = os.path.join(os.path.dirname(__file__), "knowledge.json")
try:
    with open(KNOWLEDGE_PATH, "r", encoding="utf-8") as f:
        knowledge_base = json.load(f)
except Exception as e:
    knowledge_base = {}
    print(f"Error loading knowledge base: {e}")

class Inquiry(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ChatMessage(BaseModel):
    message: str

@app.get("/")
async def root():
    return {"message": "JUE University API is running"}

@app.post("/inquiry")
async def submit_inquiry(inquiry: Inquiry):
    return {"status": "success", "message": f"Thank you {inquiry.name}, your inquiry has been received."}

@app.post("/chat")
async def chat_response(chat: ChatMessage):
    query = chat.message.lower()
    
    # Simple keyword-based logic for institutional knowledge
    if "shibuya" in query:
        info = knowledge_base["campuses"]["shibuya"]
        return {"answer": f"The {info['name']} is {info['atmosphere']} It's located at {info['address']}. You can contact them at {info['contact']}.", "reference": info["reference"]}
    
    if "fukuoka" in query:
        info = knowledge_base["campuses"]["fukuoka"]
        return {"answer": f"The {info['name']} is {info['atmosphere']} It's located at {info['address']}. You can contact them at {info['contact']}.", "reference": info["reference"]}
    
    if "kobe" in query:
        info = knowledge_base["campuses"]["kobe"]
        return {"answer": f"The {info['name']} is {info['atmosphere']} It's located at {info['address']}. You can contact them at {info['contact']}.", "reference": info["reference"]}
    
    if "esports" in query or "gaming" in query:
        info = knowledge_base["programs"]["special_courses"][0]
        return {"answer": f"JUE offers a unique {info['name']}! {info['description']}", "reference": info["reference"]}
    
    if "scholarship" in query or "tuition" in query:
        info = knowledge_base["admissions"]
        s_names = ", ".join([s["name"] for s in info["scholarships"]])
        return {"answer": f"JUE offers several scholarships for international students, including: {s_names}. {info['requirements']}", "reference": info["reference"]}
    
    if "admission" in query or "apply" in query or "requirement" in query:
        info = knowledge_base["admissions"]
        return {"answer": f"Admission requirements include: {info['requirements']} The process involves document review and an interview.", "reference": info["reference"]}
    
    if "dorm" in query or "hostel" in query or "living" in query or "house" in query:
        info = knowledge_base["support"]
        return {"answer": f"{info['dorms']} {info['center']}", "reference": info["reference"]}
    
    if "support" in query or "help" in query:
        info = knowledge_base["support"]
        return {"answer": f"{info['center']}", "reference": info["reference"]}

    return {
        "answer": "I can help you with information about our campuses (Fukuoka, Shibuya, Kobe), admissions, scholarships, eSports courses, and student life. What would you like to know?",
        "reference": "https://www.jue.ac.jp/en/"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
