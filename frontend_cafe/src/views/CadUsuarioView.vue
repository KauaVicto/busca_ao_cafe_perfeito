<template>
  <div id="app" class="container">
    <h1 class="display-5">Cadastre-se</h1>
    <form>
      <div class="row">
        <div class="col-md-12 form-group">
          <label for="nome" class="form-label">Nome</label>
          <input type="text" id="nome" class="form-control">
        </div>
        <div class="col-md-6 form-group">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" class="form-control">
        </div>
        <div class="col-md-6 form-group">
          <label for="telefone" class="form-label">Telefone</label>
          <input type="text" id="telefone" class="form-control">
        </div>
        <div class="col-md-6 form-group">
          <label for="senha" class="form-label">Senha</label>
          <input type="password" id="senha" class="form-control">
        </div>
        <div class="col-md-6 form-group">
          <label for="confirm_senha" class="form-label">Confirmar Senha</label>
          <input type="password" id="confirm_senha" class="form-control">
        </div>
        <div class="col-md-12 form-group d-flex justify-content-end">
          <button class="btn btn-primary my-4">Cadastrar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue';
import { api } from '@/config/axios';

</script>

<style scoped>
body {
  background-color: #f8f9fa;
}

#app {
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  text-align: left;
}

#obs {
  font-size: .8rem;
}
</style>