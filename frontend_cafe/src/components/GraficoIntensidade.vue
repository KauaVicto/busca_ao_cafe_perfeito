<template>
  <canvas id="grafico_intensidade" height="100"></canvas>
</template>

<script lang="ts">
import { api } from '@/config/axios';
import { converterData } from '@/config/date';
import { ChartItem, Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { PropType, defineComponent } from 'vue';
import $ from 'jquery';

interface Cafe {
  id: number;
  dia: string;
  intensidade: number;
  docura: number;
  criador: string;
}

interface returnData {
  cafes: Cafe[],
}

export default defineComponent({
  data(): returnData {
    return {
      cafes: []
    }
  },
  async mounted() {
    const ctx: ChartItem = document.getElementById('grafico_intensidade') as ChartItem;

    await this.listCafes();

    let cafesChart = this.cafes.slice(0, 15).sort((a, b) => a.id - b.id)

    const grafico_intensidade = new Chart(ctx, {
      type: 'line',
      data: {
        labels: cafesChart.map(cafe => cafe.criador.split(' ')[0]),
        datasets: [
          {
            label: 'Intensidade',
            data: cafesChart.map(cafe => (cafe.intensidade))
          },
          {
            label: 'Doçura',
            data: cafesChart.map(cafe => (cafe.docura))
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            min: 1
          },
        }
      }
    });

    this.updateTheme(grafico_intensidade)
    $('#btn_dark').on('click', () => {
      this.updateTheme(grafico_intensidade)
    })
  },
  methods: {
    updateTheme(chart: any) {
      let theme = localStorage.getItem('theme')
      const fontColor = theme == 'dark' ? '#dadada' : '#454545';
      chart.options.scales.x.ticks.color = fontColor;
      chart.options.scales.y.ticks.color = fontColor;
      chart.options.scales.y.grid.color = fontColor;
      chart.options.scales.x.grid.color = fontColor;
      chart.options.plugins.legend.labels.color = fontColor;
      chart.update()
    },
    async listCafes() {
      const response = await api.get('/cafe/findIntensidadeDoce')

      this.cafes = response.data.cafes.map((cafe: Cafe) => {
        let { id, criador, dia, docura, intensidade } = cafe

        return {
          id: id,
          dia: dia,
          criador: criador,
          intensidade: intensidade,
          docura: docura,
        }
      })

    }
  }
});
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
</style>
