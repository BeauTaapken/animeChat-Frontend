<template>
  <div id="wrapper">
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
const socket = new SockJS("http://localhost:8081/camera");
let stompClient = null;

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  // data: function() {
  //   return {
  //     video: this.$refs.localVideo,
  //     canvas: this.$refs.canvas,
  //     img: this.$refs.externalVideo,
  //     context: this.canvas.getContext("2d"),
  //     audio: this.$refs.externalAudio
  //   };
  // },
  mounted: function() {
    const video = this.$refs.localVideo;
    const canvas = this.$refs.canvas;
    const img = this.$refs.externalVideo;
    const context = canvas.getContext("2d");
    const audio = this.$refs.externalAudio;

    const constraintsVideo = {
      video: true,
      audio: false
    };

    const contraintsAudio = {
      video: false,
      audio: true
    };

    navigator.mediaDevices
      .getUserMedia(constraintsVideo)
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function(err) {
        console.log(err);
      });

    navigator.mediaDevices
      .getUserMedia(contraintsAudio)
      .then(function(stream) {
        audio.srcObject = stream;
        audio.play();
      })
      .catch(function(err) {
        console.log(err);
      });

    setInterval(main, 16);
    function main() {
      if (socket.readyState === 1) {
        drawCanvas();
        readCanvas();
      } else {
        onOpen();
      }
    }

    function onOpen() {
      stompClient = Stomp.over(socket);
      stompClient.debug = null;
      stompClient.connect({}, function() {
        stompClient.subscribe(
          "/topic/camera/" + "othertest",
          getCanvasFromServer
        );
      });
    }

    function drawCanvas() {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    function readCanvas() {
      //const canvasdata = reader.readAsDataURL(video);
      const canvasdata = canvas.toDataURL("image/webp").split(",")[1];

      const chatMessage = {
        content: canvasdata,
        sender: "othertest"
      };

      stompClient.send("/api/frame", {}, JSON.stringify(chatMessage));
    }

    function getCanvasFromServer(payload) {
      img.setAttribute(
        "src",
        "data:image/webp;base64, " + JSON.parse(payload.body).content
      );
    }
  },
  // methods: {
  //   main() {
  //     if (socket.readyState === 1) {
  //       this.drawCanvas();
  //       this.readCanvas();
  //     } else {
  //       this.onOpen();
  //     }
  //   },
  //
  //   setVideoAndAudio() {
  //       const constraintsVideo = {
  //           video: true,
  //           audio: false
  //       };
  //
  //       const contraintsAudio = {
  //           video: false,
  //           audio: true
  //       };
  //
  //     navigator.mediaDevices
  //       .getUserMedia(constraintsVideo)
  //       .then(function(stream) {
  //         this.video.srcObject = stream;
  //         this.video.play();
  //       })
  //       .catch(function(err) {
  //         console.log(err);
  //       });
  //
  //     navigator.mediaDevices
  //       .getUserMedia(contraintsAudio)
  //       .then(function(stream) {
  //         self.audio.srcObject = stream;
  //         self.audio.play();
  //       })
  //       .catch(function(err) {
  //         console.log(err);
  //       });
  //   },
  //
  //   onOpen() {
  //     stompClient = Stomp.over(socket);
  //     stompClient.debug = null;
  //     stompClient.connect({}, function() {
  //       stompClient.subscribe(
  //         "/topic/camera/" + "othertest",
  //         this.getCanvasFromServer
  //       );
  //     });
  //   },
  //
  //   drawCanvas() {
  //     console.log(this.context);
  //     this.context.drawImage(
  //       this.video,
  //       0,
  //       0,
  //       this.canvas.width,
  //       this.canvas.height
  //     );
  //   },
  //
  //   readCanvas() {
  //     const canvasdata = this.canvas.toDataURL("image/webp").split(",")[1];
  //
  //     const chatMessage = {
  //       content: canvasdata,
  //       sender: "othertest"
  //     };
  //
  //     stompClient.send("/api/frame", {}, JSON.stringify(chatMessage));
  //   },
  //
  //   getCanvasFromServer(payload) {
  //     this.img.setAttribute(
  //       "src",
  //       "data:image/webp;base64, " + JSON.parse(payload.body).content
  //     );
  //   }
  // }
  beforeDestroy() {
    this.videoS
    socket.close();
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
</style>
