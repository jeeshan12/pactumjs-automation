const Factory = require("rosie").Factory;
const { faker } = require("@faker-js/faker");

const user = () => {
  Factory.define("user")
    .attr("name", 
    () => `${faker.name.firstName()} ${faker.name.lastName()}`
    )
    .attr("job", () => faker.company.name());
    return Factory.build('user');
};

module.exports = {
  user: user
};
