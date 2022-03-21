import { deliveriesRouter } from "./deliveries.routes";
import { botsRouter } from "./bots.routes";
import express from "express";

function routerApi(app: any) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/deliveries", deliveriesRouter);
  router.use("/bots", botsRouter);
}

export { routerApi };
