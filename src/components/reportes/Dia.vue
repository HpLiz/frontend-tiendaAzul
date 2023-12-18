<template>
    <div class="w-full flex gap-x-4 mt-4">
        <div class="w-1/5">
            <StatReportes month="Diciembre 15, 2023" :productos="todayProductsSold" :total="todayTotalAmount"
                :articulos="todayTotalProductsSOld" />

        </div>
        <div class="w-4/5">
            <!-- <BarDia /> -->
        </div>

    </div>
    <ReportesVentas :periodo="reportesToday" />
</template>


<script setup>
import StatReportes from '@/components/StatReportes.vue'
import { useReportesStore } from '@/stores/reportes'
import { computed } from 'vue';
import BarDia from '../graficos/BarDia.vue';
import ReportesVentas from '../tables/ReportesVentas.vue';

const store = useReportesStore()
// const {reportesToday}= store
const reportesToday = store.reportesToday

const todayTotalAmount = computed(() => {
    const total = reportesToday.reduce((total, sale) => {
        return total + sale.total
    }, 0)
    return total
})
const todayProductsSold = computed(() => {
    const total = reportesToday.reduce((total, sale) => {
        return total + sale.items.length
    }, 0)
    return total
})

const todayTotalProductsSOld = computed(() => {
    const total = reportesToday.reduce((acc, sale) => {
        return acc + sale.items.reduce((itemAcc, item) => {
            return itemAcc + item.SaleProduct.amount
        }, 0)
    }, 0)
    return total
})
</script>
