<template>
    <div class="w-full flex gap-x-4 mt-4 justify-center">
        <div class="w-1/5">

            <StatReportes month="Diciembre 2023" :productos="itemsTotal" :total="amountTotal"
                :articulos="totalProductsSold" />
        </div>
        <div class="w-3/5">
            <BarMes />
        </div>
    </div>
    <ReportesVentas :periodo="reportes" />
</template>

<script setup>
import StatReportes from '@/components/StatReportes.vue'
import { useReportesStore } from '@/stores/reportes'
import { computed } from 'vue';
import BarMes from '../graficos/BarMes.vue';
import ReportesVentas from '../tables/ReportesVentas.vue';

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

const totalProductsSold = computed(() => {
    const total = reportes.reduce((acc, sale) => {
        return acc + sale.items.reduce((itemAcc, item) => {
            return itemAcc + item.SaleProduct.amount
        }, 0)
    }, 0)
    return total
})

</script>
