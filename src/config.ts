import dotenv from 'dotenv'; 

dotenv.config();

export const apiUrl = process.env.BaseUrl;
export const apiKey = process.env.OMDbApiKey;
