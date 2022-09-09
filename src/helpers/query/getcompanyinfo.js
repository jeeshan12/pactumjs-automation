function getCompanyInfo() {
  return `{
        company {
          ceo
          coo
          cto
          employees
          vehicles
          valuation
        }
      }
      `;
}


module.exports = {
    getCompanyInfo: getCompanyInfo
}