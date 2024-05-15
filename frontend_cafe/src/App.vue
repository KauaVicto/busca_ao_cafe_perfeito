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


::-webkit-scrollbar {
  width: 9px; /* Largura da barra de rolagem */
  background-color: #6a5e566c; /* Cor do botão de rolagem */
}

::-webkit-scrollbar-thumb {
  background-color: #6a2a00; /* Cor do botão de rolagem */
  border-radius: 5px; /* Borda arredondada */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #592400; /* Cor do botão de rolagem ao passar o mouse */
}

body {
  background-image: url('@/assets/background_cafe.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
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