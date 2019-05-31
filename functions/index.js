// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions')

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
admin.initializeApp()

exports.initUserData = functions.auth.user().onCreate(user => {
  const data = {
    author: {
      name: '',
      profession: '',
      bio: '',
      image: 'https://portfolio-cms-0742.web.app/img/author.jpg'
    }
  }
  admin
    .database()
    .ref('/users/' + user.uid)
    .set(data)
})
