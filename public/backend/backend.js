class UI {
  static setAuthor(author) {
    document.getElementById('author-name').value = author.name
    document.getElementById('author-profession').value = author.profession
    document.getElementById('author-bio').value = author.bio
    document.getElementById('author-image').src = author.image
  }

  static showAlert(type, message) {
    const alertElement = document.createElement('div')
    alertElement.className = 'alert alert-' + type
    alertElement.textContent = message
    document.body.insertBefore(alertElement, document.querySelector('.container-fluid'))
    setTimeout(() => alertElement.remove(), 3000)
  }

  static addPortfolioItem(item) {
    const date = new Date(item.created).toString().split(' ')[1] + ' ' + new Date(item.created).toString().split(' ')[3]
    const tags = item.tags.map(item => `<span class="badge badge-dark">${item}</span>`).join(' ')

    const div = document.createElement('div')
    div.className = 'card m-0 portfolio-item'
    div.id = item.id
    div.innerHTML = `
      <img src="${item.image}" class="card-img-top" alt="${item.title}" />
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.description.substring(0, 200) + '...'}</p>
        ${tags}
        </div>
      <div class="card-footer">
        <small class="text-muted">${date}</small>
        <span class="float-right">
        <span class="d-none delete-question">Delete?</span>
        <a href="#" class="card-link text-danger delete-btn">delete</a>
        <a href="#" class="d-none card-link delete-no-btn">no</a>
        <a href="#" class="d-none card-link text-danger delete-yes-btn">yes</a>
        <a href="#" class="card-link edit-btn">edit</a>
        </span>
      </div>
    `
    document.getElementById('portfolio').appendChild(div)
    div.querySelector('.edit-btn').addEventListener('click', e => {
      e.preventDefault()
      UI.loadItemToEdit(item)
    })
    div.querySelector('.delete-btn').addEventListener('click', e => {
      e.preventDefault()

      div.querySelector('.delete-question').classList.remove('d-none')
      div.querySelector('.delete-no-btn').classList.remove('d-none')
      div.querySelector('.delete-yes-btn').classList.remove('d-none')
      div.querySelector('.delete-btn').classList.add('d-none')
      div.querySelector('.edit-btn').classList.add('d-none')

      setTimeout(() => div.querySelector('.delete-no-btn').click(), 5000)
    })
    div.querySelector('.delete-no-btn').addEventListener('click', e => {
      e.preventDefault()

      div.querySelector('.delete-question').classList.add('d-none')
      div.querySelector('.delete-no-btn').classList.add('d-none')
      div.querySelector('.delete-yes-btn').classList.add('d-none')
      div.querySelector('.delete-btn').classList.remove('d-none')
      div.querySelector('.edit-btn').classList.remove('d-none')
    })
    div.querySelector('.delete-yes-btn').addEventListener('click', e => {
      e.preventDefault()
      Database.deletePortfolioItem(item).then(
        result => document.getElementById(item.id).remove(),
        err => UI.showAlert('danger', 'Something went wrong. Try again!')
      )
    })
  }

  static updatePortfolioItem(item) {
    const date = new Date(item.created).toString().split(' ')[1] + ' ' + new Date(item.created).toString().split(' ')[3]
    const tags = item.tags.map(item => `<span class="badge badge-dark">${item}</span>`).join(' ')

    const div = document.getElementById(item.id)
    div.innerHTML = `
      <img src="${item.image}" class="card-img-top" alt="${item.title}" />
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.description.substring(0, 200) + '...'}</p>
        ${tags}
        </div>
      <div class="card-footer">
        <small class="text-muted">${date}</small>
        <span class="float-right">
        <span class="d-none delete-question">Delete?</span>
        <a href="#" class="card-link text-danger delete-btn">delete</a>
        <a href="#" class="d-none card-link delete-no-btn">no</a>
        <a href="#" class="d-none card-link text-danger delete-yes-btn">yes</a>
        <a href="#" class="card-link edit-btn">edit</a>
        </span>
      </div>
    `
    div.querySelector('.edit-btn').addEventListener('click', e => {
      e.preventDefault()
      UI.loadItemToEdit(item)
    })
    div.querySelector('.delete-btn').addEventListener('click', e => {
      e.preventDefault()

      div.querySelector('.delete-question').classList.remove('d-none')
      div.querySelector('.delete-no-btn').classList.remove('d-none')
      div.querySelector('.delete-yes-btn').classList.remove('d-none')
      div.querySelector('.delete-btn').classList.add('d-none')
      div.querySelector('.edit-btn').classList.add('d-none')

      setTimeout(() => div.querySelector('.delete-no-btn').click(), 5000)
    })
    div.querySelector('.delete-no-btn').addEventListener('click', e => {
      e.preventDefault()

      div.querySelector('.delete-question').classList.add('d-none')
      div.querySelector('.delete-no-btn').classList.add('d-none')
      div.querySelector('.delete-yes-btn').classList.add('d-none')
      div.querySelector('.delete-btn').classList.remove('d-none')
      div.querySelector('.edit-btn').classList.remove('d-none')
    })
    div.querySelector('.delete-yes-btn').addEventListener('click', e => {
      e.preventDefault()
      Database.deletePortfolioItem(item).then(
        result => document.getElementById(item.id).remove(),
        err => UI.showAlert('danger', 'Something went wrong. Try again!')
      )
    })
  }

  static loadItemToEdit(item) {
    document.getElementById('item-form').focus()
    document.getElementById('item-form').parentElement.parentElement.scrollIntoView()
    document.getElementById('id').value = item.id
    document.getElementById('created').value = item.created
    document.getElementById('title').value = item.title
    document.getElementById('excerpt').value = item.excerpt
    document.getElementById('image').value = item.image
    document.getElementById('description').value = item.description
    document.getElementById('tags').value = item.tags.join(', ')
    document.getElementById('link-url').value = item.link.url
    document.getElementById('link-title').value = item.link.title

    document.getElementById('id-and-created').classList.remove('d-none')
    document.getElementById('new-item-button-form').classList.remove('d-none')
    document.getElementById('item-form-title').textContent = 'Edit Portfolio Item'
    document.getElementById('item-submit').textContent = 'Save Changes'
  }

  static resetItemForm() {
    document.getElementById('item-form').focus()
    document.getElementById('item-form').parentElement.parentElement.scrollIntoView()
    document.getElementById('id').value = ''
    document.getElementById('created').value = ''
    document.getElementById('title').value = ''
    document.getElementById('excerpt').value = ''
    document.getElementById('image').value = ''
    document.getElementById('description').value = ''
    document.getElementById('tags').value = ''
    document.getElementById('link-url').value = ''
    document.getElementById('link-title').value = ''

    document.getElementById('id-and-created').classList.add('d-none')
    document.getElementById('new-item-button-form').classList.add('d-none')
    document.getElementById('item-form-title').textContent = 'Create New Portfolio Item'
    document.getElementById('item-submit').textContent = 'Add to Portfolio'
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

document.getElementById('new-item-button-form').addEventListener('click', e => {
  e.preventDefault()
  UI.resetItemForm()
})

document.getElementById('new-item-button').addEventListener('click', e => {
  e.preventDefault()
  UI.resetItemForm()
})

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
    UI.showAlert('warning', 'Please insert a name.')
    return
  }
  if (bio.value === '') {
    bio.style.borderColor = 'red'
    UI.showAlert('warning', 'Please insert a biography.')
    return
  }

  const author = {
    name: name.value,
    bio: bio.value,
    image: image.src,
    profession: profession.value
  }

  Database.setAuthor(author).then(
    result => UI.showAlert('success', 'Information saved!'),
    err => UI.showAlert('danger', 'Something went wrong. Try again!')
  )
})

document.getElementById('item-form').addEventListener('submit', e => {
  e.preventDefault()

  const id = document.getElementById('id')
  const created = document.getElementById('created')
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

  setTimeout(() => {
    title.style.borderColor = ''
    excerpt.style.borderColor = ''
    image.style.borderColor = ''
    description.style.borderColor = ''
    tags.style.borderColor = ''
    linkUrl.style.borderColor = ''
    linkTitle.style.borderColor = ''
  }, 5000)

  if (
    title.value === '' ||
    excerpt.value === '' ||
    image.value === '' ||
    description.value === '' ||
    tags.value === '' ||
    linkUrl.value === '' ||
    linkTitle.value === ''
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
