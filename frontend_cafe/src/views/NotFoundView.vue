<template>
    <div class="container">
        <h1 class="display-3">Essa página não existe</h1>
        <img id="d" src="https://images-na.ssl-images-amazon.com/images/G/32/error/pt_BR/151._TTD_.jpg" alt="">
    </div>
</template>

<script setup>

import { onMounted } from 'vue'

onMounted(function() {
    document.getElementById("d").src="https://images-na.ssl-images-amazon.com/images/G/32/error/pt_BR/" + (Math.floor(Math.random() *200) + 1) + "._TTD_.jpg";
})

</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
}

h1 {
    color: white;
}
</style>