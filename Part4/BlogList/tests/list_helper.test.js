const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

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

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      { title: "Blog1", author: "A", likes: 3 },
      { title: "Blog2", author: "B", likes: 6 },
      { title: "Blog3", author: "C", likes: 9 },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 18);
  });
});

describe("favourite blog", () => {
  const blogs = [
    { title: "Blog1", author: "A", likes: 10 },
    { title: "Blog2", author: "B", likes: 7 },
    { title: "Blog3", author: "C", likes: 20 },
  ];

  test("of empty list is null", () => {
    const result = listHelper.favouriteBlog([]);
    assert.deepStrictEqual(result, null);
  });

  test("returns the blog with most likes", () => {
    const result = listHelper.favouriteBlog(blogs);
    assert.deepStrictEqual(result, blogs[2]);
  });
});

describe("most blogs", () => {
  const blogs = [
    { author: "Robert C. Martin", title: "Blog1", likes: 5 },
    { author: "Robert C. Martin", title: "Blog2", likes: 7 },
    { author: "Edsger W. Dijkstra", title: "Blog3", likes: 10 },
    { author: "Robert C. Martin", title: "Blog4", likes: 3 },
  ];

  test("of empty list is null", () => {
    const result = listHelper.mostBlogs([]);
    assert.deepStrictEqual(result, null);
  });

  test("returns author with most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
  });
});

describe("most likes", () => {
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

  const listWithMultipleBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
  ];

  test("of empty list is null", () => {
    const result = listHelper.mostLikes([]);
    assert.deepStrictEqual(result, null);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 5 });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
