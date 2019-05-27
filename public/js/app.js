// Portfolio UI Elements
const portfolioElement = document.getElementById('portfolio')

// Author and Intro UI Elements
const introElement = document.getElementById('intro')
const authorNameElement = document.getElementById('author-name')
const authorBioElement = document.getElementById('author-bio')
const authorImageElement = document.getElementById('author-image')

const portfolio = new Portfolio(portfolioElement)
const author = new Author(
  authorNameElement,
  authorBioElement,
  authorImageElement
)

// Get a reference to the Firebase database service
const database = firebase.database()

// Get author data and show it on the page
database
  .ref('portfolio/author')
  .once('value')
  .then(snapshot => snapshot.val())
  // .then(data => console.log(data))
  .then(data => author.update(data))

// Get portfolio items
database
  .ref('portfolio/items')
  .once('value')
  .then(snapshot => snapshot.val())
  // .then(data => console.log(data))
  .then(items => portfolio.addAll(items))
