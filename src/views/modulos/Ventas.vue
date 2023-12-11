
<template>
    <NavBar titleModule="Ventas" />
    <div>
        <SalesTable />
    </div>
</template>

<script setup>
import NavBar from '../../components/navbars/NavBar.vue';
import { onBeforeMount, onMounted } from 'vue'
import { useVentaStore } from '../../stores/venta'
import SalesTable from '../../components/tables/SalesTable.vue'

const store = useVentaStore()

onBeforeMount(() => {
    store.fetchVentas()
})


</script>