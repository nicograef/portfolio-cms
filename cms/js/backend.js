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

const loginForm = document.getElementById('login-form')
const page = document.getElementById('main')

const db = new Database(portfolioID)

UI.init()
db.author().then(author => UI.setAuthor(author))
db.allPortfolioItems().then(items => {
  for (let itemId in items) {
    UI.addPortfolioItem(items[itemId])
  }
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (user.uid !== portfolioID) {
      firebase.auth().signOut()
      UI.showAlert('danger', 'Wrong User Account!')
      return
    }
    console.log('logged in', user)

    // User is signed in
    loginForm.classList.add('d-none')
    page.classList.remove('d-none')
  } else {
    // User is signed out.
    page.classList.add('d-none')
    loginForm.classList.remove('d-none')
  }
})

loginForm.addEventListener('submit', e => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => UI.showAlert('danger', err.message))
})

authorForm.addEventListener('submit', e => {
  e.preventDefault()

  if (authorName.value === '') {
    authorName.classList.add('is-invalid')
    setTimeout(() => title.classList.remove('is-invalid'), 5000)
    UI.showAlert('warning', 'Please insert a name.')
    return
  }

  const author = {
    name: authorName.value,
    bio: authorBio.value,
    image: authorImage.src,
    profession: authorProfession.value
  }

  db.setAuthor(author).then(
    result => UI.showAlert('success', 'Information saved!'),
    err => UI.showAlert('danger', 'Something went wrong. Try again!')
  )
})

itemForm.addEventListener('submit', e => {
  e.preventDefault()

  UI.markEmptyInputFields()

  if (
    title.value === '' ||
    excerpt.value === '' ||
    image.value === '' ||
    description.value === '' ||
    tags.value === ''
  ) {
    UI.showAlert('warning', 'Please check the red fields.')
    return
  }

  const item = {
    title: title.value,
    excerpt: excerpt.value,
    image: image.value,
    description: description.value,
    tags: tags.value.replace(/,\s+/g, ',').split(','),
    link: {
      title: linkTitle.value,
      url: linkUrl.value
    }
  }

  // DEBUGGING
  // id.value = ''

  if (id.value === '') {
    item.created = Date.now()
    db.addPortfolioItem(item).then(
      result => {
        UI.showAlert('success', 'Item added to your portfolio!')
        UI.addPortfolioItem(item)
      },
      err => UI.showAlert('danger', 'Something went wrong. Try again!')
    )
  } else {
    item.id = id.value
    item.created = Number(created.value)
    db.updatePortfolioItem(item).then(
      result => {
        UI.showAlert('success', 'Item was updated!')
        UI.updatePortfolioItem(item)
      },
      err => UI.showAlert('danger', 'Something went wrong. Try again!')
    )
  }
})
