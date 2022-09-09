const { spec, request, handler, stash } = require("pactum");
const getCompanyInfo = require("../helpers/query/getcompanyinfo");
const getDragonInfo = require("../helpers/query/getdragoninfo");
describe("Perform GraphQL Requests", () => {
  before(function () {
    request.setBaseUrl("https://api.spacex.land/");
    request.setDefaultHeaders("Content-Type", "application/json");
  });

  it("Get Company info for spaceX", async function () {
    const companyInfoQuery = getCompanyInfo.getCompanyInfo();
    await spec()
      .withPath("graphql")
      .withMethod("POST")
      .withGraphQLQuery(companyInfoQuery)
      .expectJson({
        data: {
          company: {
            ceo: "Elon Musk",
            coo: "Gwynne Shotwell",
            cto: "Elon Musk",
            employees: 7000,
            vehicles: 3,
            valuation: 27500000000,
          },
        },
      })
      .expectStatus(200);
  });

  it("Validate  Company info using  assert handlers", async function () {
    handler.addAssertHandler("ceo", (ctx) => {
      // validating ceo and cto field as "Elon Musk"
      return ctx.data === "Elon Musk";
    });
    const companyInfoQuery = getCompanyInfo.getCompanyInfo();
    await spec()
      .withPath("graphql")
      .withMethod("POST")
      .withGraphQLQuery(companyInfoQuery)
      .expectJsonLike({
        data: {
          company: {
            ceo: "#ceo",
            coo: "Gwynne Shotwell",
            cto: "#ceo",
            employees: 7000,
          },
        },
      })
      .expectStatus(200);
  });

  it("Get Dragons info for spaceX using Graphql variables", async function () {
    const limit = 2;
    const dragonQuery = getDragonInfo.getDragonInfo();
    await spec()
      .withPath("graphql")
      .withMethod("POST")
      .withGraphQLQuery(dragonQuery)
      .withGraphQLVariables({
        limit: limit,
      })
      .expectJsonLike({
        data: {
          dragons: `$V.length === ${limit}`,
        },
      })
      .expectStatus(200);
  });
});
