const itemPage = document.getElementById('item-page')
const titleElement = document.getElementById('title')
const contentElement = document.getElementById('text')
const linkElement = document.getElementById('link')
const tagsElement = document.getElementById('tags')
const featureImageElement = document.getElementById('feature-image')
const closeButtonElement = document.getElementById('close-button')

const portfolio = document.getElementById('portfolio')

// Get a reference to the database service
const database = firebase.database()
database
  .ref('portfolio/items')
  .once('value')
  .then(snapshot => snapshot.val())
  // .then(data => console.log(data))
  .then(items => addPortfolioItems(items))

closeButtonElement.addEventListener('click', hideItemPage)

// add portfolio items
function addPortfolioItems(items) {
  items.forEach((item, index) => {
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
  let text = createCardTextElement(item.excerpt)
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

  portfolioItem.addEventListener('click', e => {
    e.preventDefault()
    titleElement.textContent = item.title
    contentElement.textContent = item.content
    linkElement.setAttribute('href', item.link.url)
    linkElement.textContent = item.link.title
    featureImageElement.style.backgroundImage = 'url(' + item.image + ')'
    tagsElement.innerHTML = ''
    item.tags.forEach(tag => {
      let newTagElement = document.createElement('span')
      newTagElement.className = 'badge badge-dark'
      newTagElement.textContent = tag
      tagsElement.appendChild(newTagElement)
      tagsElement.appendChild(document.createTextNode(' '))
    })
    showItemPage()
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
  portfolioItemElement.className = 'portfolio-item col-lg-6 col-xl-4 p-1'
  portfolioItemElement.id = id
  return portfolioItemElement
}

// Helper Functions
function hideItemPage() {
  itemPage.style.top = '-100%'
}
function showItemPage() {
  itemPage.style.top = '0'
}
