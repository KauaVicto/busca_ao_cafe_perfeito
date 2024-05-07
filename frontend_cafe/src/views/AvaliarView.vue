<template>
  <div id="app" class="container">
    <h1 class="display-6 text-center">Avalie o Café</h1>
    <form @submit.prevent="submitForm">

      <label for="intensidade" class="form-label">Intensidade <span class="badge bg-primary">{{ parseFloat(form.intensidade) == 3 ? 'Ideal' : parseFloat(form.intensidade).toFixed(1) }}</span></label>
      <input type="range" v-model="form.intensidade" @change="alterLabelIntensidade" class="form-range" min="1" max="5" step="0.1" id="intensidade">

      <label for="doce" class="form-label">Doçura <span class="badge bg-primary">{{ parseFloat(form.doce) == 3 ? 'Ideal' : parseFloat(form.doce).toFixed(1) }}</span></label>
      <input type="range" v-model="form.doce" @change="alterLabelDoce" class="form-range" min="1" max="5" step="0.1" id="doce">
      
      <label for="sabor" class="form-label">Sabor <span class="badge bg-primary">{{ parseFloat(form.sabor).toFixed(1) }}</span></label>
      <input type="range" v-model="form.sabor" class="form-range" min="0" max="10" step="0.1" id="sabor">

      <label for="nota_geral" class="form-label">Nota Geral <span class="badge bg-primary">{{ parseFloat(form.nota_geral).toFixed(1) }}</span></label>
      <input type="range" v-model="form.nota_geral" class="form-range" min="0" max="10" step="0.1" id="nota_geral">

      <div class="mb-3 form-group">
        <label for="comentario" class="form-label">Comentário</label>
        <textarea v-model="form.comentario" class="form-control" id="comentario"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Enviar</button>
      <router-link :to="{name: 'cafe'}" class="btn btn-secondary mx-3">Voltar</router-link>
      <span id="obs" class="m-3">* Por favor, avalie apenas uma vez</span>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from '@/config/axios';


export default defineComponent({
  name: 'AvaliarView',
  data() {
    return {
      form: {
        sabor: '0',
        intensidade: '3',
        doce: '3',
        nota_geral: '0',
        comentario: '',
      },
      labelIntensidade: 'Ideal',
      labelDoce: 'Ideal'
    }
  },
  methods: {
    submitForm() {
      const id: string = this.$route.params.id as string

      api.post('/cafe/avaliacao/create', {
        sabor: parseFloat(this.form.sabor),
        intensidade: parseFloat(this.form.intensidade),
        doce: parseFloat(this.form.doce),
        nota_geral: parseFloat(this.form.nota_geral),
        comentario: this.form.comentario,
        cafe_id: parseInt(id)
      })
        .then(response => {
          console.log(response)
          this.$router.push("/")
        })
    },
    alterLabelIntensidade(event: any) {
      let intensidade = parseInt(event.target.value)
      switch(intensidade) {
        case 1:
          this.labelIntensidade = 'Muito fraco'
          break;
        case 2:
          this.labelIntensidade = 'Fraco'
          break;
        case 3:
          this.labelIntensidade = 'Ideal'
          break;
        case 4:
          this.labelIntensidade = 'Forte'
          break;
        case 5:
          this.labelIntensidade = 'Muito Forte'
          break;
      }
    },
    alterLabelDoce(event: any) {
      let doce = parseInt(event.target.value)
      switch(doce) {
        case 1:
          this.labelDoce = 'Muito pouco doce'
          break;
        case 2:
          this.labelDoce = 'Pouco doce'
          break;
        case 3:
          this.labelDoce = 'Ideal'
          break;
        case 4:
          this.labelDoce = 'Doce'
          break;
        case 5:
          this.labelDoce = 'Muito doce'
          break;
      }
    },
  },
});
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}

#app {
  max-width: 600px;
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