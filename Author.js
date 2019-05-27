// Author and Intro UI Elements
// const introElement = document.getElementById('intro')
// const authorNameElement = document.getElementById('author-name')
// const authorBioElement = document.getElementById('author-bio')
// const authorImageElement = document.getElementById('author-image')

class Author {
  constructor() {
    this.name = ''
    this.bio = ''
    this.image = ''
    this.nameElement = document.getElementById('author-name')
    this.bioElement = document.getElementById('author-bio')
    this.imageElement = document.getElementById('author-image')
  }

  update(newData) {
    this.name = newData.name
    this.bio = newData.bio
    this.image = newData.image
    this.updateUI()
  }

  updateUI() {
    this.nameElement.textContent = this.name
    this.bioElement.textContent = this.bio
    this.imageElement.src = this.image
  }
}
