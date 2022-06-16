// collecting and exporting the User model data.
const User = require('./User');
// collecting and exporting the Post model data.
const Post = require('./Post');
// collecting and exporting the Comment model data.
// const Comment = require('./Comment');
// Now we can define our model associations
// create associations
User.hasMany(Post, {
    // As we referenced earlier, a user can make many posts. Thanks to Sequelize, we can now use JavaScript to explicitly create this relation. This association creates the reference for the id column in the User model to link to the corresponding foreign key pair, which is the user_id in the Post model.
    foreignKey: 'user_id'
  });

//   We also need to make the reverse association

// These association changes will not take affect in the User table, because there isn't a way to make changes to the table dynamically. We will need to drop the table and create a new one in order for the associations to take affect. But Sequelize does have a way to dynamically drop the table and create a new one to overwrite existing tables and establish the new associations.

Post.belongsTo(User, {
    // In this statement, we are defining the relationship of the Post model to the User. The constraint we impose here is that a post can belong to one user, but not many users. Again, we declare the link to the foreign key, which is designated at user_id in the Post model.
    foreignKey: 'user_id',
    onDelete: 'cascade',
  });

//   Comment.belongsTo(User, {
//     foreignKey: 'user_id',
//     onDelete: 'cascade',

//   });
  
//   Comment.belongsTo(Post, {
//     foreignKey: 'post_id',
//     onDelete: 'cascade',
//   });
  
//   User.hasMany(Comment, {
//     foreignKey: 'user_id',
//     onDelete: 'cascade',
//   });
  
//   Post.hasMany(Comment, {
//     foreignKey: 'post_id',
//     onDelete: 'cascade',
//   });


module.exports = { User, Post };