import "dotenv/config";
import express from "express";

import usersRoutes from "./routes/users";
import academyRoutes from "./routes/academy";
import onboardingRoutes from "./routes/onboardings";
import calendarRoutes from "./routes/calendar";
import logeventRoutes from "./routes/log-event";
import memberRoutes from "./routes/members";

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

app.use("/src/uploads/profile-pictures", express.static("src/uploads/profile-pictures"));
app.use("/src/uploads/academy-logos", express.static("src/uploads/academy-logos"));

app.use("/users", usersRoutes);
app.use("/app", requiresAuth);
app.use("/academy", academyRoutes);
app.use("/members", memberRoutes);
app.use("/calendar", calendarRoutes)
app.use("/onboarding", onboardingRoutes);
app.use("/logevent", logeventRoutes);

app.use((req, res, next) => next(createHttpError(404, "Endpoint not found")));

app.use(errorHandler);

export default app;