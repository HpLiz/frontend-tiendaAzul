
<template>
    <NavBar titleModule="Ventas" />
    <div class="absolute p-5 flex items-center content-center h-modal ">
        <SalesTable />
    </div>
</template>

<script setup>
import NavBar from '../../components/navbars/NavBar.vue';
import { onBeforeMount, onMounted, onUnmounted } from 'vue'
import { useVentaStore } from '../../stores/venta'
import SalesTable from '../../components/tables/SalesTable.vue'

const store = useVentaStore()

onBeforeMount(() => {
    store.fetchVentas()
})

onUnmounted(() => {
    store.limpiarBusqueda()

})

</script>