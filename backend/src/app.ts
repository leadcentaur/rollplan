import "dotenv/config";
import express from "express";

import usersRoutes from "./routes/users";
import rollplanRoutes from "./routes/rollplan";

import cors from "cors"
import env from "./env";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler";
import createHttpError from "http-errors";
import session from "express-session";
import sessionConfig from "./config/session";
import passport from "passport";
import "./config/passport";
import requiresAuth from "./middlewares/requiresAuth";

const app = express();

app.use(morgan("dev"))
app.use(express.json());

app.use(cors({origin: env.WEBSITE_URL, credentials: true}));

app.use(session(sessionConfig));

app.use(passport.authenticate("session"));

app.use("/users", usersRoutes);
app.use("/app", requiresAuth, rollplanRoutes);

app.use((req, res, next) => next(createHttpError(404, "Endpoint not found")));

app.use(errorHandler);

export default app;