// deploy.js
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import axios from 'axios';

const html = fs.readFileSync('./dist/index.html', 'utf8');

const SERVICE_NOW_URL = process.env.VITE_DEV_URL;
const USER = process.env.VITE_REACT_APP_USER;
const PASS = process.env.VITE_REACT_APP_PASSWORD;
const deployUrl = SERVICE_NOW_URL + process.env.VITE_DEPLOY_PATH;
console.log("Deploying to:", deployUrl);

axios.post(
  `${SERVICE_NOW_URL}${process.env.VITE_DEPLOY_PATH}`,
  {
    property: process.env.VITE_DEPLOY_PROP,
    html,
  },
  {
    auth: {
      username: USER,
      password: PASS,
    },
  }
).then(() => {
  console.log("✅ Deployed successfully!");
}).catch((err) => {
  console.error("❌ Deployment failed:", err.response?.data || err.message);
});
