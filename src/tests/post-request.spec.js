const { spec, request, handler, stash } = require("pactum");
const { expect } = require("chai");
const { string, like } = require("pactum-matchers");
const users = require("../models/user");
const { faker } = require("@faker-js/faker");

describe("Perform API Requests[POST]", () => {
  before(function () {
    request.setBaseUrl("https://reqres.in/api/");
    request.setDefaultHeaders("Content-Type", "application/json");
  });
  it("Create a new User using Factory Data", async function () {
    const response = await spec()
      .withMethod("POST")
      .withPath("users")
      .withJson(users.user())
      .expectStatus(201)
      .expectJsonMatch({
        id: string(),
        name: string(),
        job: string(),
        createdAt: like("2022-09-06T13:44:37.506Z"),
      })
      .toss();
    const responseData = response.json;
    await expect(responseData).to.have.property("id");
  });

  it("Create a new User using template", async function () {
    stash.addDataTemplate({
      User: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        job: faker.company.name(),
      },
    });
    const response = await spec()
      .withMethod("POST")
      .withPath("users")
      .withJson({
        "@DATA:TEMPLATE@": "User",
      })
      .expectStatus(201)
      .expectJsonMatch({
        id: string(),
        name: string(),
        job: string(),
        createdAt: like("2022-09-06T13:44:37.506Z"),
      })
      .toss();
    const responseData = response.json;
    console.log(responseData);
    // printing data from stash templates
    console.log(stash.getDataTemplate().User);
    await expect(responseData).to.have.property("id");
  });

  it("Create a new User using Data Map", async function () {
    stash.addDataMap({
      User: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        job: faker.company.name(),
      },
    });
    const response = await spec()
      .withMethod("POST")
      .withPath("users")
      .withJson({
        name: "$M{User.name}",
        job: "$M{User.job}",
      })
      .expectStatus(201)
      .expectJsonMatch({
        id: string(),
        name: string(),
        job: string(),
        createdAt: like("2022-09-06T13:44:37.506Z"),
      })
      .toss();
    const responseData = response.json;
    // printing data from stash templates
    await expect(responseData).to.have.property("id");
  });
});
