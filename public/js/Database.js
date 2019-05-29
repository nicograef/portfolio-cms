class Database {
  // Get author information from database and show it on the page
  static author() {
    return firebase
      .database()
      .ref('portfolio/author')
      .once('value')
      .then(snapshot => snapshot.val())
    // .then(data => console.log(data))
  }

  static setAuthor(author) {
    console.log(author)

    return firebase
      .database()
      .ref('portfolio/author')
      .set(author)
  }

  static addPortfolioItem(item) {
    console.log(item)

    return firebase
      .database()
      .ref('portfolio/items/' + item.id)
      .set(item)
  }

  // Get portfolio items from database
  static allPortfolioItems() {
    return firebase
      .database()
      .ref('portfolio/items')
      .once('value')
      .then(snapshot => snapshot.val())
    // .then(data => console.log(data))
  }

  // Get single portfolio item
  static portfolioItem(itemId) {
    return firebase
      .database()
      .ref('portfolio/items/' + itemId)
      .once('value')
      .then(snapshot => snapshot.val())
    // .then(data => console.log(data))
  }
}
