// Loader Element
const loaderElement = document.getElementById('loader')

// Main Element
const mainElement = document.getElementById('main')

// Initiate author handler, portfolio handler and database handler
const author = new Author('author-name', 'author-bio', 'author-image')
const portfolio = new Portfolio('portfolio')
const database = new Database()

loadAuthor()
  .then(loadPortfolio)
  .then(showPage)

// Load portfolio (items) from database, create html elements for each item and add them to the page
function loadPortfolio() {
  return database
    .portfolioItems()
    .then(items => portfolio.addAll(items))
    .then(showPage)
}

// load author data from database and fill the intro/author html elements with the information
function loadAuthor() {
  return database.author().then(data => author.update(data))
}

// remove the loader element and show everything else
function showPage() {
  loaderElement.remove()
  mainElement.className = ''
}
