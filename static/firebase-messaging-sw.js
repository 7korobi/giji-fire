(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports) {

module.exports = {"cache":{"name":"cache-2018-08-28"},"game":{"folder_id":"beta"},"url":{"web":"https://giji.f5.si","api":"https://giji-api.duckdns.org/api","firebase":"https://api-project-54633717694.firebaseapp.com","assets":"https://api-project-54633717694.firebaseapp.com","store":"https://s3-ap-northeast-1.amazonaws.com/giji-assets","sow":"https://s3-ap-northeast-1.amazonaws.com/giji-assets/sow"},"firebase":{"projectId":"api-project-54633717694","storageBucket":"api-project-54633717694.appspot.com","authDomain":"api-project-54633717694.firebaseapp.com","databaseURL":"https://api-project-54633717694.firebaseio.com","messagingSenderId":"54633717694","apiKey":"AIzaSyAC3N874UpvVZTYmh88mDHkuWKfUDhj25o"}}

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var live, messaging;

importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js');

importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js');

live = __webpack_require__(6);

firebase.initializeApp(live.firebase);

messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(payload);
  return self.registration.showNotification(title, payload.notification);
});

self.addEventListener('install', function (event) {
  return console.log('Service Worker installing.');
});

self.addEventListener('activate', function (event) {
  return console.log('Service Worker activating.');
});

/***/ })

/******/ })));
//# sourceMappingURL=firebase-messaging-sw.js.map