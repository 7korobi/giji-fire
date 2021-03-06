importScripts 'https://www.gstatic.com/firebasejs/5.8.5/firebase-app.js'
importScripts 'https://www.gstatic.com/firebasejs/5.8.5/firebase-messaging.js'

live = require "~/../giji/config/yaml/live.yml"
firebase.initializeApp live.firebase
messaging = firebase.messaging()

messaging.setBackgroundMessageHandler (payload)->
  console.log payload
  self.registration.showNotification title, payload.notification


self.addEventListener 'install', (event)->
  console.log 'Service Worker installing.'

self.addEventListener 'activate', (event)->
  console.log 'Service Worker activating.'
