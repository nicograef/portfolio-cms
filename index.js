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

const dummyImages = [
  'img/mobile.jpg',
  'img/pay.jpg',
  'img/coding.jpg',
  'img/sydney.jpg'
]

const dummyTags = ['mobile', 'webdesign', 'react']

// add portfolio items
function addPortfolioItems(items) {
  items.forEach(item => {
    // DEBUGGING
    item.image = dummyImages[item.id % 4]
    item.tags = dummyTags
    item.content = item.body
    console.log('adding: ', item)

    const newPortfolioItem = createElementForPortfolioItem(item)
    portfolio.appendChild(newPortfolioItem)
  })
}

// create dom element for portfolio item
function createElementForPortfolioItem(item) {
  let portfolioItem = createPortfolioItemElement(item.id)
  let card = createCardElement(item.image)
  let cardOverlay = createCardOverlayElement()
  let title = createCardTitleElement(item.title)
  let text = createCardTextElement(item.content)
  let tags = createTagsElementFromTagArray(item.tags)

  cardOverlay.appendChild(title)
  cardOverlay.appendChild(text)
  cardOverlay.appendChild(tags)
  card.appendChild(cardOverlay)
  portfolioItem.appendChild(card)

  portfolioItem.addEventListener('mouseenter', e => {
    tags.style.opacity = 1
  })

  portfolioItem.addEventListener('mouseleave', e => {
    tags.style.opacity = 0
  })

  return portfolioItem
}

function createTagsElementFromTagArray(tagArray) {
  let tagsElement = document.createElement('p')
  tagsElement.className = 'card-text tags'
  tagsElement.style.opacity = 0

  tagArray.forEach(tag => {
    let newTagElement = document.createElement('span')
    newTagElement.className = 'badge badge-light'
    newTagElement.textContent = tag
    tagsElement.appendChild(newTagElement)
    tagsElement.appendChild(document.createTextNode(' '))
  })

  return tagsElement
}

function createCardTextElement(excerpt) {
  let textElement = document.createElement('p')
  textElement.className = 'card-text'
  textElement.textContent = excerpt
  return textElement
}

function createCardTitleElement(title) {
  let titleElement = document.createElement('h5')
  titleElement.className = 'card-title'
  titleElement.textContent = title
  return titleElement
}

function createCardElement(image) {
  let cardElement = document.createElement('div')
  cardElement.className = 'card text-white'
  cardElement.style.backgroundImage = 'url(' + image + ')'
  return cardElement
}

function createCardOverlayElement() {
  let cardOverlayElement = document.createElement('div')
  cardOverlayElement.className =
    'card-img-overlay h-100 d-flex flex-column justify-content-end'
  return cardOverlayElement
}

function createPortfolioItemElement(id) {
  let portfolioItemElement = document.createElement('div')
  portfolioItemElement.className = 'portfolio-item col-lg-6 p-1'
  portfolioItemElement.id = id
  return portfolioItemElement
}
