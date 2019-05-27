// Get a reference to the Firebase database service
const database = firebase.database()

// Get author data and show it on the page
const author = new Author()
database
  .ref('portfolio/author')
  .once('value')
  .then(snapshot => snapshot.val())
  // .then(data => console.log(data))
  .then(data => author.update(data))

// Get portfolio items
database
  .ref('portfolio/items')
  .once('value')
  .then(snapshot => snapshot.val())
  // .then(data => console.log(data))
  .then(items => Portfolio.addAll(items))
