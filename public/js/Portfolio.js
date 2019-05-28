class Portfolio {
  constructor(portfolioElementId) {
    this.portfolioElement = document.getElementById(portfolioElementId)
    this.items = {}
    this.itemPage = new ItemPage()
  }
  // add portfolio items
  addAll(items) {
    // items.forEach(item => this.add(item))
    for (let itemId in items) {
      this.add(items[itemId], itemId)
    }
  }

  add(item, itemId) {
    // console.log('adding: ', item)
    item.id = itemId
    let newPortfolioItem = new PortfolioItem(item)
    this.items[itemId] = newPortfolioItem
    let newPortfolioItemElement = newPortfolioItem.createElement()
    newPortfolioItemElement.addEventListener('click', e => {
      e.preventDefault()
      this.itemPage.setItem(newPortfolioItem)
      this.itemPage.show()
    })
    this.portfolioElement.appendChild(newPortfolioItemElement)
  }

  remove(itemId) {
    // this.items = this.items.filter(item => item.id !== itemId)
    delete this.items[itemId]
    document.getElementById(itemId).remove()
  }
}
