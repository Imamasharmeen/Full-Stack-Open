const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);

  return total;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const favourite = blogs.reduce((prev, current) => {
    return current.likes > prev.likes ? current : prev;
  });

  return favourite;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorBlogCounts = _.countBy(blogs, "author");

  const topAuthor = _.maxBy(
    Object.keys(authorBlogCounts),
    (author) => authorBlogCounts[author]
  );

  return {
    author: topAuthor,
    blogs: authorBlogCounts[topAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
};
