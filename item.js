const itemId = location.search.split('?id=')[1]
const titleElement = document.getElementById('title')
const contentElement = document.getElementById('text')
const tagsElement = document.getElementById('tags')
const featureImageElement = document.getElementById('feature-image')
// TODO set feature image to item image

// fetch('https://jsonplaceholder.typicode.com/posts/' + itemId)
//   .then(response => response.json())
//   .then(json => fillPageWithContent(json))

// Get a reference to the database service
const database = firebase.database()

database
  .ref('portfolio/items')
  .once('value')
  .then(snapshot => snapshot.val())
  // .then(data => console.log(data))
  .then(items => items.filter(item => item.id === itemId)[0])
  .then(item => fillPageWithContent(item))

function fillPageWithContent(item) {
  console.log(item)

  titleElement.textContent = item.title
  contentElement.textContent = item.content

  item.tags.forEach(tag => {
    let newTagElement = document.createElement('span')
    newTagElement.className = 'badge badge-dark'
    newTagElement.textContent = tag
    tagsElement.appendChild(newTagElement)
    tagsElement.appendChild(document.createTextNode(' '))
  })
}
