<template>
  <div class="container">
    <h1 class="display-4 text-center">Busca ao café perfeito</h1>
    <div class="row justify-content-center">
      <div class="col-lg-12 offset-lg-2">
        <div class="table-responsive">
          <DataTable :data="cafes" :columns="columns" :options="{ responsive: true, autoWidth: true, order: [[0, 'desc']] }"
            class="table table-striped table-bordered display">
            <thead>
              <tr>
                <th>Dia</th>
                <th>Marca</th>
                <th>Criador</th>
                <th>Café(g)</th>
                <th>Açúcar(g)</th>
                <th>Nota Geral</th>
                <th>Ação</th>
              </tr>
            </thead>
          </DataTable>
        </div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cadastrarCafeModal">
          Cadastrar café
        </button>
      </div>

      <div class="col-md-12">
        <!-- <table class="table table-striped">
          <thead>
            <tr>
              <th>Dia</th>
              <th>Marca</th>
              <th>Criador</th>
              <th>Café(g)</th>
              <th>Açúcar(g)</th>
              <th>Nota Geral</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in  cafes " :key="index">
              <td>{{ item.dia }}</td>
              <td>{{ item.nome }}</td>
              <td>{{ item.criador }}</td>
              <td>{{ item.quantidade_cafe }}</td>
              <td>{{ item.quantidade_acucar }}</td>
              <td>{{ item.nota_geral }}</td>
              <td><router-link :to="{ name: 'avaliar', params: { id: item.id } }"
                  class="btn btn-primary btn-sm">Avaliar</router-link></td>
            </tr>
          </tbody>
        </table> -->

        

      </div>
    </div>

    <canvas id="grafico_nota_geral" height="100"></canvas>
    <GraficoIntensidade :cafes="cafes" />


    <!-- Modal -->
    <div class="modal fade" id="cadastrarCafeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cadastrar Café</h5>
            <button type="button" class="btn-close" id="close_modal" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="formCadastrarCafe">
            <div class="modal-body">

              <div class="mb-3">
                <label for="dia" class="form-label">Dia</label>
                <input type="date" class="form-control" v-model="form.dia" id="dia" required>
              </div>

              <div class="mb-3">
                <label for="marca" class="form-label">Marca</label>
                <input type="text" class="form-control" v-model="form.nome" id="marca" required>
              </div>

              <div class="mb-3">
                <label for="quantidade_cafe" class="form-label">Quantidade de café(g)</label>
                <input type="number" step="0.1" class="form-control" v-model="form.quantidade_cafe" id="quantidade_cafe"
                  required>
              </div>

              <div class="mb-3">
                <label for="quantidade_acucar" class="form-label">Quantidade de açúcar(g)</label>
                <input type="number" step="0.1" class="form-control" v-model="form.quantidade_acucar"
                  id="quantidade_acucar" required>
              </div>

              <div class="mb-3">
                <label for="criador" class="form-label">Criador</label>
                <input type="text" class="form-control" v-model="form.criador" id="criador" required>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="submit" class="btn btn-primary">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GraficoIntensidade from '@/components/GraficoIntensidade.vue'; // @ is an alias to /src
import { api } from '@/config/axios'
import { converterData } from '@/config/date'
import Chart from 'chart.js/auto';
import { ChartItem } from 'chart.js';
import DataTable from 'datatables.net-vue3';
import DataTableLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';

DataTable.use(DataTableLib)

export interface Cafe {
  id: number;
  dia: string;
  nome: string;
  quantidade_cafe: number;
  quantidade_acucar: number;
  criador: string;
  nota_geral: string;
}

interface returnData {
  cafes: Cafe[],
  columns: any,
  form: any
}

export default defineComponent({
  name: 'CafeView',
  components: {
    GraficoIntensidade,
    DataTable
  },
  data(): returnData {
    return {
      cafes: [],
      columns: [
        { data: 'dia' },
        { data: 'nome' },
        { data: 'criador' },
        { data: 'quantidade_cafe' },
        { data: 'quantidade_acucar' },
        { data: 'nota_geral' },
        {
          data: null, render: function (data: any, type: any, row: any, meta: any) {
            return `<a href="/avaliar/${data.id}" class="btn btn-primary btn-sm">Avaliar</a>`
          },
          orderable: false
        }

      ],
      form: {
        dia: converterData(new Date().toUTCString()),
        nome: '',
        quantidade_cafe: 0,
        quantidade_acucar: 0,
        criador: ''
      }
    }
  },
  async mounted() {
    await this.listCafes()

    const ctx: ChartItem = document.getElementById('grafico_nota_geral') as ChartItem;

    let cafesChart = this.cafes.slice(0, 15).sort((a, b) => a.id - b.id)

    const grafico_nota_geral = new Chart(ctx, {
      type: 'line',
      data: {
        labels: cafesChart.map(cafe => cafe.criador),
        datasets: [{
          label: 'Nota Geral',
          data: cafesChart.map(cafe => cafe.nota_geral),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 10
          }
        }
      }
    });

  },
  methods: {
    formCadastrarCafe() {
      api.post('/cafe/create', this.form)
        .then(response => {
          this.listCafes()
          document.getElementById('close_modal')?.click()

        })
    },
    async listCafes() {
      const response = await api.get('/cafe/findall')

      this.cafes = response.data.cafes.map((cafe: Cafe) => {
        let { criador, dia, id, nome, quantidade_acucar, quantidade_cafe, nota_geral } = cafe

        let nota: number = parseFloat(nota_geral)
        if (!nota_geral)
          nota = 0

        return {
          id: id,
          dia: converterData(dia),
          nome: nome,
          quantidade_cafe: quantidade_cafe,
          quantidade_acucar: quantidade_acucar,
          criador: criador,
          nota_geral: nota.toFixed(1)
        }
      })

    }
  }
});
</script>

<style>
form {
  text-align: left;
}</style>