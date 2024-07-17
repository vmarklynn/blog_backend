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

const mostBlogs = (blogs) => {
  const reducer = (blogs, blog) => {
    if (!(blog.author in blogs)) {
      blogs[blog.author] = 0
    }
    blogs[blog.author] += 1
    return blogs
  }

  const nameBlogs = blogs.reduce(reducer, {})

  const maxBlogs = Object.keys(nameBlogs).map((name) => {
    return { "author": name, "blogs": nameBlogs[name] }
  }).reduce((maxBlogs, blog) => {
    return Object.keys(maxBlogs).length === 0 ? (blog) : (maxBlogs.blogs > blog.blogs ? maxBlogs : blog)
  }, {})

  return maxBlogs
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
