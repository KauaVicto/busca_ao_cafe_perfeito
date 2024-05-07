<template>
  <div class="container my-3">
    <div class="card">
      <div class="card-title">
        <h1 class="display-4 text-center">Busca ao café perfeito</h1>
      </div>
      <div class="card-body">





        <DataTable id="dataTable" :data="cafes" :columns="columns" :options="options"
          class="table table-striped display">
          <thead>
            <tr>
              <th width="10%">Data</th>
              <th width="10%">Turno</th>
              <th width="15%">Marca</th>
              <th width="15%">Criador</th>
              <th width="10%">Café(g)</th>
              <th width="10%">Açúcar(g)</th>
              <th width="10%">Nota Geral</th>
              <th width="10%">Avaliações</th>
              <th width="10%">Ação</th>
            </tr>
          </thead>
        </DataTable>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cadastrarCafeModal">
          Cadastrar café
        </button>

        <GraficoNotaGeral />

        <GraficoIntensidade />


      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="cadastrarCafeModal" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cadastrar Café</h5>
            <button type="button" class="btn-close" id="close_modal" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <form @submit.prevent="formCadastrarCafe">
            <div class="modal-body">

              <div class="row">

                <div class="mb-3 col-md-6 form-group">
                  <label for="dia" class="form-label">Dia</label>
                  <input type="date" class="form-control" v-model="form.dia" id="dia" required>
                </div>

                <div class="mb-3 col-md-6 form-group">
                  <label for="dia" class="form-label">Turno</label>
                  <select class="form-control" v-model="form.turno" id="turno" required>
                    <option value="1">Manhã</option>
                    <option value="2">Tarde</option>
                    <option value="3">Noite</option>
                  </select>
                </div>
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

    <div class="modal fade" id="modal_comentarios" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Comentários</h5>
          </div>
          <div class="modal-body">
            <ul id="listagem_comentario">
              <li v-for="(comentario, index) in comentarios" :key="index">{{ comentario }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GraficoIntensidade from '@/components/GraficoIntensidade.vue'; // @ is an alias to /src
import GraficoNotaGeral from '@/components/GraficoNotaGeral.vue';
import { api } from '@/config/axios'
import { converterData } from '@/config/date'
import DataTable from 'datatables.net-vue3';
import DataTableLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';
import moment from 'moment'
import { options } from '@/config/datatable';
import $ from 'jquery';

DataTable.use(DataTableLib)

export interface Cafe {
  id: number;
  dia: string;
  turno: number;
  nome: string;
  quantidade_cafe: number;
  quantidade_acucar: number;
  criador: string;
  nota_geral: string;
  total_avaliacao: number;
}

interface returnData {
  cafes: Cafe[],
  columns: any,
  options: object,
  form: any,
  comentarios: Array<string>
}

export default defineComponent({
  name: 'CafeView',
  components: {
    GraficoIntensidade,
    GraficoNotaGeral,
    DataTable
  },
  data(): returnData {
    return {
      cafes: [],
      columns: [
        {
          data: 'dia', render: function (data: any, type: any, row: any, meta: any) {
            if (type === 'sort') {
              return moment(data).format('YYYY-MM-DD')
            } else {
              return moment(data).format('DD/MM/YYYY')
            }
          }
        },
        {
          data: 'turno', render: function (data: any, type: any, row: any, meta: any) {
            if (type === 'sort') {
              return data;
            }


            switch (data) {
              case 1:
                return '<span class="badge bg-primary">Manhã</span>'
                break;
              case 2:
                return '<span class="badge bg-primary">Tarde</span>'
                break;
              case 3:
                return '<span class="badge bg-primary">Noite</span>'
                break;
              default:
                return '&nbsp;'
                break;
            }
          }
        },
        { data: 'nome' },
        { data: 'criador' },
        { data: 'quantidade_cafe' },
        { data: 'quantidade_acucar' },
        { data: 'nota_geral' },
        { data: 'total_avaliacao' },
        {
          data: null, render: function (data: any, type: any, row: any, meta: any) {
            return `
              <a href="/avaliar/${data.id}" class="btn"><span class="material-symbols-outlined">done_outline</span></a>
              <button data-id="${data.id}" class="btn abrir_comentario" data-bs-toggle="modal" data-bs-target="#modal_comentarios" ><span class="material-symbols-outlined" data-id="${data.id}">comment</span></button>
              <!-- <button data-id="${data.id}" class="btn btn-secondary btn-sm abrir_comentario" data-bs-toggle="modal" data-bs-target="#modal_comentarios" >Comentário</button> -->
            `
          },
          orderable: false
        }

      ],
      options: options,
      form: {
        dia: converterData(new Date().toUTCString()),
        nome: '',
        turno: 1,
        quantidade_cafe: 0,
        quantidade_acucar: 0,
        criador: ''
      },
      comentarios: []
    }
  },
  async mounted() {
    await this.listCafes();

    $('body').on('click', '.abrir_comentario', this.abrir_comentarios)

  },
  methods: {
    formCadastrarCafe() {
      const data = {
        dia: this.form.dia,
        nome: this.form.nome,
        turno: parseInt(this.form.turno),
        quantidade_cafe: this.form.quantidade_cafe,
        quantidade_acucar: this.form.quantidade_acucar,
        criador: this.form.criador
      }
      api.post('/cafe/create', data)
        .then(response => {
          this.listCafes()
          document.getElementById('close_modal')?.click()

        })
    },
    async listCafes() {
      const response = await api.get('/cafe/findall')

      this.cafes = response.data.cafes.map((cafe: Cafe) => {
        let { criador, dia, turno, id, nome, quantidade_acucar, quantidade_cafe, nota_geral, total_avaliacao } = cafe

        let nota: number = parseFloat(nota_geral)
        if (!nota_geral)
          nota = 0

        return {
          id: id,
          dia: converterData(dia),
          turno: turno,
          nome: nome,
          quantidade_cafe: quantidade_cafe,
          quantidade_acucar: quantidade_acucar,
          criador: criador,
          nota_geral: nota.toFixed(1),
          total_avaliacao: total_avaliacao
        }
      })

    },
    async abrir_comentarios(e: any) {
      let cafeId = $(e.target).attr('data-id')

      const response = await api.get(`/avaliacao/findByCafe/${cafeId}`)

      this.comentarios = response.data.avaliacoes.map((value: any) => {
        return value.comentario
      })
      this.comentarios = this.comentarios.filter((value: any) => {
        if (value && value.trim() !== '') {
          return true
        }

        return false
      })

    }
  }
});
</script>

<style>
@import 'datatables.net-bs5';

form {
  text-align: left;
}

/* Estilo para listas não ordenadas */
#listagem_comentario {
  padding: 10px;
  margin: 20px;
  border: 1px solid #ddd;
  /* Borda ao redor da lista */
  background-color: #f9f9f9;
  /* Cor de fundo */
}

