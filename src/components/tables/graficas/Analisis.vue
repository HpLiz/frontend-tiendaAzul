<template>
  <Line :data="data" :options="options" />
</template>
  
<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
//import { data, options } from './data/ventas'
import { ref } from 'vue';
import { useToast } from 'vue-toastification'
const toast = useToast()

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const contenido = ref([0,0,0,0]);


export default {
  props: ['info'],
  components: {
    Line
  },
  data() {
    return {
      data,
      options,
      
    }
  },
  mounted() {
    toast.success("owo?" + this.info)
    contenido = this.info
    toast.success("uwu" + contenido)
  }
}



const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Ventas',
      backgroundColor: '#f87979',
      data: contenido
    },
  ]
}

const options = {
  responsive: false,
  maintainAspectRatio: false

}


</script>
  