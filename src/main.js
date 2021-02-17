import Vue from "vue";
import App from "./App.vue";
import "./quasar";
// import * as firebase from "firebase/app";
import "firebase/messaging";
// firebase.initializeApp({
//   apiKey: "AIzaSyBB_19-jmAqej8PmoXInlT72z7CtlxeecA",
//   authDomain: "test2-5ea07.firebaseapp.com",
//   projectId: "test2-5ea07",
//   storageBucket: "test2-5ea07.appspot.com",
//   messagingSenderId: "1021140699843",
//   appId: "1:1021140699843:web:aa21e89f4d6b5b32693076",
//   measurementId: "G-XJDTXE5TTM"
// });
// const messaging = firebase.messaging();
// //messaging.usePublicVapidKey("<MY VAPID KEY IN HERE>");
// navigator.serviceWorker
//   .register("firebase-messaging-sw.js", {
//     scope: "firebase-cloud-messaging-push-scope"
//   })
//   .then(registration => {
//     const messaging = firebase.messaging();
//     messaging.useServiceWorker(registration);
//   })
//   .catch(err => {
//     console.log(err);
//   });
navigator.serviceWorker
  .register("firebase-messaging-sw.js")
  .then(function(registration) {
    console.log("Service Worker Registered!", registration);
  })
  .catch(function(err) {
    console.error("Service Worker registration failed", err);
  });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
