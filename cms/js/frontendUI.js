// Author UI
const authorName = document.getElementById('author-name')
const authorBio = document.getElementById('author-bio')
const authorImage = document.getElementById('author-image')
const authorProfession = document.getElementById('author-profession')
const authorGreeting = document.getElementById('author-greeting')

// Item Page UI
const itemPage = document.getElementById('item-page')
const itemPageTitle = document.getElementById('item-page-title')
const itemPageDescription = document.getElementById('item-page-description')
const itemPageImage = document.getElementById('item-page-image')
const itemPageLink = document.getElementById('item-page-link')
const itemPageTags = document.getElementById('item-page-tags')

// Portfolio Wrapper
const portfolio = document.getElementById('portfolio')

// Buttons
const btnCloseItemPage = document.getElementById('btn-close-item-page')

class UI {
  static init() {
    btnCloseItemPage.addEventListener('click', UI.hideItemPage)
  }

  // remove the loader element and show everything else
  static showPage() {
    document.getElementById('loader').remove()
    document.getElementById('main').className = ''
  }

  static setAuthor(author) {
    authorName.textContent = author.name
    authorBio.textContent = author.bio
    authorImage.src = author.image

    authorProfession.textContent = author.profession
    if (!author.profession.length) authorGreeting.classList.remove('d-none')
  }

  static addPortfolioItem(item) {
    const newItem = PortfolioItem.createElement(item)
    newItem.addEventListener('click', e => UI.showItemPage(item))
    portfolio.appendChild(newItem)
  }

  static showItemPage(item) {
    itemPageTitle.textContent = item.title
    itemPageDescription.textContent = item.description
    itemPageLink.textContent = item.link.title
    itemPageLink.setAttribute('href', item.link.url)
    itemPageImage.style.backgroundImage = 'url(' + item.image + ')'
    itemPageTags.innerHTML = item.tags.map(tag => `<span class='badge badge-dark'>${tag}</span>`).join(' ')

    itemPage.style.top = '0'
  }

  static showInfo(message) {
    document.getElementById('loader').remove()
    const info = document.getElementById('info')
    info.innerHTML = `
      <div class="container text-center mt-5 mb-3">
        <h3>${message}</h3>
      </div>
    `
  }

  static hideItemPage() {
    itemPage.style.top = '-100%'
  }
}
