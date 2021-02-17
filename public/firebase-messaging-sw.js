/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: "567315129019"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon:
      "https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg" //your logo here
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
