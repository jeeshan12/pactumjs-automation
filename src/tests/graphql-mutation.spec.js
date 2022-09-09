const { spec, request } = require("pactum");
const { string } = require("pactum-matchers");
const createAlbum = require("../helpers/query/createalbum");
describe("Perform GraphQL Requests[Mutation]", () => {
  before(function () {
    request.setBaseUrl("https://graphqlzero.almansi.me/");
    request.setDefaultHeaders("Content-Type", "application/json");
  });

  it("Create An Album", async function () {
    const albumQuery = createAlbum.createAlbum();
    await spec()
      .withPath("api")
      .withMethod("POST")
      .withGraphQLQuery(albumQuery)
      .withGraphQLVariables({
        input: {
          title: "MLTR",
          userId: "ab163e1d-80ce-4faf-a7af-358163f3635f",
        },
      })
      .expectJsonMatch({
        data: {
          createAlbum: {
            id: string(),
            title: string(),
          },
        },
      })
      .expectStatus(200);
  });
});
