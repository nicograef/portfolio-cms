class Portfolio {
  constructor(portfolioElementId) {
    this.portfolioElement = document.getElementById(portfolioElementId)
    this.items = []
  }
  // add portfolio items
  addAll(items) {
    items.forEach(item => this.add(item))
  }

  add(item) {
    // console.log('adding: ', item)
    let newPortfolioItem = new PortfolioItem(item)
    this.items.push(newPortfolioItem)
    this.portfolioElement.appendChild(newPortfolioItem.createElement())
  }
}
