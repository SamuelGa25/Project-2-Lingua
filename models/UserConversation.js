//  Junction table


const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Next we will define the Post model by adding the following code:

// create our Post model
class UserConversation extends Model { }

// In the first parameter for the Post.init function, we define the Post schema.
UserConversation.init(
    // TABLE COLUMN DEFINITIONS GO HERE
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        conversation_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'conversation',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    {
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        freezeTableName: true,
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'userconversation'
    }
);

//  to make the UserConversation model accessible to other parts of the application. To do that, add the following line of code:
module.exports = UserConversation;