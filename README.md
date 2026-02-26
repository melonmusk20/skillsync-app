
# <img src="src/assets/icon.png" width="30" height="50"/> SkillSync – AI-Powered Resume Intelligence Platform

   Production-ready full-stack AI system for resume analysis, optimization, and       job match scoring.

SkillSync is a secure, scalable AI-powered web application that enables users to:

 • 📄 Upload resumes (PDF)

 • 🎯 Analyze job-description match score

 • ✨ Optimize resumes using LLM (Gemini API)

 • 🔐 Authenticate securely using JWT

 • 🌐 Use a fully deployed production system (Vercel + Render) 


# 🌍 Live Deployment

Frontend (Vercel):
👉 https://skillsync-app-coral.vercel.app/


Backend (Render):
👉 https://skillsync-ai-zx81.onrender.com

# 🏗 System Architecture
<img width="2381" height="326" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/db2f4b8a-268b-415c-8d9d-70f83acc5cd8" />

# 🧠 Core Engineering Features

🔐 Authentication & Security

 • Stateless JWT authentication

 • Spring Security filter chain

 • Axios interceptor for automatic token injection

 • Protected endpoints

 • CORS configured for production

# 📄 Resume Upload System

  • PDF file upload using multipart/form-data

  •  Resume metadata stored in database

  •  Secured endpoint access

 # 🎯 Match Score Engine 
   
 • Resume vs Job Description comparison

 • AI-powered scoring logic

 • Markdown cleaning layer for UI display

# ✨ Resume Optimization Engine

 • LLM-based resume rewriting

 • ATS-friendly content suggestions

 • AI markdown sanitization before rendering

#  ⚙️ Tech Stack

   🖥 Frontend

   • React (Vite)

   • Axios

   • React Router

   • Responsive animated UI

   • Environment-based configuration

   • Hosted on Vercel

  ⚙ Backend

   • Spring Boot

   • Spring Security (JWT)

   • Hibernate / JPA

   • PostgreSQL

   • RESTful APIs

   • Hosted on Render

🤖 AI Layer

  • Gemini API integration
 
  • Prompt engineering

  • Markdown response cleanup

# 🔐 Authentication Flow

  1. User registers / logs in

  2. Backend generates JWT token

  3. Token stored in localStorage

  4. Axios interceptor attaches:

     ```js
     Authorization: Bearer <token>
     ```



      ## 📂 Project Structure

```bash
skill-sync/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── api.js
│   │   │   └── endpoints.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ResumeTool.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   └── JwtAuthFilter.java
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   └── application.properties
│
└── README.md
```

## 📂 Frontend Structure

```bash
src/
│
├── api/
│   ├── api.js
│   └── endpoints.js
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── ResumeTool.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

## 📂 Backend Structure

```bash
src/main/java/com/skillsync/
│
├── config/
│   ├── SecurityConfig.java
│   └── JwtAuthFilter.java
│
├── controller/
├── service/
├── repository/
├── model/
└── ResumeMatcherApplication.java
```
# Local Development Setup 

 Frontend 
 ```bash
npm install
npm run dev
```
 Runs on:
 ```Code
http://localhost:5173
```

 Backend
 ```bash
mvn clean install
mvn spring-boot:run
```
 Runs on:
 ```Code
http://localhost:8080
```

# 🧩 Production Considerations

  • Stateless authentication

  • Secure CORS configuration

  • Environment variable isolation

  • Render cold start handling

  • AI markdown cleanup before UI render

  • Cloud deployment automation via GitHub


