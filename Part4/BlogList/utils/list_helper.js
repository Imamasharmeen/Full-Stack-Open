
const dummy = (blogs) => {
  return 1
}

//  new line added: totalLikes function define 
const totalLikes = (blogs) => {

  if (blogs.length === 0) {
    return 0
  }

  
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)

  return total
}


module.exports = {
  dummy,
  totalLikes, 
}
