const database = new Database()
const author = new Author('author-name', 'author-bio', 'author-image')

database.author().then(data => author.update(data))
