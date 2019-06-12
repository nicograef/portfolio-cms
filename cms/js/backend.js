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
// Loader Element
const loader = document.getElementById('loader')

const db = new Database(portfolioID)

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    loader.classList.remove('d-none')
    if (user.uid !== portfolioID) {
      firebase.auth().signOut()
      UI.showAlert('danger', 'Wrong User Account!')
      return
    }
    // console.log('logged in', user)

    // User is signed in
    loginForm.remove()
    UI.init()

    db.author().then(author => {
      UI.setAuthor(author)

      // check if first start, i.e. portfolio has not been setup/initialized yet
      if (author.name === '') {
        UI.showAuthorForm()
        UI.showAlert('warning', 'Please insert author information.')
      }

      loader.remove()
      page.classList.remove('d-none')
    })

    db.allPortfolioItems().then(items => {
      for (let itemId in items) {
        const newUIElement = UI.addPortfolioItem(items[itemId])
        initEventListenersForPortfolioItem(items[itemId], newUIElement)
      }
    })
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
    profession: authorProfession.value
  }

  if (authorImage.files[0] !== undefined) {
    // take image file from file input, upload to firebase storage an set the download link as new image source
    const fileType = authorImage.files[0].type.split('/')[1]
    const fileName = 'author.' + fileType

    if (!['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
      UI.showAlert('warning', 'Wrong image type. Please use png, jpg, jpeg or gif.')
      return
    }

    db.addOrUpdateImage(fileName, authorImagePreview.src)
      .then(downloadURL => {
        author.image = downloadURL
        updateAuthor(author)
      })
      .catch(err => UI.showAlert('danger', 'Something went wrong. Try again!'))

    // reset input value
    authorImage.value = ''
    if (!/safari/i.test(navigator.userAgent)) {
      authorImage.type = ''
      authorImage.type = 'file'
    }
  } else {
    // test if current image source is correct
    const testImage = new Image()
    testImage.onerror = () => UI.showAlert('warning', 'Please upload an image.')
    testImage.onload = () => {
      author.image = authorImagePreview.src
      updateAuthor(author)
    }
    testImage.src = authorImagePreview.src
  }
})

itemForm.addEventListener('submit', e => {
  e.preventDefault()
  UI.markEmptyInputFields()

  if (title.value === '' || imagePreview.src === '' || description.value === '') {
    UI.showAlert('warning', 'Please check the red fields.')
    return
  }

  const item = {
    title: title.value,
    excerpt: excerpt.value,
    description: description.value,
    tags: tags.value.replace(/\s*,\s*/g, ',').length ? tags.value.replace(/\s*,\s*/g, ',').split(',') : null,
    link: {
      title: linkTitle.value,
      url: linkUrl.value
    }
  }

  // DEBUGGING
  // id.value = ''
  let updated = false
  if (id.value === '') {
    item.id = db.getNewItemID()
    item.created = Date.now()
  } else {
    updated = true
    item.id = id.value
    item.created = Number(created.value)
  }

  if (image.files[0] !== undefined) {
    // take image file from file input, upload to firebase storage an set the download link as new image source
    const fileType = image.files[0].type.split('/')[1]
    const fileName = item.id + fileType

    if (!['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
      UI.showAlert('warning', 'Wrong image type. Please use png, jpg, jpeg or gif.')
      return
    }

    db.addOrUpdateImage(fileName, imagePreview.src)
      .then(downloadURL => {
        item.image = downloadURL
        addOrUpdateItem(item, updated)
      })
      .catch(err => UI.showAlert('danger', 'Something went wrong. Try again!'))
  } else {
    // test if current image source is correct
    const testImage = new Image()
    testImage.onerror = () => UI.showAlert('warning', 'Please upload an image.')
    testImage.onload = () => {
      item.image = imagePreview.src
      addOrUpdateItem(item, updated)
    }
    testImage.src = imagePreview.src
  }
})

authorImage.addEventListener('change', e => {
  const file = authorImage.files[0]
  const reader = new FileReader()
  reader.onload = e => (authorImagePreview.src = reader.result)
  reader.readAsDataURL(file)
})

image.addEventListener('change', e => {
  const file = image.files[0]
  const reader = new FileReader()
  reader.onload = e => (imagePreview.src = reader.result)
  reader.readAsDataURL(file)
})

function updateAuthor(author) {
  db.setAuthor(author).then(
    result => {
      UI.closeForms()
      UI.setAuthor(author)
      UI.showAlert('success', 'Information saved!')
    },
    err => UI.showAlert('danger', 'Something went wrong. Try again!')
  )
}

function addOrUpdateItem(item, updated) {
  db.addOrUpdatePortfolioItem(item)
    .then(() => {
      UI.closeForms()
      if (updated) UI.updatePortfolioItem(item)
      else UI.addPortfolioItem(item)
      UI.showAlert('success', updated ? 'Item was updated!' : 'Item added to your portfolio!')
    })
    .catch(err => UI.showAlert('danger', 'Something went wrong. Try again!'))
}

function initEventListenersForPortfolioItem(item, uiElement) {
  uiElement.querySelector('.edit-btn').addEventListener('click', e => {
    e.preventDefault()
    db.getPortfolioItem(item.id)
      .then(item => UI.loadItemToEdit(item))
      .catch(err => UI.showAlert('danger', 'Something went wrong. Try again!'))
  })
  uiElement.querySelector('.delete-btn').addEventListener('click', e => {
    e.preventDefault()

    uiElement.querySelector('.delete-question').classList.remove('d-none')
    uiElement.querySelector('.delete-no-btn').classList.remove('d-none')
    uiElement.querySelector('.delete-yes-btn').classList.remove('d-none')
    uiElement.querySelector('.delete-btn').classList.add('d-none')
    uiElement.querySelector('.edit-btn').classList.add('d-none')

    setTimeout(() => uiElement.querySelector('.delete-no-btn').click(), 5000)
  })
  uiElement.querySelector('.delete-no-btn').addEventListener('click', e => {
    e.preventDefault()

    uiElement.querySelector('.delete-question').classList.add('d-none')
    uiElement.querySelector('.delete-no-btn').classList.add('d-none')
    uiElement.querySelector('.delete-yes-btn').classList.add('d-none')
    uiElement.querySelector('.delete-btn').classList.remove('d-none')
    uiElement.querySelector('.edit-btn').classList.remove('d-none')
  })
  uiElement.querySelector('.delete-yes-btn').addEventListener('click', e => {
    e.preventDefault()
    db.deletePortfolioItem(item)
      .then(() => uiElement.remove())
      .catch(err => UI.showAlert('danger', 'Something went wrong. Try again!'))
  })
}
