class PortfolioItem {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.excerpt = data.excerpt
    this.link = data.link
    this.tags = data.tags
    this.image = data.image
  }

  createTagsElement() {
    let tagsElement = document.createElement('p')
    tagsElement.className = 'card-text tags'
    tagsElement.style.opacity = 0

    this.tags.forEach(tag => {
      let newTagElement = document.createElement('span')
      newTagElement.className = 'badge badge-light'
      newTagElement.textContent = tag
      tagsElement.appendChild(newTagElement)
      tagsElement.appendChild(document.createTextNode(' '))
    })

    return tagsElement
  }

  createCardTextElement() {
    let textElement = document.createElement('p')
    textElement.className = 'card-text'
    textElement.textContent = this.excerpt
    return textElement
  }

  createCardTitleElement() {
    let titleElement = document.createElement('h5')
    titleElement.className = 'card-title'
    titleElement.textContent = this.title
    return titleElement
  }

  createCardElement() {
    let cardElement = document.createElement('div')
    cardElement.className = 'card text-white'
    cardElement.style.backgroundImage = 'url(' + this.image + ')'
    return cardElement
  }

  createCardOverlayElement() {
    let cardOverlayElement = document.createElement('div')
    cardOverlayElement.className =
      'card-img-overlay h-100 d-flex flex-column justify-content-end'
    return cardOverlayElement
  }

  createPortfolioItemElement() {
    let portfolioItemElement = document.createElement('div')
    portfolioItemElement.className = 'portfolio-item col-lg-6 col-xl-4 p-1'
    portfolioItemElement.id = this.id
    return portfolioItemElement
  }

  createElement() {
    let portfolioItem = this.createPortfolioItemElement()
    let card = this.createCardElement()
    let cardOverlay = this.createCardOverlayElement()
    let title = this.createCardTitleElement()
    let text = this.createCardTextElement()
    let tags = this.createTagsElement()

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
}
