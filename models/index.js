// collecting and exporting the User model data.
const User = require('./User');
// collecting and exporting the Post model data.
const Post = require('./Post');
// collecting and exporting the Comment model data.
const Comment = require('./Comment');

const Conversation = require('./Conversation');

const Message = require('./Message');

const UserConversation = require('./UserConversation');

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

  User.hasMany(Conversation, {
    foreignKey: 'user_id'
  });

  Conversation.belongsToMany(User, {
    through: 'UserConversation',
    foreignKey: 'conversation_id',
    otherKey: 'user_id'  
  });
  
  User.belongsToMany(Conversation, {
    through: 'UserConversation',
    foreignKey: 'user_id',  
    otherKey: 'conversation_id'
  });

  User.hasMany(Message, {
    foreignKey: 'user_id'
  });

  Conversation.hasMany(Message,{
    foreignKey: 'conversation_id'
  });

  Message.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });

  Message.belongsTo(Conversation, {
    foreignKey: 'conversation_id',
    onDelete: 'cascade'
  });






module.exports = { User, Post, Comment, Conversation, Message, UserConversation };
