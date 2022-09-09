const { spec, request, handler } = require("pactum");
const { expect } = require("chai");
const { int, email, string, like } = require("pactum-matchers");

describe("Perform API Requests[GET]", () => {
  before(function () {
    request.setBaseUrl("https://reqres.in/api/");
    request.setDefaultHeaders("Content-Type", "application/json");
  });

  it("Get Users in a specific page", async function () {
    const response = await spec()
      .withMethod("GET")
      .withPath("users")
      .withQueryParams("page", 2)
      .expectStatus(200)
      .expectJsonLike({
        page: 2,
        per_page: 6,
        data: "$V.length === 6",
      })
      .toss();
    const responseData = response.json;
    await expect(responseData).to.have.property("total_pages");
  });

  it("Get Users by ID", async function () {
    handler.addDataFuncHandler("GetRandomNumber", (ctx) => {
      const min = parseInt(ctx.args[0]);
      const max = parseInt(ctx.args[1]);
      return Math.floor(Math.random() * (max - min + 1) + min);
    });
    const response = await spec()
      .withMethod("GET")
      .withPath("users/{id}")
      .withPathParams("id", "$F{GetRandomNumber:1,10}")
      .expectStatus(200)
      .expectJsonMatch({
        data: {
          id: int(),
          email: email(),
          first_name: string(),
          last_name: string(),
          avatar: like(`https://reqres.in/img/faces/2-image.jpg`),
        },
      })
      .toss();
    const responseData = response.json;
    await expect(responseData).to.have.property("support");
  });
});
