<template>
  <div id="confetti-container">
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      confettiShower: [],
      numConfettis: 400,
      container: document.getElementById('confetti-container'),
      colors: [
        "#00FF73",
        "#6C4AE2",
        "#FDDA00",
        "#DB27DB",
        "#FA405A",
        "#51EFFC",
        "#EB640A"
      ]
    }
  },

  created() {
    this.animateConfetti();
  },

  methods: {
    create () {
      var newConfetti = '<div class="confetti" style="bottom:' + Math.floor(Math.random() * 100) +'%; left:' + Math.floor(Math.random() * 100) +'%;width:' +
      Math.floor(Math.random() * 15 + 5) +'px; height:' + Math.floor(Math.random() * 15 + 5)*1.2 +'px;"><div class="rotate"><div class="askew" style="background-color:' + this.colors[Math.floor(Math.random() * this.colors.length)] + '"></div></div></div>';
      this.container.innerHTML+= newConfetti;
    },

    animateConfetti() {
      for (var a = 1; a <= this.numConfettis; a++) {
        // var confetti = new Confetti();
        this.create();
      }
      var confettis = document.querySelectorAll('.confetti');
      for (var i = 0; i < this.confettis.length; i++) {
        var opacity = Math.random() + 0.1;
        var animated = confettis[i].animate([
          { transform: 'translate3d(0,0,0)', opacity: opacity },
          { transform: 'translate3d(20vw,100vh,0)', opacity: 1 }
        ], {
          duration: Math.random() * 3000 + 3000,
          iterations: Infinity,
          delay: -(Math.random() * 5000)
        });
       this.confettiShower.push(animated);
      }
    }
  }


}

// var confettiShower = [];
// var numConfettis = 400;
// var container = document.getElementById('confetti-container');
// var colors = [
//   "#00FF73  ",
//   "#6C4AE2",
//   "#FDDA00 ",
//   "#DB27DB ",
//   "#FA405A ",
//   "#51EFFC ",
//   "#EB640A "
// ];
//
// class Confetti {
//   create() {
// 			var newConfetti = '<div class="confetti" style="bottom:' + Math.floor(Math.random() * 100) +'%; left:' + Math.floor(Math.random() * 100) +'%;width:' +
// 				Math.floor(Math.random() * 15 + 5) +'px; height:' + Math.floor(Math.random() * 15 + 5)*1.2 +'px;"><div class="rotate"><div class="askew" style="background-color:' + colors[Math.floor(Math.random() * colors.length)] + '"></div></div></div>';
//       container.innerHTML+= newConfetti;
//       }
//   }
//
// function animateConfetti() {
//   for (var a = 1; a <= numConfettis; a++) {
//     var confetti = new Confetti();
//     confetti.create();
//   }
//   var confettis = document.querySelectorAll('.confetti');
//   for (var i = 0; i < confettis.length; i++) {
//     var opacity = Math.random() + 0.1;
//     var animated = confettis[i].animate([
//       { transform: 'translate3d(0,0,0)', opacity: opacity },
//       { transform: 'translate3d(20vw,100vh,0)', opacity: 1 }
//     ], {
//       duration: Math.random() * 3000 + 3000,
//       iterations: Infinity,
//       delay: -(Math.random() * 5000)
//     });
//    confettiShower.push(animated);
//   }
// }
// animateConfetti();

</script>

<style lang="scss" scoped>
$n: 400;
* {
  box-sizing: border-box;
}
body {
  background: #E5F4FF;
  overflow: hidden;
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
}
#confetti-container {
  width: 100vw;
  height: 100vh;
  position:relative;
}
.confetti {
  position: absolute;
  z-index: 999;
}
.confetti .rotate {
  animation: driftRotate 1s infinite both ease-in-out;
  width: 100%;
  height: 100%;
}
.confetti .askew {
  width: 100%;
  height: 100%;
  animation: drift 1s infinite alternate both ease-in-out;
}
@for $i from 0 to $n {
  .confetti:nth-child(#{$i}) .askew {
    $time: 1s + random(100)*.01s;
    animation-duration: $time;
    animation-delay: -$time*random(100)*.01;
	}
  .confetti:nth-child(#{$i}) .rotate {
    $time: 1s + random(100)*.01s;
    animation-duration: $time;
    animation-delay: -$time*random(100)*.01;
	}
}

@keyframes drift {
  0% {
    transform: skewY(10deg) translate3d(-250%, 0, 0);
  }
  100% {
    transform: skewY(-10deg) translate3d(250%, 0, 0);
  }
}
@keyframes driftRotate {
  0% {
    transform: rotateX(0) ;
  }
  100% {
    transform: rotateX(360deg);
  }
}

</style>
