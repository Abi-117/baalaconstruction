import axios from "axios";

const API = axios.create({
  baseURL: "https://baalaconstruction.onrender.com",
});


export const getProjects = () =>
  API.get("/api/projects");


export const createProject = (data: FormData) =>
  API.post("/api/projects", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


export const updateProject = (
  id: string,
  data: FormData
) =>
  API.put(`/api/projects/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


export const deleteProject = (id: string) =>
  API.delete(`/api/projects/${id}`);