class Portfolio {
  constructor(portfolioElement) {
    this.portfolioElement = portfolioElement
  }
  // add portfolio items
  addAll(items) {
    items.forEach(item => this.add(item))
  }

  add(item) {
    // console.log('adding: ', item)
    let newPortfolioItem = new PortfolioItem(item)
    this.portfolioElement.appendChild(newPortfolioItem.createElement())
  }
}
