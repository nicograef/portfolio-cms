class UI {
  static setAuthor(author) {
    document.getElementById('author-name').value = author.name
    document.getElementById('author-profession').value = author.profession
    document.getElementById('author-bio').value = author.bio
    document.getElementById('author-image').src = author.image
  }

  static showAuthorAlert(type, message) {
    const alertElement = document.createElement('div')
    alertElement.className = 'alert alert-' + type
    alertElement.textContent = message
    // document.getElementById('author-submit').before(alertElement)
    document
      .getElementById('author-submit')
      .parentNode.insertBefore(alertElement, document.getElementById('author-submit'))
    setTimeout(() => alertElement.remove(), 3000)
  }

  static showNewItemAlert(type, message) {
    const alertElement = document.createElement('div')
    alertElement.className = 'alert alert-' + type
    alertElement.textContent = message
    // document.getElementById('author-submit').before(alertElement)
    document
      .getElementById('new-item-submit')
      .parentNode.insertBefore(alertElement, document.getElementById('new-item-submit'))
    setTimeout(() => alertElement.remove(), 3000)
  }

  static addPortfolioItem(item) {
    const li = document.createElement('li')
    li.className = 'portfolio-item media py-3 border-bottom'
    li.innerHTML = `
    <div style="background: url(${item.image})" class="image mr-3"></div>
    <div class="media-body">
      <h5 class="mt-0 mb-1">${item.title}</h5>
      ${item.description}
    </div>
    `
    document.getElementById('portfolio').appendChild(li)
  }
}

Database.author().then(author => UI.setAuthor(author))

// Load portfolio (items) from database, create html elements for each item and add them to the page
function loadPortfolio() {
  return Database.allPortfolioItems().then(items => {
    for (let itemId in items) {
      UI.addPortfolioItem(items[itemId])
    }
  })
}

loadPortfolio()

document.getElementById('author-form').addEventListener('submit', e => {
  e.preventDefault()

  const name = document.getElementById('author-name')
  const profession = document.getElementById('author-profession')
  const bio = document.getElementById('author-bio')
  const image = document.getElementById('author-image')

  name.style.borderColor = ''
  bio.style.borderColor = ''

  if (name.value === '') {
    name.style.borderColor = 'red'
    UI.showAuthorAlert('warning', 'Please insert a name.')
    return
  }
  if (bio.value === '') {
    bio.style.borderColor = 'red'
    UI.showAuthorAlert('warning', 'Please insert a biography.')
    return
  }

  const author = {
    name: name.value,
    bio: bio.value,
    image: image.src,
    profession: profession.value
  }

  Database.setAuthor(author).then(
    result => UI.showAuthorAlert('success', 'Information saved!'),
    err => UI.showAuthorAlert('danger', 'Something went wrong. Try again!')
  )
})

document.getElementById('new-item-form').addEventListener('submit', e => {
  e.preventDefault()

  const title = document.getElementById('title')
  const excerpt = document.getElementById('excerpt')
  const image = document.getElementById('image')
  const description = document.getElementById('description')
  const tags = document.getElementById('tags')
  const linkUrl = document.getElementById('link-url')
  const linkTitle = document.getElementById('link-title')

  title.style.borderColor = title.value.length ? '' : 'red'
  excerpt.style.borderColor = excerpt.value.length ? '' : 'red'
  image.style.borderColor = image.value.length ? '' : 'red'
  description.style.borderColor = description.value.length ? '' : 'red'
  tags.style.borderColor = tags.value.length ? '' : 'red'
  linkUrl.style.borderColor = linkUrl.value.length ? '' : 'red'
  linkTitle.style.borderColor = linkTitle.value.length ? '' : 'red'

  if (
    title.value === '' ||
    excerpt.value === '' ||
    image.value === '' ||
    description.value === '' ||
    tags.value === '' ||
    linkUrl.value === '' ||
    linkTitle.value === ''
  ) {
    UI.showNewItemAlert('warning', 'Please check the red fields.')
    return
  }

  const newItem = {
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

  // Get a key for a new portfolio item
  newItem.id = firebase
    .database()
    .ref()
    .child('portfolio/items')
    .push().key

  Database.addPortfolioItem(newItem).then(
    result => UI.showNewItemAlert('success', 'Information saved!'),
    err => UI.showNewItemAlert('danger', 'Something went wrong. Try again!')
  )
})
