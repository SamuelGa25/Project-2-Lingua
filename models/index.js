// collecting and exporting the User model data.
const User = require('./User');
// collecting and exporting the Post model data.
const Post = require('./Post');
// collecting and exporting the Comment model data.
const Comment = require('./Comment');

const Conversation = require('./Conversation');

const Message = require('./Message');

const Vote = require('./Vote');

// Now we can define our model associations
// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});


Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});


Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',

});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
});

User.hasMany(Message, {
  foreignKey: 'user_id'
});

// Conversation.hasMany(Message, {
//   foreignKey: 'conversation_id'
// });

Message.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// Message.belongsTo(Conversation, {
//   foreignKey: 'conversation_id',
//   onDelete: 'cascade'
// });



// !vote
User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});







module.exports = { User, Post, Comment, Conversation, Message, Vote };
