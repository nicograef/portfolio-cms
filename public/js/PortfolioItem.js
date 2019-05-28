class PortfolioItem {
  static createTagsElement(tags) {
    const tagsElement = document.createElement('p')
    tagsElement.className = 'card-text tags'
    tagsElement.style.opacity = 0
    tagsElement.innerHTML = tags
      .map(tag => `<span class='badge badge-light'>${tag}</span>`)
      .join(' ')

    return tagsElement
  }

  static createCardTextElement(excerpt) {
    const textElement = document.createElement('p')
    textElement.className = 'card-text'
    textElement.textContent = excerpt
    return textElement
  }

  static createCardTitleElement(title) {
    const titleElement = document.createElement('h5')
    titleElement.className = 'card-title'
    titleElement.textContent = title
    return titleElement
  }

  static createCardOverlayElement() {
    const cardOverlayElement = document.createElement('div')
    cardOverlayElement.className =
      'card-img-overlay h-100 d-flex flex-column justify-content-end'
    return cardOverlayElement
  }

  static createCardElement(image) {
    const cardElement = document.createElement('div')
    cardElement.className = 'card text-white'
    cardElement.style.backgroundImage = 'url(' + image + ')'
    return cardElement
  }

  static createPortfolioItemElement(id) {
    const portfolioItemElement = document.createElement('div')
    portfolioItemElement.className = 'portfolio-item col-lg-6 col-xl-4 p-1'
    portfolioItemElement.id = id
    return portfolioItemElement
  }

  static createElement(data) {
    const portfolioItem = PortfolioItem.createPortfolioItemElement(data.id)
    const card = PortfolioItem.createCardElement(data.image)
    const cardOverlay = PortfolioItem.createCardOverlayElement()
    const title = PortfolioItem.createCardTitleElement(data.title)
    const text = PortfolioItem.createCardTextElement(data.excerpt)
    const tags = PortfolioItem.createTagsElement(data.tags)

    cardOverlay.appendChild(title)
    cardOverlay.appendChild(text)
    cardOverlay.appendChild(tags)
    card.appendChild(cardOverlay)
    portfolioItem.appendChild(card)

    portfolioItem.addEventListener('mouseenter', e => (tags.style.opacity = 1))
    portfolioItem.addEventListener('mouseleave', e => (tags.style.opacity = 0))

    return portfolioItem
  }
}
