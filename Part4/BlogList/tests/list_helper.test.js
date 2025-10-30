const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


describe('total likes', () => {
  
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]

  // new line added: corresponding test case
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  // new line added: 
  test('when list has multiple blogs, equals the sum of likes', () => {
    const blogs = [
      { title: 'Blog 1', author: 'A', likes: 3 },
      { title: 'Blog 2', author: 'B', likes: 5 },
      { title: 'Blog 3', author: 'C', likes: 2 },
    ]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 10)
  })

  // new line added: 
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
})
