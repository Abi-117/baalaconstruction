import axios from "axios";

const API = axios.create({
  baseURL: "https://baalaconstruction.onrender.com/api/gallery",
});

export const getGallery = () => API.get("/");

export const createGallery = (formData: FormData) =>
  API.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateGallery = (
  id: string,
  formData: FormData
) =>
  API.put(`/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteGallery = (id: string) =>
  API.delete(`/${id}`);