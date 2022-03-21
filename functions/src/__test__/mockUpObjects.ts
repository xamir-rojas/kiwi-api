import { Delivery, Bot } from "../types";
import { faker } from "@faker-js/faker";

const mockUpDelivery: Delivery = {
  creation_date: new Date(),
  state: "pending",
  pickup: {
    pickup_lat: Number(faker.address.latitude()),
    pickup_lon: Number(faker.address.longitude()),
  },
  dropoff: {
    dropoff_lat: Number(faker.address.latitude()),
    dropoff_lon: Number(faker.address.longitude()),
  },
  zone_id: faker.datatype.uuid(),
};

const mockUpBot: Bot = {
  status: "available",
  location: {
    dropoff_lat: Number(faker.address.latitude()),
    dropoff_lon: Number(faker.address.longitude()),
  },
  zone_id: faker.datatype.uuid(),
};

export { mockUpBot, mockUpDelivery };
