importScripts 'https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js'
importScripts 'https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js'

live = require "~/config/live.yml"
firebase.initializeApp live.firebase
messaging = firebase.messaging()

messaging.setBackgroundMessageHandler (payload)->
  console.log payload
  self.registration.showNotification title, payload.notification


self.addEventListener 'install', (event)->
  console.log 'Service Worker installing.'

self.addEventListener 'activate', (event)->
  console.log 'Service Worker activating.'
