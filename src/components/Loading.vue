<template lang="">
  <div class="container-loading" v-if="loading">
    <div class="loader">
      <div class="loader-inner">
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="text" id="loading-text">
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>
<style scoped>
.text {
  position: absolute;
  top: 30%;
  width: 100%;
  display: flex;
  justify-items: center;
}
.loader {
  background: rgba(230, 230, 230, 0.76);
  background: radial-gradient(
    rgba(218, 218, 218, 0.938),
    rgba(138, 137, 137, 0.637)
  );
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9;
}

.loader-inner {
  bottom: 0;
  height: 50%;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 150px;
}

.loader-line-wrap {
  animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  box-sizing: border-box;
  height: 70px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform-origin: 50% 100%;
  width: 130px;
}
.loader-line {
  border: 4px solid transparent;
  border-radius: 100%;
  box-sizing: border-box;
  height: 100px;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}
.loader-line-wrap:nth-child(1) {
  animation-delay: -30ms;
}
.loader-line-wrap:nth-child(2) {
  animation-delay: -60ms;
}
.loader-line-wrap:nth-child(3) {
  animation-delay: -90ms;
}
.loader-line-wrap:nth-child(4) {
  animation-delay: -120ms;
}
.loader-line-wrap:nth-child(5) {
  animation-delay: -150ms;
}
.loader-line-wrap:nth-child(6) {
  animation-delay: -180ms;
}
.loader-line-wrap:nth-child(7) {
  animation-delay: -210ms;
}
.loader-line-wrap:nth-child(8) {
  animation-delay: -240ms;
}

.loader-line-wrap:nth-child(1) .loader-line {
  border-color: hsl(0, 80%, 60%);
  height: 132px;
  width: 132px;
  top: 7px;
}
.loader-line-wrap:nth-child(2) .loader-line {
  border-color: hsl(30, 80%, 60%);
  height: 118px;
  width: 118px;
  top: 14px;
}
.loader-line-wrap:nth-child(3) .loader-line {
  border-color: hsl(60, 80%, 60%);
  height: 104px;
  width: 104px;
  top: 21px;
}
.loader-line-wrap:nth-child(4) .loader-line {
  border-color: hsl(90, 80%, 60%);
  height: 90px;
  width: 90px;
  top: 28px;
}
.loader-line-wrap:nth-child(5) .loader-line {
  border-color: hsl(120, 80%, 60%);
  height: 76px;
  width: 76px;
  top: 35px;
}
.loader-line-wrap:nth-child(6) .loader-line {
  border-color: hsl(180, 80%, 60%);
  height: 62px;
  width: 62px;
  top: 42px;
}
.loader-line-wrap:nth-child(7) .loader-line {
  border-color: hsl(240, 80%, 60%);
  height: 48px;
  width: 48px;
  top: 49px;
}
.loader-line-wrap:nth-child(8) .loader-line {
  border-color: hsl(337, 70%, 58%);
  height: 34px;
  width: 34px;
  top: 56px;
}

@keyframes spin {
  0%,
  15% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-text-opacity {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-moz-keyframes loading-text-opacity {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes loading-text-opacity {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-o-keyframes loading-text-opacity {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
#loading-text {
  -moz-animation: loading-text-opacity 2s linear 0s infinite normal;
  -o-animation: loading-text-opacity 2s linear 0s infinite normal;
  -webkit-animation: loading-text-opacity 2s linear 0s infinite normal;
  animation: loading-text-opacity 2s linear 0s infinite normal;
  color: #041991;
  font-size: 15px;
  font-weight: 700;
  opacity: 0;
  text-align: center;
  text-transform: uppercase;
}
</style>
