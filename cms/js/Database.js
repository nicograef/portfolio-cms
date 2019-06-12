class Database {
  constructor(portfolioID) {
    this.baseRef = `user/${portfolioID}`
    this.authorRef = `user/${portfolioID}/author`
    this.itemsRef = `user/${portfolioID}/items`
  }

  // Get author information from database and show it on the page
  author() {
    console.log('getting author data')

    return firebase
      .database()
      .ref(this.authorRef)
      .once('value')
      .then(snapshot => snapshot.val())
  }

  setAuthor(author) {
    console.log('updating author: ', author)

    return firebase
      .database()
      .ref(this.authorRef)
      .set(author)
  }

  addOrUpdatePortfolioItem(item) {
    console.log('adding or updating item: ', item)

    return firebase
      .database()
      .ref(`${this.itemsRef}/${item.id}`)
      .set(item)
  }

  // Get a key for a new portfolio item
  getNewItemID() {
    const id = firebase
      .database()
      .ref()
      .child(this.itemsRef)
      .push().key

    console.log('created new item id: ' + id)
    return id
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
    console.log('getting all portfolio items')

    return firebase
      .database()
      .ref(this.itemsRef)
      .once('value')
      .then(snapshot => snapshot.val())
  }

  // Get single portfolio item
  getPortfolioItem(itemId) {
    console.log('getting portfolio item', itemId)

    return firebase
      .database()
      .ref(`${this.itemsRef}/${itemId}`)
      .once('value')
      .then(snapshot => snapshot.val())
  }

  // add or update image
  addOrUpdateImage(filename, dataUrl) {
    console.log('uploading image: ', filename)

    return firebase
      .storage()
      .ref(`${this.baseRef}/${filename}`)
      .putString(dataUrl, 'data_url')
      .then(snapshot => snapshot.ref.getDownloadURL())
  }
}
