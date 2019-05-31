// Author Form Fields
const authorForm = document.getElementById('author-form')
const authorName = document.getElementById('author-name')
const authorBio = document.getElementById('author-bio')
const authorImage = document.getElementById('author-image')
const authorProfession = document.getElementById('author-profession')

// Item Form Fields
const itemForm = document.getElementById('item-form')
const itemFormTitle = document.getElementById('item-form-title')
const itemFormSubmit = document.getElementById('item-form-submit')
const id = document.getElementById('id')
const created = document.getElementById('created')
const title = document.getElementById('title')
const description = document.getElementById('description')
const excerpt = document.getElementById('excerpt')
const image = document.getElementById('image')
const tags = document.getElementById('tags')
const linkUrl = document.getElementById('link-url')
const linkTitle = document.getElementById('link-title')

// Portfolio Wrapper
const portfolio = document.getElementById('portfolio')

// Alert Element
const alert = document.getElementById('alert')

// Buttons
const btnNewItem = document.getElementById('btn-new-item')
const btnEditAuthor = document.getElementById('btn-edit-author')

class UI {
  static init() {
    btnNewItem.addEventListener('click', e => {
      e.preventDefault()
      UI.resetItemForm()
    })

    btnEditAuthor.addEventListener('click', e => {
      e.preventDefault()
      UI.focusAuthorForm()
    })
  }
  static setAuthor(author) {
    authorName.value = author.name
    authorProfession.value = author.profession
    authorBio.value = author.bio
    authorImage.src = author.image
  }

  static showAlert(type, message) {
    alert.textContent = message
    alert.className = `alert alert-${type}`
    setTimeout(() => (alert.className = `alert d-none`), 3000)
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
    portfolio.appendChild(div)
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
    id.value = item.id
    created.value = item.created
    title.value = item.title
    excerpt.value = item.excerpt
    image.value = item.image
    description.value = item.description
    tags.value = item.tags.join(', ')
    linkUrl.value = item.link.url
    linkTitle.value = item.link.title

    itemFormTitle.textContent = 'Edit Portfolio Item'
    itemFormSubmit.textContent = 'Save Changes'

    UI.focusItemForm()
  }

  static resetItemForm() {
    id.value = ''
    created.value = ''
    title.value = ''
    excerpt.value = ''
    image.value = ''
    description.value = ''
    tags.value = ''
    linkUrl.value = ''
    linkTitle.value = ''

    itemFormTitle.textContent = 'Create New Portfolio Item'
    itemFormSubmit.textContent = 'Add to Portfolio'

    UI.focusItemForm()
  }

  static focusItemForm() {
    itemForm.focus()
    itemForm.parentElement.parentElement.scrollIntoView()
  }

  static focusAuthorForm() {
    authorForm.focus()
    authorForm.parentElement.parentElement.scrollIntoView()
  }

  static markEmptyInputFields() {
    title.style.borderColor = title.value.length ? '' : 'red'
    excerpt.style.borderColor = excerpt.value.length ? '' : 'red'
    image.style.borderColor = image.value.length ? '' : 'red'
    description.style.borderColor = description.value.length ? '' : 'red'
    tags.style.borderColor = tags.value.length ? '' : 'red'

    setTimeout(() => {
      title.style.borderColor = ''
      excerpt.style.borderColor = ''
      image.style.borderColor = ''
      description.style.borderColor = ''
      tags.style.borderColor = ''
    }, 5000)
  }
}
