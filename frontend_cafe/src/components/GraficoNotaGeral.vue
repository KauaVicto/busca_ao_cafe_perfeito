<template>
  <canvas id="grafico_nota_geral2" height="100"></canvas>
</template>

<script lang="ts">
import { api } from '@/config/axios';
import { converterData } from '@/config/date';
import $ from 'jquery';

import { ChartItem, Chart, registerables} from 'chart.js';
Chart.register(...registerables);
import { PropType, defineComponent } from 'vue';

interface Cafe {
  id: number;
  dia: string;
  nota_geral: number;
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
    await this.listCafes();

    const ctx: ChartItem = document.getElementById('grafico_nota_geral2') as ChartItem;

    let cafesChart = this.cafes.slice(0, 15).sort((a, b) => a.id - b.id)

    const grafico_nota_geral = new Chart(ctx, {
      type: 'line',
      data: {
        labels: cafesChart.map(cafe => cafe.criador.split(' ')[0]),
        datasets: [
          {
            label: 'Nota Geral',
            data: cafesChart.map(cafe => (cafe.nota_geral ? cafe.nota_geral.toFixed(1) : null)),
            tension: 0.2
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            min: 0
          },
        }
      }
    });
    this.updateTheme(grafico_nota_geral)

    $('#btn_dark').on('click', () => {
      this.updateTheme(grafico_nota_geral)
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
      const response = await api.get('/cafe/findall')

      this.cafes = response.data.cafes.map((cafe: Cafe) => {
        let { id, criador, dia, nota_geral } = cafe

        return {
          id: id,
          dia: dia,
          criador: criador,
          nota_geral: nota_geral
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
