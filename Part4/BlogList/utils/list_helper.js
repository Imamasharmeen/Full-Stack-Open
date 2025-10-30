const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav));
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const blogsByAuthor = _.countBy(blogs, "author");
  const topAuthor = _.maxBy(
    Object.keys(blogsByAuthor),
    (author) => blogsByAuthor[author]
  );

  return {
    author: topAuthor,
    blogs: blogsByAuthor[topAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likesByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  const authorWithMostLikes = _.maxBy(
    Object.keys(likesByAuthor),
    (author) => likesByAuthor[author]
  );

  return {
    author: authorWithMostLikes,
    likes: likesByAuthor[authorWithMostLikes],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
