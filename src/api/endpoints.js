import api from "./api";


export async function registerCustomer(payload){
    const res = await api.post("/customers/register", payload);
    return res.data;
}

export async function uploadResume(file){
    const fd = new FormData();
    fd.append("file", file);

    const res = await api.post("/resume/upload", fd);
    return res.data;
}


export async function matchScore(resumeId, jobDescription){
    const params = new URLSearchParams();
    params.append("resumeId", resumeId);
    params.append("jobDescription", jobDescription);

    const res = await api.post(`/resume/match?${params.toString()}`);
    return res.data
}


export async function optimizeResume(resumeId, jobDescription){

    const res = await api.post(`/resume/${resumeId}/optimize`, jobDescription, {
     headers: {"Content-Type": "text/plain"},
    });
    return res.data;
}

export async function loginCustomer(payload){
    const res = await api.post("/auth/login", payload);
    return res.data;
}

