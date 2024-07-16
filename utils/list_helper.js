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

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let currentMax = blogs[0]
  for (let i = 1; i < blogs.length; i++) {
    if (currentMax.likes < blogs[i].likes) {
      currentMax = blogs[i]
    }
  }

  return currentMax
}

module.exports = { dummy, totalLikes, favoriteBlog }
