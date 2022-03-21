import express from "express";
import { Bot } from "../types";
import { db } from "..";

const collection = "bots";

const botsRouter = express.Router();

botsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = db.collection(collection).doc(id);
    const item = await doc.get().then((doc) => {
      if (!doc.exists) {
        throw new Error("Not Found");
      } else {
        const data = doc.data();
        return { id: doc.id, ...data };
      }
    });
    console.log(item);
    return res.status(200).json({ message: "success", data: item });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

botsRouter.get("/", async (req, res) => {
  try {
    let query = db.collection(collection);
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      status: doc.data().status,
      location: {
        dropoff_lat: doc.data().location.dropoff_lat,
        dropoff_lon: doc.data().location.dropoff_lon,
      },
      zone_id: doc.data().zone_id,
    }));
    return res.status(200).json({ data: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
botsRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    let newBot: Bot = {
      status: body.status,
      location: {
        dropoff_lat: body.dropoff.dropoff_lat,
        dropoff_lon: body.dropoff.dropoff_lon,
      },
      zone_id: body.zone_id,
    };
    const result = await db.collection(collection).add(newBot);
    newBot.id = result.id;
    return res.status(201).json({ message: "created", data: newBot });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

botsRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const doc = db.collection(collection).doc(id);
    await doc.update({ ...body });
    return res.status(200).json({ message: "updated", id: id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

botsRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doc = db.collection(collection).doc(id);
    await doc.delete();
    return res.status(200).json({ message: "deleted", id: id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
export { botsRouter };
