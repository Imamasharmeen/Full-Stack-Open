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

  // in case multiple blogs have same highest likes, first one will be returned
  const favourite = blogs.reduce((prev, current) => {
    return current.likes > prev.likes ? current : prev;
  });

  return favourite;
};

// Exporting the functions to be used in other modules
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
