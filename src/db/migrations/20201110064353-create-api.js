'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Apis', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      headers: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      query: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      body: {
        type: Sequelize.TEXT
      },
      bodyDescription: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      success: {
        type: Sequelize.TEXT
      },
      successDescription: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      failure: {
        type: Sequelize.TEXT
      },
      failureDescription: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      userName: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
          references: {
            model: 'Users',
            key: 'id',
            as: 'userId',
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Apis');
  }
};