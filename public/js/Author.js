class Author {
  constructor(nameElementId, bioElementId, imageElementId) {
    this.name = ''
    this.bio = ''
    this.image = ''
    this.nameElement = document.getElementById(nameElementId)
    this.bioElement = document.getElementById(bioElementId)
    this.imageElement = document.getElementById(imageElementId)
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
