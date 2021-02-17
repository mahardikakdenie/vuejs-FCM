<template>
  <div v-if="notify">
    <div id="notification-box" class="notification-box">
      <a href="#" id="notification-close" @click="closed" title="close">x</a>

      <div class="notification-data">
        <div class="notification-title">
          <p id="title">
            {{ from }}
            <br />
            <span id="title" style="font-size: 12px; font-weight: 600;">{{
              title
            }}</span>
          </p>
        </div>

        <div class="notification-notice">
          <p id="subject">{{ subject }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/messaging";
export default {
  name: "NotificationBox",

  components: {},

  data() {
    return {
      title: "",
      from: "",
      subject: "",
      userimg: "",
      messaging: firebase.messaging(),
      currentMessage: "",
      notify: false
    };
  },

  methods: {
    receiveMessage() {
      this.messaging.onMessage(payload => {
        console.log(payload); //
        // eslint-disable-next-line no-unused-vars
        // var notify;
        // notify = new Notification(payload.notification.title, {
        //   body: payload.notification.body,
        //   icon: payload.notification.icon,
        //   tag: "Dummy"
        // });
        console.log(payload.notification);

        this.setNotificationBoxForm(
          payload.notification.title,
          payload.from,
          payload.notification.body
        );
      });
    },

    setNotificationBoxForm(title, from, subject) {
      this.title = title;
      this.from = from;
      this.subject = subject;
      this.notify = true;
    },
    closed() {
      this.notify = false;
    }
  },

  created() {
    this.receiveMessage();
  },

  validations: function() {
    return {};
  },

  computed: {}
};
</script>

<style>
.notification-box {
  display: flex;
  position: absolute;
  right: 5px;
  bottom: 10px;
  width: 30%;
  height: 100px;
  background-color: #fff;
  z-index: 999;
}
#notification-close {
  position: absolute;
  color: #777;
  font: 14px;
  right: 5px;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  top: 2px;
  z-index: 10;
  cursor: pointer;
}

.notification-data {
  margin: 0 20px;
}
.notification-data p {
  margin: 10px 0;
}
.notification-notice p {
  font-size: 14px;
  font-weight: 400;
}
.notification-title p {
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
}
.notification-time small {
  font-size: 12px;
}

.notification-wall-number small {
  font-size: 8px;
}
img {
  width: 30px;
}
</style>
