import { deliveriesRouter } from "./deliveries.routes";
import express from "express";

function routerApi(app: any) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/deliveries", deliveriesRouter);
}

export { routerApi };
