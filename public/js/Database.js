class Database {
  constructor() {
    // Get a reference to the Firebase database service
    this.database = firebase.database()
  }
  // Get author information from database and show it on the page
  author() {
    return this.database
      .ref('portfolio/author')
      .once('value')
      .then(snapshot => snapshot.val())
    // .then(data => console.log(data))
  }

  // Get portfolio items from database
  portfolioItems() {
    return this.database
      .ref('portfolio/items')
      .once('value')
      .then(snapshot => snapshot.val())
    // .then(data => console.log(data))
  }
}
