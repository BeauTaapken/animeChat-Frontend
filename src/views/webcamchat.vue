<template>
  <div id="wrapper">
    <div id="friends" ref="friendsLocation"></div>
    <div>
      <h1>Your video</h1>
      <video ref="localVideo"></video>
      <canvas ref="canvas"></canvas>
    </div>
    <div>
      <h1>Other video</h1>
      <img ref="externalVideo" />
      <audio ref="externalAudio"></audio>
    </div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
const socket = new SockJS("https://localhost:8081/chat");
let stompClient = null;

export default {
  name: "webcamchat",
  props: {
    msg: String
  },
  data: function() {
    return {
      username: null,
      email: null,
      request: null,
      video: null,
      canvas: null,
      img: null,
      context: null
    };
  },
  mounted() {

    this.video = this.$refs.localVideo;
    this.canvas = this.$refs.canvas;
    this.img = this.$refs.externalVideo;
    this.context = this.canvas.getContext("2d");

    try {
      this.username = JSON.parse(
        atob(sessionStorage.getItem("userInfo"))
      ).profile.name;
      this.email = JSON.parse(
        atob(sessionStorage.getItem("userInfo"))
      ).profile.email;
    } catch (e) {
      this.username = null;
      this.email = null;
    }

    this.request = new XMLHttpRequest();

    const self = this;

    this.loadFriends();

    const constraintsVideo = {
      video: true,
      audio: false
    };

    navigator.mediaDevices
      .getUserMedia(constraintsVideo)
      .then(function(stream) {
        self.video.srcObject = stream;
        self.video.play();
      })
      .catch(function(err) {
        console.log(err);
      });

  },
  // watch: {
  //   $route() {
  //     this.request = new XMLHttpRequest();
  //     try {
  //       this.username = JSON.parse(atob(sessionStorage.getItem("userInfo"))).profile.name;
  //       this.email = JSON.parse(atob(sessionStorage.getItem("userInfo"))).profile.email;
  //     } catch (e) {
  //       this.username = null;
  //       this.email = null;
  //     }
  //     this.loadFriends();
  //   }
  // },
  methods: {
    main() {
      if (socket.readyState === 1) {
        this.drawCanvas();
        this.readCanvas();
      }
    },

    onOpen(otherUser) {
      const self = this;
      // const username = this.username;
      stompClient = Stomp.over(socket);
      stompClient.debug = null;
      stompClient.connect({}, function() {
        stompClient.subscribe(
          "/topic/camera/" + otherUser,
          function(payload) {
            self.img.setAttribute(
              "src",
              "data:image/webp;base64, " + JSON.parse(payload.body).content
            );
          }
          // getCanvasFromServer()
        );
      });
      setInterval(this.main, 16);
    },

    drawCanvas() {
      this.context.drawImage(
        this.video,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    },

    readCanvas() {
      const canvasdata = this.canvas.toDataURL("image/webp").split(",")[1];

      const chatMessage = {
        content: canvasdata,
        sender: this.username
      };

      stompClient.send("/api/frame", {}, JSON.stringify(chatMessage));
    },

    loadFriends() {
      const self = this;
      const friendsDiv = this.$refs.friendsLocation;
      this.request.open(
        "GET",
        "https://localhost:8082/friend/findfriends/" + self.email
      );
      this.request.onreadystatechange = function() {
        console.log("ready");
        if (this.readyState === 4) {
          if (this.status === 200) {
            const friendArray = JSON.parse(this.response);
            for (let i = 0; i < Object.keys(friendArray).length; i++) {
              const friend = friendArray[i];
              const buttonToAdd = document.createElement("input");
              buttonToAdd.type = "button";
              buttonToAdd.value = "Start chat with " + friend.name;
              buttonToAdd.addEventListener("click", function(){
                self.onOpen(friend.name);
              });
              friendsDiv.appendChild(buttonToAdd);
            }
          }
        }
      };
      this.request.send();
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
video,
img {
  width: 720px;
  height: 540px;
  background-color: black;
  image-resolution: from-image;
}
canvas {
  display: none;
}
#wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
}

#friends {
  width: 10px;
}
</style>
