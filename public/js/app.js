// Loader Element
const loaderElement = document.getElementById('loader')
// Main Element
const mainElement = document.getElementById('main')

const author = new Author('author-name', 'author-bio', 'author-image')
const portfolio = new Portfolio('portfolio')
const database = new Database()

database.author().then(data => author.update(data))

database
  .portfolioItems()
  .then(items => portfolio.addAll(items))
  .then(showPage)

function showPage() {
  loaderElement.remove()
  mainElement.className = ''
}
