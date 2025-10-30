const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

//dummy function test
test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
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

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("when list has multiple blogs, equals the sum of likes", () => {
    const blogs = [
      { title: "Blog 1", author: "A", likes: 3 },
      { title: "Blog 2", author: "B", likes: 5 },
      { title: "Blog 3", author: "C", likes: 2 },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 10);
  });

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
});

describe("favourite blog", () => {
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

  test("when list has only one blog, equals that blog", () => {
    const result = listHelper.favouriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  const multipleBlogs = [
    { title: "Blog 1", author: "A", likes: 3 },
    { title: "Blog 2", author: "B", likes: 15 },
    { title: "Blog 3", author: "C", likes: 10 },
  ];

  test("returns the blog with most likes", () => {
    const result = listHelper.favouriteBlog(multipleBlogs);
    assert.deepStrictEqual(result, multipleBlogs[1]); // Blog 2 has most likes
  });

  test("of empty list is null", () => {
    const result = listHelper.favouriteBlog([]);
    assert.deepStrictEqual(result, null);
  });
});
