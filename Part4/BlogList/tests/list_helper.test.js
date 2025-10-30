const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("most blogs", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, returns that author with blogs:1", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 1 });
  });

  const multipleBlogs = [
    { title: "Blog 1", author: "Robert C. Martin", likes: 2 },
    { title: "Blog 2", author: "Edsger W. Dijkstra", likes: 5 },
    { title: "Blog 3", author: "Robert C. Martin", likes: 3 },
    { title: "Blog 4", author: "Robert C. Martin", likes: 4 },
  ];

  test("returns author with most blogs", () => {
    const result = listHelper.mostBlogs(multipleBlogs);
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
  });

  test("of empty list is null", () => {
    const result = listHelper.mostBlogs([]);
    assert.deepStrictEqual(result, null);
  });
});
