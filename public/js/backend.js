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

UI.init()
Database.author().then(author => UI.setAuthor(author))
Database.allPortfolioItems().then(items => {
  for (let itemId in items) {
    UI.addPortfolioItem(items[itemId])
  }
})

authorForm.addEventListener('submit', e => {
  e.preventDefault()

  authorName.style.borderColor = ''
  authorBio.style.borderColor = ''

  if (authorName.value === '') {
    authorName.style.borderColor = 'red'
    UI.showAlert('warning', 'Please insert a name.')
    return
  }
  if (authorBio.value === '') {
    authorBio.style.borderColor = 'red'
    UI.showAlert('warning', 'Please insert a biography.')
    return
  }

  const author = {
    name: authorName.value,
    bio: authorBio.value,
    image: authorImage.src,
    profession: authorProfession.value
  }

  Database.setAuthor(author).then(
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
    Database.addPortfolioItem(item).then(
      result => {
        UI.showAlert('success', 'Item added to your portfolio!')
        UI.addPortfolioItem(item)
      },
      err => UI.showAlert('danger', 'Something went wrong. Try again!')
    )
  } else {
    item.id = id.value
    item.created = Number(created.value)
    Database.updatePortfolioItem(item).then(
      result => {
        UI.showAlert('success', 'Item was updated!')
        UI.updatePortfolioItem(item)
      },
      err => UI.showAlert('danger', 'Something went wrong. Try again!')
    )
  }
})
