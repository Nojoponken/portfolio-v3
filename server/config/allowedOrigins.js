import "dotenv/config.js";

const originsString = process.env.ALLOWED_ORIGINS || "";

const allowedOrigins = originsString.split(",").map((item) => item.trim());

export default allowedOrigins;
