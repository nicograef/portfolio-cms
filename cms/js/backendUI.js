// Author Form Fields
const authorFormWrapper = document.getElementById('author-form-wrapper')
const authorForm = document.getElementById('author-form')
const authorName = document.getElementById('author-name')
const authorBio = document.getElementById('author-bio')
const authorImage = document.getElementById('author-image')
const authorImagePreview = document.getElementById('author-image-preview')
const authorProfession = document.getElementById('author-profession')

// Item Form Fields
const itemFormWrapper = document.getElementById('item-form-wrapper')
const itemForm = document.getElementById('item-form')
const itemFormTitle = document.getElementById('item-form-title')
const itemFormSubmit = document.getElementById('item-form-submit')
const id = document.getElementById('id')
const created = document.getElementById('created')
const title = document.getElementById('title')
const description = document.getElementById('description')
const excerpt = document.getElementById('excerpt')
const image = document.getElementById('image')
const imagePreview = document.getElementById('image-preview')
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
      UI.closeForms()
      UI.showItemForm()
    })

    btnEditAuthor.addEventListener('click', e => {
      e.preventDefault()
      UI.closeForms()
      UI.showAuthorForm()
    })
  }
  static setAuthor(author) {
    authorName.value = author.name
    authorProfession.value = author.profession
    authorBio.value = author.bio
    authorImagePreview.src = author.image
  }

  static showAlert(type, message) {
    alert.textContent = message
    alert.className = `alert alert-${type}`
    setTimeout(() => (alert.className = `alert d-none`), 5000)
  }

  static addPortfolioItem(item) {
    const date = new Date(item.created).toString().split(' ')[1] + ' ' + new Date(item.created).toString().split(' ')[3]
    const tags = item.tags ? item.tags.map(item => `<span class="badge badge-dark">${item}</span>`).join(' ') : ''

    const div = document.createElement('div')
    div.className = 'card m-0 portfolio-item'
    div.id = item.id
    div.innerHTML = `
      <img src="${item.image}" class="card-img-top" alt="${item.title}" />
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text description">${item.description.substring(0, 200) + '...'}</p>
        <p class="card-text tags">${tags}</p>
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
    return div
  }

  static updatePortfolioItem(item) {
    const div = document.getElementById(item.id)

    div.querySelector('.card-title').textContent = item.title
    div.querySelector('.description').textContent = item.description.substring(0, 200) + '...'
    div.querySelector('img').src = item.image
    div.querySelector('img').alt = item.title

    const tags = item.tags ? item.tags.map(item => `<span class="badge badge-dark">${item}</span>`).join(' ') : ''
    div.querySelector('.tags').innerHTML = tags
  }

  static loadItemToEdit(item) {
    id.value = item.id
    created.value = item.created
    title.value = item.title
    excerpt.value = item.excerpt
    imagePreview.src = item.image
    description.value = item.description
    tags.value = item.tags ? item.tags.join(', ') : ''
    linkUrl.value = item.link.url
    linkTitle.value = item.link.title

    itemFormTitle.textContent = 'Edit Portfolio Item'
    itemFormSubmit.textContent = 'Update Item'

    UI.showItemForm()
  }

  static resetItemForm() {
    id.value = ''
    created.value = ''
    title.value = ''
    excerpt.value = ''
    description.value = ''
    tags.value = ''
    linkUrl.value = ''
    linkTitle.value = ''
    imagePreview.src = 'https://via.placeholder.com/200.jpg?text=no+image'

    // reset image input
    image.value = ''
    if (!/safari/i.test(navigator.userAgent)) {
      image.type = ''
      image.type = 'file'
    }

    itemFormTitle.textContent = 'Create New Portfolio Item'
    itemFormSubmit.textContent = 'Add to Portfolio'

    UI.showItemForm()
  }

  static showItemForm() {
    itemFormWrapper.classList.remove('d-none')
    itemFormWrapper.focus()
    // itemFormWrapper.scrollIntoView()
    window.scrollTo(0, 0)
  }

  static showAuthorForm() {
    authorFormWrapper.classList.remove('d-none')
    authorFormWrapper.focus()
    // authorFormWrapper.scrollIntoView()
    window.scrollTo(0, 0)
  }

  static closeForms() {
    UI.resetItemForm()
    itemFormWrapper.classList.add('d-none')
    authorFormWrapper.classList.add('d-none')
  }

  static resetPortfolio() {
    portfolio.innerHTML = ''
  }

  static markEmptyInputFields() {
    if (!title.value.length) title.classList.add('is-invalid')
    if (!description.value.length) description.classList.add('is-invalid')

    setTimeout(() => {
      title.classList.remove('is-invalid')
      description.classList.remove('is-invalid')
    }, 5000)
  }
}
