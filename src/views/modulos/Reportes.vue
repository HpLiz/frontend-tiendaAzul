<template>
    <NavBar titleModule="Reportes" />




    <div class="w-4/5 mx-auto flex flex-col items-center justify-evenly my-8">
        <div role="tablist" class="tabs tabs-boxed">
            <router-link to="/reportes/mes" role="tab" :class="{ 'tab-active': $route.path === '/reportes/mes' }"
                class="tab text-xl font-semibold">Estadisticas mes</router-link>
            <router-link to="/reportes/dia" role="tab" :class="{ 'tab-active': $route.path === '/reportes/dia' }"
                class="tab text-xl font-semibold">Estadisticas dia</router-link>
        </div>

        <router-view></router-view>

    </div>

    <div class="w-4/5 mx-auto">
        <SalesTable />
    </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted } from 'vue';
import NavBar from '../../components/navbars/NavBar.vue';
import SalesTable from '../../components/tables/SalesTable.vue';
import { useReportesStore } from '../../stores/reportes'
import { useRouter } from 'vue-router'

const store = useReportesStore()
const router = useRouter()



onMounted(() => {
    try {
        router.push('reportes/mes')
    } catch (error) {
        console.log('error al redirigir a la ruta mes');
    }

})

onBeforeMount(() => {
    store.fetchReportes()
    store.fetchReportesDay()
})



</script>
