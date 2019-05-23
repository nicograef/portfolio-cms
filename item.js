const itemId = location.search.split('?id=')[1]
const title = document.getElementById('title')
const text = document.getElementById('text')
const tags = document.getElementById('tags')

fetch('https://jsonplaceholder.typicode.com/posts/' + itemId)
  .then(response => response.json())
  .then(json => fillPageWithContent(json))

function fillPageWithContent(data) {
  title.textContent = data.title
  text.textContent = data.body

  data.tags = ['mobile', 'ux design', 'backend']
  data.tags.forEach(tag => {
    let newTag = document.createElement('span')
    newTag.className = 'badge badge-dark'
    newTag.textContent = tag
    tags.appendChild(newTag)
    tags.appendChild(document.createTextNode(' '))
  })
}
