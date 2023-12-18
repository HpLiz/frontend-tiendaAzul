<template>
    <div class="w-full flex gap-x-4 mt-4">
        <div class="w-1/5">

            <StatReportes month="Diciembre 2023" :articulos="itemsTotal" :total="amountTotal" />
        </div>
        <div class="w-4/5">
            grafica
        </div>
    </div>
</template>

<script setup>
import StatReportes from '@/components/StatReportes.vue'
import { useReportesStore } from '@/stores/reportes'
import { computed } from 'vue';

const store = useReportesStore()
const reportes = store.reportes
const amountTotal = computed(() => {
    const total = reportes.reduce((total, sale) => {
        return total + sale.total
    }, 0)
    return total
})

const itemsTotal = computed(() => {
    const total = reportes.reduce((total, sale) => {
        return total + sale.items.length
    }, 0)
    return total
})

</script>
