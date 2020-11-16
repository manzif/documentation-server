'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Api extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Api.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    type: DataTypes.STRING,
    headers: DataTypes.ARRAY(DataTypes.JSON),
    query: DataTypes.ARRAY(DataTypes.JSON),
    body: DataTypes.TEXT,
    bodyDescription: DataTypes.ARRAY(DataTypes.JSON),
    success: DataTypes.TEXT,
    successDescription: DataTypes.ARRAY(DataTypes.JSON),
    failure: DataTypes.TEXT,
    failureDescription: DataTypes.ARRAY(DataTypes.JSON)
  }, {
    sequelize,
    modelName: 'Api',
  });
  return Api;
};