import { rateLimit } from "express-rate-limit";
import { framework } from "passport";

export const loginRateLimit = rateLimit({
    windowMs: 3 * 60 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
})

export const requestVerificationCodeRateLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,
});

export const uploadImageRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,
});

export const createAcademyRateLimit = rateLimit({
    windowMs: 10 * 60 * 60,
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,    
});

export const updateAcademyRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 40,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,
});
