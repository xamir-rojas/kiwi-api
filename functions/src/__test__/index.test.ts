import request from "supertest";
/*
import test from "firebase-functions-test";
import sinon from "sinon";
import admin from "firebase-admin";
*/

// const myFunctions = require("../index");
import { kiwiFunctions } from "../index";
import { faker } from "@faker-js/faker";

/*
let adminInitStub;
const functionsTest = test();

beforeAll(() => {
  adminInitStub = sinon.stub(admin, "initializeApp");
});

afterAll(() => {
  adminInitStub.restore();
  functionsTest.cleanup();
});
*/

const mockUpDelivery = {
  creation_date: faker.date.recent(),
  state: "pending",
  pickup: {
    pickup_lat: faker.address.latitude(),
    pickup_lon: faker.address.longitude(),
  },
  dropoff: {
    dropoff_lat: faker.address.latitude(),
    dropoff_lon: faker.address.longitude(),
  },
  zone_id: faker.datatype.uuid(),
};

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
        expect(res.body.message).toEqual("Hello World!");
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
      .get("/api/v1/deliveries")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.length).toEqual(10);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  it("GET /deliveries/:id", (done) => {
    let deliveryId: string;
    request(kiwiFunctions)
      .post("/api/v1/deliveries")
      .expect("Content-Type", /json/)
      .send(mockUpDelivery)
      .expect(201)
      .expect((res) => {
        deliveryId = res.body.data.id;
      })
      .end(() => {
        request(kiwiFunctions)
          .get("/api/v1/deliveries/" + deliveryId)
          .expect("Content-Type", /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body.data.id).toEqual(deliveryId);
            expect(res.body.data).toEqual(mockUpDelivery);
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
  });

  test("POST /deliveries", (done) => {
    request(kiwiFunctions)
      .post("/api/v1/users")
      .expect("Content-Type", /json/)
      .send(mockUpDelivery)
      .expect(201)
      .expect((res) => {
        expect(res.body.data).toEqual(mockUpDelivery);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
