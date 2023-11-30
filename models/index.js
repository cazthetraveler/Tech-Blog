const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

BlogPost.belongsTo(User, {
  foreignKey: "author_id",
  as: "author_name",
});

BlogPost.hasMany(Comment, {
  foreignKey: "blog_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

module.exports = { User, BlogPost, Comment };
