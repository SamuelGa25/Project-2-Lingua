
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Conversation extends Model { }


Conversation.init(
    // TABLE COLUMN DEFINITIONS GO HERE
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'conversation'
    }
);

module.exports = Conversation;