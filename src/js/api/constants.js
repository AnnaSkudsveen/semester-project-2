import { getKey } from "./auth/key.js";

export const API_KEY = "a5cebe50-8176-4f85-b1dc-180e70dfcb04";
// export const TEST_API_KEY = `${API}`

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_AUCTION = `${API_BASE}/auction`;

export const API_AUCTION_POSTS = `${API_AUCTION}/listings`;

export const API_AUCTION_PROFILES = `${API_AUCTION}/profiles`;
