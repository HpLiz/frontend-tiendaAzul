<template>
    <div class="w-full flex gap-x-4 mt-4">
        <div class="w-1/5">
            <StatReportes month="Diciembre 15, 2023" :articulos="todayTotalItems" :total="todayTotalAmount" />

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
const reportesToday = store.reportesToday

const todayTotalAmount = computed(() => {
    const total = reportesToday.reduce((total, sale) => {
        return total + sale.total
    }, 0)
    return total
})
const todayTotalItems = computed(() => {
    const total = reportesToday.reduce((total, sale) => {
        return total + sale.items.length
    }, 0)
    return total
})
</script>
