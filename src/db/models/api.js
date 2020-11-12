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
    success: DataTypes.TEXT,
    failure: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Api',
  });
  return Api;
};