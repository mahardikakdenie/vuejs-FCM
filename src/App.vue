<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://github.com/quasarframework/"
        >
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://chat.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://forum.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://twitter.com/quasarframework"
        >
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <HelloWorld />
      <Notifications />
    </q-page-container>
  </q-layout>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Notifications from "./components/Custom.vue";

import * as firebase from "firebase/app";
import "firebase/messaging";

export default {
  name: "LayoutDefault",

  components: {
    HelloWorld,
    Notifications
  },

  data() {
    return {
      leftDrawerOpen: false
    };
  },
  created() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyDa1XYXcr9FFphwrPUdf8XnEAVI4DSGTGI",
      authDomain: "laravelfcm-7b5a0.firebaseapp.com",
      databaseURL: "https://web-notification-2480c.firebaseio.com",
      projectId: "laravelfcm-7b5a0",
      storageBucket: "laravelfcm-7b5a0.appspot.com",
      messagingSenderId: "1060380881449",
      appId: "1:1060380881449:web:f14bb66bbb2c40e67d6238",
      measurementId: "G-1714BNX10W"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(function() {
        //MsgElem.innerHTML = "Notification permission granted."
        console.log("Notification permission granted.");

        // get the token in the form of promise
        return messaging.getToken();
      })
      .then(function(token) {
        // print the token on the HTML page
        console.log(token);
      })
      .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
      });

    messaging.onMessage(function(payload) {
      console.log(payload); //
      // eslint-disable-next-line no-unused-vars
      var notify;
      notify = new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,
        tag: "Dummy"
      });
      console.log(payload.notification);
    });

    //firebase.initializeApp(config);
    var database = firebase
      .database()
      .ref()
      .child("/users/");

    database.on("value", function(snapshot) {
      // eslint-disable-next-line no-undef
      renderUI(snapshot.val());
    });

    // On child added to db
    database.on("child_added", function(data) {
      console.log("Comming");
      if (Notification.permission !== "default") {
        var notify;

        notify = new Notification("CodeWife - " + data.val().username, {
          body: data.val().message,
          icon: "bell.png",
          tag: data.getKey()
        });
        notify.onclick = function() {
          alert(this.tag);
        };
      } else {
        alert("Please allow the notification first");
      }
    });

    self.addEventListener("notificationclick", function(event) {
      event.notification.close();
    });
  }
};
</script>

<style></style>
