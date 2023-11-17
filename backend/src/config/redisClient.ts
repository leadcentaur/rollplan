import { createClient } from "redis";

// redis impl
const redisClient = createClient();
redisClient.connect().catch(console.error);

export default redisClient;