/* Estilo para itens da lista */
#listagem_comentario li {
  list-style: none;
  color: #333;
  /* Cor do texto */
  font-size: 16px;
  /* Tamanho do texto */
  padding: 5px 0;
  /* Espaçamento vertical */
  border-bottom: 1px solid #ddd;
  /* Linha divisória entre itens */
}

.dark-mode .card {
  background-color: var(--background-dark);
  color: var(--color-white) !important;
}

.dark-mode .modal .modal-content {
  background-color: var(--background-dark);
  color: var(--color-white);
}

.dark-mode .modal .modal-content input,
.dark-mode .modal .modal-content select {
  background-color: var(--backgroud-input-dark);
  color: var(--color-white);
}

.dark-mode table.dataTable {
  background-color: #2b2b2b;
  color: var(--color-white);
}

.dark-mode table.dataTable th {
  background-color: #333333;
  color: var(--color-white);
}

.dark-mode table.dataTable td {
  background-color: #3b3b3b;
  color: var(--color-white);
}

.dark-mode table.dataTable a,
.dark-mode table.dataTable button {
  color: var(--color-white);
}

.dark-mode .pagination .page-item,
.dark-mode .pagination .page-item .page-link {
  background-color: #4b4b4b !important;
  border-color: #222222 !important;
  color: var(--color-white);
}

.dark-mode .pagination .page-item.active,
.dark-mode .pagination .page-item.active .page-link {
  background-color: #252525 !important;
  border-color: #4d4d4d !important;
}

.dark-mode .pagination .page-item.disabled,
.dark-mode .pagination .page-item.disabled .page-link {
  color: #8b8b8b;
}
</style>