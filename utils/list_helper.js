const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  const result = blogs.reduce(reducer, 0)

  return result
}

module.exports = { dummy, totalLikes }
