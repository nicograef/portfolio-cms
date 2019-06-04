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
async function loadPortfolio() {
  const items = await db.allPortfolioItems()
  for (let itemId in items) {
    UI.addPortfolioItem(items[itemId])
  }
}

// load author data from database and fill the intro/author html elements with the information
async function loadAuthor() {
  const author = await db.author()
  if (!author) {
    return '3Please provide a portfolio id in the portfolioID.js file.'
  } else if (author.name === '') {
    return 'Please got to <a href="admin">/admin</a> and set up your portfolio.'
  }
  UI.setAuthor(author)
  return null
}

const db = new Database(portfolioID)
const storage = firebase.storage()

storage
  .ref('author.jpg')
  .getDownloadURL()
  .then(url => {
    console.log(url)
  })
  .catch(error => {
    console.log(error)
  })

UI.init()
loadPortfolio()
  .then(loadAuthor)
  .then(result => {
    if (result) UI.showInfo(result)
    else UI.showPage()
  })
