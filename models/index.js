const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

BlogPost.belongsTo(User, {
  foreignKey: "user_id",
  as: "author_name",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "blog_id",
});

BlogPost.hasMany(Comment, {
  foreignKey: "blog_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

User.hasMany(BlogPost, {
  foreignKey: "user_id",
});

module.exports = { User, BlogPost, Comment };
