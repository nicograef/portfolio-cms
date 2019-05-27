// Portfolio UI Elements
const portfolioElement = document.getElementById('portfolio')

class Portfolio {
  // add portfolio items
  static addAll(items) {
    items.forEach(item => Portfolio.add(item))
  }

  static add(item) {
    // console.log('adding: ', item)
    let newPortfolioItem = new PortfolioItem(item)
    portfolioElement.appendChild(newPortfolioItem.createElement())
  }
}
