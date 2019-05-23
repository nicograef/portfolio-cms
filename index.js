const portfolio = document.getElementById('portfolio')
portfolio.addEventListener('click', e => {
  e.preventDefault()
  let classes = e.target.className
  let itemId
  if (classes.indexOf('card-img-overlay') !== -1)
    itemId = e.target.parentElement.parentElement.id
  else if (
    classes.indexOf('card-title') !== -1 ||
    classes.indexOf('card-text') !== -1
  )
    itemId = e.target.parentElement.parentElement.parentElement.id
  else return
  location.href = location.origin + '/item.html?id=' + itemId
})

fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  .then(response => response.json())
  .then(json => addPortfolioItems(json))

console.log('TCL: portfolio', portfolio)
// add portfolio items
function addPortfolioItems(posts) {
  posts.forEach(post => {
    post.image = post.id % 2 ? 'img/mobile.jpg' : 'img/pay.jpg'
    console.log('adding: ', post)
    const newItem = createElementForPortfolioItem(post)
    portfolio.appendChild(newItem)
  })
}

// create dom element for portfolio item
function createElementForPortfolioItem(data) {
  const portfolioItem = document.createElement('div')
  portfolioItem.className = 'portfolio-item col-md-6 my-3'
  portfolioItem.id = data.id
  const card = document.createElement('div')
  card.className = 'card border-0 rounded-lg text-white'
  card.style.backgroundImage = 'url(' + data.image + ')'
  const cardOverlay = document.createElement('div')
  cardOverlay.className =
    'card-img-overlay rounded-lg h-100 d-flex flex-column justify-content-end'
  const title = document.createElement('h5')
  title.className = 'card-title'
  title.textContent = data.title
  const text = document.createElement('p')
  text.className = 'card-text'
  text.textContent = data.body

  cardOverlay.appendChild(title)
  cardOverlay.appendChild(text)
  card.appendChild(cardOverlay)
  portfolioItem.appendChild(card)

  return portfolioItem
}
