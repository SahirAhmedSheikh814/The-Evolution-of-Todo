import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true, // Important for HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});


// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// if (!API_URL) {
//   throw new Error("NEXT_PUBLIC_API_URL is not defined");
// }

// export const api = axios.create({
//   baseURL: `${API_URL}/api/v1`,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
