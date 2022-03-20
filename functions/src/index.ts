import * as functions from "firebase-functions";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

let kiwiFunctions = functions.https.onRequest(app);
export { kiwiFunctions };
