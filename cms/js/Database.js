class Database {
  constructor(portfolioID) {
    this.baseRef = `portfolio-${portfolioID}`
    this.authorRef = `portfolio-${portfolioID}/author`
    this.itemsRef = `portfolio-${portfolioID}/items`
  }

  // Get author information from database and show it on the page
  author() {
    console.log(this.authorRef)

    return firebase
      .database()
      .ref(this.authorRef)
      .once('value')
      .then(snapshot => snapshot.val())
    // .then(data => console.log(data))
  }

  setAuthor(author) {
    console.log('updating author: ', author)

    return firebase
      .database()
      .ref(this.authorRef)
      .set(author)
  }

  addPortfolioItem(item) {
    console.log('adding item: ', item)

    // Get a key for a new portfolio item
    item.id = firebase
      .database()
      .ref()
      .child(this.itemsRef)
      .push().key

    return firebase
      .database()
      .ref(`${this.itemsRef}/${item.id}`)
      .set(item)
  }

  updatePortfolioItem(item) {
    console.log('updating item: ', item)

    return firebase
      .database()
      .ref(`${this.itemsRef}/${item.id}`)
      .set(item)
  }

  deletePortfolioItem(item) {
    console.log('deleting item: ', item)

    return firebase
      .database()
      .ref(`${this.itemsRef}/${item.id}`)
      .set(null)
  }

  // Get portfolio items from database
  allPortfolioItems() {
    return firebase
      .database()
      .ref(this.itemsRef)
      .once('value')
      .then(snapshot => snapshot.val())
    // .then(data => console.log(data))
  }

  // Get single portfolio item
  portfolioItem(itemId) {
    return firebase
      .database()
      .ref(`${this.itemsRef}/${itemId}`)
      .once('value')
      .then(snapshot => snapshot.val())
    // .then(data => console.log(data))
  }
}
