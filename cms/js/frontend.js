const firebaseConfig = {
  apiKey: 'AIzaSyApCOXyLzjP2YEZmPjsES3ncfikk7ZRBRo',
  authDomain: 'portfolio-cms-0742.firebaseapp.com',
  databaseURL: 'https://portfolio-cms-0742.firebaseio.com',
  projectId: 'portfolio-cms-0742',
  storageBucket: 'portfolio-cms-0742.appspot.com',
  messagingSenderId: '716629582483',
  appId: '1:716629582483:web:dc49515996032d6d'
}
firebase.initializeApp(firebaseConfig)

// Load portfolio (items) from database, create html elements for each item and add them to the page
function loadPortfolio() {
  return db.allPortfolioItems().then(items => {
    for (let itemId in items) {
      UI.addPortfolioItem(items[itemId])
    }
  })
}

// load author data from database and fill the intro/author html elements with the information
function loadAuthor() {
  return db.author().then(author => UI.setAuthor(author))
}

const db = new Database(portfolioID)

UI.init()
loadAuthor()
  .then(loadPortfolio)
  .then(UI.showPage)
