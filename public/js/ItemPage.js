class ItemPage {
  constructor() {
    this.itemPage = document.getElementById('item-page')
    this.titleElement = document.getElementById('item-page-title')
    this.contentElement = document.getElementById('item-page-description')
    this.linkElement = document.getElementById('item-page-link')
    this.tagsElement = document.getElementById('item-page-tags')
    this.featureImageElement = document.getElementById('item-page-image')
    this.closeButtonElement = document.getElementById('item-page-close-button')

    this.closeButtonElement.addEventListener('click', e => this.hide())
  }
  setItem(item) {
    this.titleElement.textContent = item.title
    this.contentElement.textContent = item.description
    this.linkElement.setAttribute('href', item.link.url)
    this.linkElement.textContent = item.link.title
    this.featureImageElement.style.backgroundImage = 'url(' + item.image + ')'
    this.tagsElement.innerHTML = ''
    item.tags.forEach(tag => {
      let newTagElement = document.createElement('span')
      newTagElement.className = 'badge badge-dark'
      newTagElement.textContent = tag
      this.tagsElement.appendChild(newTagElement)
      this.tagsElement.appendChild(document.createTextNode(' '))
    })
  }
  hide() {
    this.itemPage.style.top = '-100%'
  }
  show() {
    this.itemPage.style.top = '0'
  }
}
