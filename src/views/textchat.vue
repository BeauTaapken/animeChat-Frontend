<template>
  <div id="flexbox">
    <h1>textchat</h1>
    <div id="textChat" ref="textChat"></div>
    <v-bottom-navigation>
      <v-text-field
        id="messageInput"
        placeholder="Type a message"
        append-icon="fas fa-paper-plane"
        @click:append="sendMessage"
        v-model="content"
      ></v-text-field>
    </v-bottom-navigation>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
let socket = null;
let stompClient = null;

export default {
  name: "textchat",
  data: function() {
    return {
      username: null,
      content: "",
      textchat: null
    };
  },
  mounted() {
    try {
      this.username = JSON.parse(
        atob(sessionStorage.getItem("userInfo"))
      ).profile.name;
    } catch (e) {
      this.username = null;
    }

    if(stompClient == null){
      this.textchat = this.$refs.textChat;
      this.connect();
    }
  },
  methods: {
    disconnect(){
      stompClient.disconnect();
      stompClient = null;
    },

    connect() {
      if (this.username) {
        socket = new SockJS("https://localhost:8081/chat");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, this.onConnected, this.onError);
      }
    },

    onConnected() {
      //Subscribe to the public topic
      stompClient.subscribe("/topic/textchat", this.onMessageReceived);

      //Tell your username to the server
      stompClient.send(
        "/api/textchat.addUser",
        {},
        JSON.stringify({ sender: this.username, type: "JOIN" })
      );
    },

    onError() {
      alert("something went wrong while connecting to the websocket");
    },

    sendMessage() {
      if (this.content.length > 0 && stompClient) {
        const chatMessage = {
          sender: this.username,
          content: this.content,
          type: "CHAT"
        };
        console.log(chatMessage)
        stompClient.send("/api/textchat", {}, JSON.stringify(chatMessage));
      }
    },

    onMessageReceived(payload) {
      const message = JSON.parse(payload.body);

      const messageElement = document.createElement("div");

      if (message.type === "JOIN") {
        messageElement.classList.add("event-message");
        message.content = message.sender + " joined!";
      } else if (message.type === "LEAVE") {
        messageElement.classList.add("event-message");
        message.content = message.sender + " left!";
      } else {
        messageElement.classList.add("chat-message");

        const usernameElement = document.createElement("span");
        const usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
      }

      const textElement = document.createElement("p");
      const messageText = document.createTextNode(message.content);
      textElement.appendChild(messageText);

      messageElement.appendChild(textElement);

      this.textchat.appendChild(messageElement);

      this.updateScroll();
    },

    updateScroll(){
      let element = document.getElementById("textChat");
      element.scrollTop = element.scrollHeight;
    }
  },
  beforeDestroy() {
    this.disconnect();
  }
};
</script>

<style scoped>
  #textChat{
    overflow-y: scroll;
    height: 795px;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
