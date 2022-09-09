function getDragonInfo() {
  return `query getDragonInfo($limit: Int) {
        dragons(limit: $limit) {
          id
          name
          description
        }
      } `;
}

const dragonFragment = `
fragment DragonInfo on Dragon {
  description
  id
}`;

function getDragonInfoUsingFragment() {
  return `
        ${dragonFragment}
        query getDragonInfo($limit: Int) {
          dragons(limit: $limit) {
            ...DragonInfo
            name
          }
        } `;
}
module.exports = {
  getDragonInfo: getDragonInfo,
  getDragonInfoUsingFragment: getDragonInfoUsingFragment
};
