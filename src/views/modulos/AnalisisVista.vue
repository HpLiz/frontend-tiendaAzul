<template>
    <NavBar titleModule="Estadisticas" />
    <section class="p-5 flex">
        <div class="card border border-black">
            <div class="card-title bg-black text-white p-2">
                Grafica 1
            </div>
            <div class="card-body">
                <BarChart :info="data" />
            </div>
        </div>
    </section>
</template>


<script>
import { useToast } from 'vue-toastification'
import NavBar from '../../components/navbars/NavBar.vue';
import BarChart from '../../components/tables/graficas/Analisis.vue'

import { useVentaStore } from '../../stores/venta'
import { ref } from 'vue';
const { ventas, fetchVentas } = useVentaStore()


const toast = useToast()

export default {
    name: 'App',
    components: { BarChart, NavBar },
    data() {
        return {
            data: ref([]),
            labe: ref([])
        }
    },
    async mounted() {
        toast.success('iniciando')
        await fetchVentas()

        ventas.forEach((item) => {
            this.data.push(item.total);
        });

        toast.warning("aaa" + this.data)

    }
}
</script>