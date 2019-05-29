class UI {
  // remove the loader element and show everything else
  static showPage() {
    document.getElementById('loader').remove()
    document.getElementById('main').className = ''
  }

  static setAuthor(author) {
    document.getElementById('author-name').textContent = author.name
    document.getElementById('author-bio').textContent = author.bio
    document.getElementById('author-image').src = author.image

    document.getElementById('author-profession').textContent = author.profession
    document.getElementById('author-greeting').textContent = author.profession.length ? '' : "👋 Hi there, I'm "
  }

  static addPortfolioItem(item) {
    const newItem = PortfolioItem.createElement(item)
    newItem.addEventListener('click', e => UI.showItemPage(item))
    document.getElementById('portfolio').appendChild(newItem)
  }

  static showItemPage(item) {
    document.getElementById('item-page-title').textContent = item.title
    document.getElementById('item-page-description').textContent = item.description
    document.getElementById('item-page-link').textContent = item.link.title
    document.getElementById('item-page-link').setAttribute('href', item.link.url)
    document.getElementById('item-page-image').style.backgroundImage = 'url(' + item.image + ')'
    document.getElementById('item-page-tags').innerHTML = item.tags
      .map(tag => `<span class='badge badge-dark'>${tag}</span>`)
      .join(' ')

    document.getElementById('item-page').style.top = '0'
  }

  static hideItemPage() {
    document.getElementById('item-page').style.top = '-100%'
  }
}

// Load portfolio (items) from database, create html elements for each item and add them to the page
function loadPortfolio() {
  return Database.allPortfolioItems().then(items => {
    for (let itemId in items) {
      UI.addPortfolioItem(items[itemId])
    }
  })
}

// load author data from database and fill the intro/author html elements with the information
function loadAuthor() {
  return Database.author().then(author => UI.setAuthor(author))
}

loadAuthor()
  .then(loadPortfolio)
  .then(UI.showPage)

document.getElementById('item-page-close-button').addEventListener('click', UI.hideItemPage)
