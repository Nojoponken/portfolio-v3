import dotenv from "dotenv";
dotenv.config({
  path: new URL("../.env", import.meta.url).pathname,
});

const originsString = process.env.ALLOWED_ORIGINS || "";

const allowedOrigins = originsString.split(",").map((item) => item.trim());

export default allowedOrigins;
