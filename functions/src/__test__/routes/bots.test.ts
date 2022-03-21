import request from "supertest";
import test from "firebase-functions-test";
import sinon from "sinon";
import admin from "firebase-admin";
import { assert } from "console";

import { kiwiFunctions } from "../../index";
import { mockUpBot } from "../mockUpObjects";

const apiURL = "/api/v1/bots/";

const functionsTest = test();

let adminInitStub;

beforeAll(() => {
  adminInitStub = sinon.stub(admin, "initializeApp");
});

afterAll(() => {
  adminInitStub.restore();
  functionsTest.cleanup();
});

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

describe("Bots API", () => {
  it("GET All Bots ", (done) => {
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
  it("GET /bots/:id", (done) => {
    let botsId: string;
    request(kiwiFunctions)
      .post(apiURL)
      .expect("Content-Type", /json/)
      .send(mockUpBot)
      .expect(201)
      .expect((res) => {
        botsId = res.body.data.id;
      })
      .end(() => {
        request(kiwiFunctions)
          .get(apiURL + botsId)
          .expect("Content-Type", /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body.data.id).toEqual(botsId);
            expect(res.body.data.zone_id).toEqual(mockUpBot.zone_id);
          })
          .end(() => {
            request(kiwiFunctions)
              .delete(apiURL + botsId)
              .expect("Content-Type", /json/)
              .expect(200)
              .end((err, res) => {
                if (err) return done(err);
                return done();
              });
          });
      });
  });

  it("POST /bots", (done) => {
    let botsId;
    request(kiwiFunctions)
      .post(apiURL)
      .expect("Content-Type", /json/)
      .send(mockUpBot)
      .expect(201)
      .expect((res) => {
        assert("id " in res.body.data);
        botsId = res.body.data.id;
      })
      .end(() => {
        request(kiwiFunctions)
          .delete(apiURL + botsId)
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
  });
});
