const { spec, request } = require("pactum");
const dragonInfo = require("../helpers/query/getdragoninfo");
describe("Perform GraphQL Requests[Fragment]", () => {
  before(function () {
    request.setBaseUrl("https://api.spacex.land/");
    request.setDefaultHeaders("Content-Type", "application/json");
  });

  it("Get Dragons info for spaceX using Graphql Fragment", async function () {
    const dragonInfoQuery = dragonInfo.getDragonInfoUsingFragment();
    await spec()
      .withPath("graphql")
      .withMethod("POST")
      .withGraphQLQuery(dragonInfoQuery)
      .withGraphQLVariables({
        limit: 2
      })
      .expectJsonLike({
        data: {
          dragons: `$V.length === 2`
        },
      })
      .expectStatus(200);
  });
});
