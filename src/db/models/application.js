'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Application.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userName: DataTypes.STRING,
    userId: {
      type: DataTypes.UUID,
        references: {
          model: 'User',
          key: 'id',
          as: 'userId',
        }
    }
  }, {
    sequelize,
    modelName: 'Application',
  });
  Application.associate = (models) => {
    Application.belongsTo(models.User, {
      foreignKey: 'userId'
  });
  };
  Application.associate = (models) => {
    Application.hasMany(models.Endpoint, {
      foreignKey: 'applicationId',
    });
  };
  return Application;
};