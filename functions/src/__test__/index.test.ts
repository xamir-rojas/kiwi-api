import request from "supertest";
import test from "firebase-functions-test";
import sinon from "sinon";
import admin from "firebase-admin";

import { kiwiFunctions } from "../index";
import { faker } from "@faker-js/faker";
import { Delivery } from "../types";
import { assert } from "console";

let adminInitStub;
const functionsTest = test();

const apiURL = "/api/v1/deliveries/";

beforeAll(() => {
  adminInitStub = sinon.stub(admin, "initializeApp");
});

afterAll(() => {
  adminInitStub.restore();
  functionsTest.cleanup();
});

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

console.log(mockUpDelivery);
/*
const mockUpBot = {
  status: "available",
  location: {
    dropoff_lat: faker.address.latitude(),
    dropoff_lon: faker.address.longitude(),
  },
  zone_id: faker.datatype.uuid(),
};
*/

describe("Test example", () => {
  it("GET /", (done) => {
    request(kiwiFunctions)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual("Welcome to kiwi-api!");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe("Deliveries API", () => {
  it("GET All Deliveries ", (done) => {
    request(kiwiFunctions)
      .get(apiURL)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.length).toEqual(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  it("GET /deliveries/:id", (done) => {
    let deliveryId: string;
    request(kiwiFunctions)
      .post(apiURL)
      .expect("Content-Type", /json/)
      .send(mockUpDelivery)
      .expect(201)
      .expect((res) => {
        deliveryId = res.body.data.id;
        console.log("delivery ID:", deliveryId);
      })
      .end(() => {
        request(kiwiFunctions)
          .get(apiURL + deliveryId)
          .expect("Content-Type", /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body.data.id).toEqual(deliveryId);
            expect(res.body.data.zone_id).toEqual(mockUpDelivery.zone_id);
          })
          .end(() => {
            request(kiwiFunctions)
              .delete(apiURL + deliveryId)
              .expect("Content-Type", /json/)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err);
                return done();
              });
          });
      });
  });

  it("POST /deliveries", (done) => {
    let deliveryId;
    request(kiwiFunctions)
      .post(apiURL)
      .expect("Content-Type", /json/)
      .send(mockUpDelivery)
      .expect(201)
      .expect((res) => {
        assert("id " in res.body.data);
        deliveryId = res.body.data.id;
      })
      .end(() => {
        request(kiwiFunctions)
          .delete(apiURL + deliveryId)
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
  });
});
