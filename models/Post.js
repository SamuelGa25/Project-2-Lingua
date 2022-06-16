// we'll import the elements that we'll need to build the Post model. This will include the connection to MySQL we stored in the connection.js file as well as Model and Datatypes we'll use from the sequelize package.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Next we will define the Post model by adding the following code:

// create our Post model
class Post extends Model { }

// In the first parameter for the Post.init function, we define the Post schema.
Post.init(
    // TABLE COLUMN DEFINITIONS GO HERE
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the title must be at least 1 character long
                len: [1]
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                // this means the content must be at least 1 character long
                len: [1]
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
        modelName: 'post'
    }
);

//  to make the Post model accessible to other parts of the application. To do that, add the following line of code:
module.exports = Post;