import express from "express";
import { Delivery } from "../types";
import { db } from "..";

const collection = "deliveries";

const deliveriesRouter = express.Router();

deliveriesRouter.get("/:id", async (req, res) => {
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
deliveriesRouter.get("/", async (req, res) => {
  try {
    let query = db.collection(collection);
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      creation_date: doc.data().date,
      state: doc.data().state,
      pickup: {
        pickup_lat: doc.data().pickup.pickup_lat,
        pickup_lon: doc.data().pickup.pickup_lon,
      },
      dropoff: {
        dropoff_lat: doc.data().dropoff.dropoff_lat,
        dropoff_lon: doc.data().dropoff.dropoff_lon,
      },
      zone_id: doc.data().zone_id,
    }));
    return res.status(200).json({ data: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
deliveriesRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    let newDelivery: Delivery = {
      creation_date: new Date(),
      state: body.state,
      pickup: {
        pickup_lat: body.pickup.pickup_lat,
        pickup_lon: body.pickup.pickup_lon,
      },
      dropoff: {
        dropoff_lat: body.dropoff.dropoff_lat,
        dropoff_lon: body.dropoff.dropoff_lon,
      },
      zone_id: body.zone_id,
    };
    const result = await db.collection("deliveries").add(newDelivery);
    newDelivery.id = result.id;
    return res.status(201).json({ message: "created", data: newDelivery });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

deliveriesRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doc = db.collection(collection).doc(id);
    await doc.delete();
    return res.status(200).json({ message: "deleted", id: id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
export { deliveriesRouter };
