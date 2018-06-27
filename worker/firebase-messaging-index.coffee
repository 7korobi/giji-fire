importScripts 'https://www.gstatic.com/firebasejs/4.0.0/firebase-app.js'
importScripts 'https://www.gstatic.com/firebasejs/4.0.0/firebase-messaging.js'

live = require "~/config/live.yml"
firebase.initializeApp live.firebase
messaging = firebase.messaging()

messaging.setBackgroundMessageHandler (payload)->
  console.log payload
  title = 'Background Message Title'

  self.registration.showNotification title,
    body: 'Background Message body.'
    icon: '/firebase-logo.png'
