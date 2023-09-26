const dataModel = require("./data_model.json");
const shops = require("./shops.json");

module.exports = () => ({
  dataModel: dataModel,
  shops: shops
});
