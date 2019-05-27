// Item Page UI Elements
const itemPage = document.getElementById('item-page')
const titleElement = document.getElementById('item-page-title')
const contentElement = document.getElementById('item-page-description')
const linkElement = document.getElementById('item-page-link')
const tagsElement = document.getElementById('item-page-tags')
const featureImageElement = document.getElementById('item-page-image')
const closeButtonElement = document.getElementById('item-page-close-button')

class ItemPage {
  static setItem(item) {
    titleElement.textContent = item.title
    contentElement.textContent = item.description
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
  }
  static hide() {
    itemPage.style.top = '-100%'
  }
  static show() {
    itemPage.style.top = '0'
  }
}

// UX event listeners
closeButtonElement.addEventListener('click', ItemPage.hide)
