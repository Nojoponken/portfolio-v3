import axios from "axios";

const cloudinaryApi = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/dbgzn2j1t",
});

async function cloudinaryUpload(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "portfoliov3-thumbnail");

  const { data } = await cloudinaryApi.post("/image/upload", formData);
  return data;
}

export default cloudinaryUpload;
