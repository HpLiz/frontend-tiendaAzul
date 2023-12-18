<template>
    <Bar :data="datos" :options="options" />
</template>

<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import * as chartConfig from './chartConfig.js'

import { onMounted, ref } from 'vue'
import * as dataMonth from './dataMonth'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const datos = ref(null)
const options = dataMonth.options


onMounted(async () => {
    const objeto = await data();
    datos.value = objeto;
})
</script>
