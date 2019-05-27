class Author {
  constructor(nameElement, bioElement, imageElement) {
    this.name = ''
    this.bio = ''
    this.image = ''
    this.nameElement = nameElement
    this.bioElement = bioElement
    this.imageElement = imageElement
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
