import * as functions from "firebase-functions";
import express from "express";
import admin from "firebase-admin";
import { routerApi } from "./routes/index.routes";


const app = express();

const serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to kiwi-api!" });
});
app.use(express.json());
routerApi(app);

let kiwiFunctions = functions.https.onRequest(app);
const db = admin.firestore();

export { kiwiFunctions, db };
