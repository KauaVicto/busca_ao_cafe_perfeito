<template>
  <button @click="switchTheme" id="btn_dark" class="btn btn-dark">
    <span class="material-symbols-outlined">dark_mode</span>
  </button>
  <div :class="{'dark-mode': darkMode == 'dark'}">
    <router-view />
  </div>
</template>

<script setup>
import { ref } from "vue";

if (localStorage.getItem('theme') === null) {
  localStorage.setItem('theme', 'dark')
}

const darkMode = ref(localStorage.getItem('theme'));

function switchTheme() {
  if (darkMode.value == 'dark') {
    darkMode.value = 'light'
  } else {
    darkMode.value = 'dark'
  }
  localStorage.setItem('theme', darkMode.value)
}


</script>

<style>
:root {
  --background-dark: #222222;
  --color-white: #dadada;
  --backgroud-input-dark: #2f2f2f
}

body {
  background-image: url('@/assets/background_cafe.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#btn_dark {
  position: absolute;
  right: 10px;
  top: 10px;
}

* {
  transition: all .2s ease-out;
}
</style>