import { cleanEnv, port, str } from "envalid";

const env = cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MONGO_CONNECTION_STRING: str(),
    WEBSITE_URL: str(),
    SERVER_URL: str(),
    SESSION_SECRET: str(),
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    SMTP_PASSWORD: str(),
});

export default env;