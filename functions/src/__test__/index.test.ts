import request from "supertest";
/*
import test from "firebase-functions-test";
import sinon from "sinon";
import admin from "firebase-admin";
*/

// const myFunctions = require("../index");
import {kiwiFunctions} from "../index";

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
