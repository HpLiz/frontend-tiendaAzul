<template>
    <NavBar titleModule="Proveedores" />

    <Modal :show="showCreateModal" @close="toggleCreateModal()" size="md">
        <template #title>
            <h3 class="text-xl font-bold text-center ">
                Crear un proveedor
            </h3>
        </template>
        <template #closeModal>
            <div class="relative">
                <button class="btn btn-sm text-xl hover:text-2xl btn-circle btn-ghost absolute right-1 top-0"
                    @click="toggleCreateModal()">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </div>
        </template>
        <template #body>
            <CreateProviderForm @closeModal="toggleCreateModal()" />
        </template>
    </Modal>
    <div class="flex justify-center w-3/4 mx-auto mt-4">
        <label @click="toggleCreateModal()" class="btn btn-primary">Crear proveedor</label>
    </div>
    <div class="flex justify-center content-center h-screen mt-5">
        <ProvidersTable :providers="store.proveedores" />
    </div>
</template>

<script setup>
import { useToggle } from '@vueuse/core'
import NavBar from '@/components/navbars/NavBar.vue';
import ProvidersTable from '../../components/tables/ProvidersTable.vue';
import { useProveedoresStore } from '../../stores/proveedores'
import { onBeforeMount, onMounted } from 'vue';
import Modal from '../../components/Modal.vue';
import CreateProviderForm from '../../components/forms/CreateProviderForm.vue'

const store = useProveedoresStore()



const [showCreateModal, toggleCreateModal] = useToggle()

onBeforeMount(() => {
    store.fetchProveedores();
})

</script>
