import { useState } from "react";
import { uploadResume, matchScore, optimizeResume } from "../api/endpoints";

export default function ResumeTool() {
  const [file, setFile] = useState(null);
  const [resumeId, setResumeId] = useState("");
  const [jd, setJd] = useState("");
  const [score, setScore] = useState("");
  const [optimized, setOptimized] = useState("");
  const [msg, setMsg] = useState("");
    
  function cleanText(text){
    if(!text) return "";

    return text 
              .replace(/#{1,6}\s?/g, "")
              .replace(/\*\*|\*|__/g, "")
              .replace(/`{1,3}/g, "")
              .replace(/^\s*[-*+]\s+/gm, "")
              .trim();

  }


  const requireAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMsg("Please login first 🔐");
      return false;
    }
    return true;
  };

  const doUpload = async () => {
    if (!requireAuth()) return; 
    if (!file) return setMsg("Please choose a PDF file");

    setMsg("Uploading...");
    setScore("");
    setOptimized("");

    try {
      const resume = await uploadResume(file);
      setResumeId(resume.id);
      setMsg(`Uploaded Successfully ✅`);
    } catch (err) {
      setMsg(err?.response?.data?.message || "Upload failed");
    }
  };



  const doMatch = async () => {
    if (!requireAuth()) return; 
    if (!resumeId) return setMsg("Upload resume first (need resumeId)");
    if (!jd.trim()) return setMsg("Paste job description first");

    setMsg("Matching...");
    setScore("");

    try {
      const s = await matchScore(resumeId, jd);

      const cleaned = cleanText(s);
      
      setScore(cleaned);
      setMsg("Match done ✅");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Match failed");
    }
  };

  const doOptimize = async () => {
    if (!requireAuth()) return; 
    if (!resumeId) return setMsg("Upload resume first (need resumeId)");
    if (!jd.trim()) return setMsg("Paste job description first");

    setMsg("Optimizing...");
    setOptimized("");

    try {
      const text = await optimizeResume(resumeId, jd);

      const cleanedText = cleanText(text);

      setOptimized(cleanedText);
      setMsg("Optimized Succesfully ✅");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Optimize failed");
    }
  };

  return (
    <div className="container fade-in">
      <div className="hero">
        <h1>Resume Matcher</h1>
        <p>Upload resume → paste JD → get score & AI optimization ✨</p>
      </div>
  
      <div className="grid">
        <section className="card lift">
          <h3>1) Upload Resume</h3>
          <div className="row">
            <input className="file" type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <button className="btn primary" onClick={doUpload}>Upload</button>
          </div>
          {resumeId && <div className="pill"></div>}
        </section>
  
        <section className="card lift">
          <h3>2) Job Description</h3>
          <textarea
            className="textarea"
            rows={9}
            placeholder="Paste job description here..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
          <div className="actions">
            <button className="btn ghost" onClick={doMatch}>Get Match Score</button>
            <button className="btn primary" onClick={doOptimize}>Optimize Resume</button>
          </div>
        </section>
      </div>
  
      {(score || optimized) && (
        <section className="card result fade-in">
          {score && (
            <>
              <h3>Match Score</h3>
              <pre className="pre">{score}</pre>
              <div className="divider" />
            </>
          )}
  
          {optimized && (
            <>
              <h3>Optimized Resume</h3>
              <pre className="pre">{optimized}</pre>
            </>
          )}
        </section>
      )}
  
      {msg && <div className="toast pop">{msg}</div>}
    </div>
  );
}