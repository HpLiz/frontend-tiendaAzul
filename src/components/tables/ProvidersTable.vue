<template>
    <Modal :show="showDeleteModal" @close="toggleDeleteModal()" size="md">
        <template #title>
            <h3 class="text-xl font-bold text-center ">Eliminar proveedor</h3>
        </template>
        <template #closeModal>
            <div class="relative">

                <button class="btn btn-sm text-xl hover:text-2xl btn-circle btn-ghost absolute right-1 top-0"
                    @click="toggleDeleteModal()">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </div>
        </template>
        <template #body>
            <DeleteProveedor :proveedor="proveedor" @closeModal="toggleDeleteModal()" />
        </template>
    </Modal>

    <Modal :show="showEditModal" @close="toggleEditModal()" size="lg">
        <template #title>
            <h3 class="text-xl font-bold text-center ">Editar Proveedor</h3>
        </template>
        <template #closeModal>
            <div class="relative">

                <button class="btn btn-sm text-xl hover:text-2xl btn-circle btn-ghost absolute right-1 top-0"
                    @click="toggleEditModal()">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </div>
        </template>
        <template #body>
            <EditProveedor :proveedor="proveedor" @closeModal="toggleEditModal()" />
        </template>
    </Modal>

    <!-- <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div class="card  w-72 h-52 bg-base-200 shadow-xl" v-for="provider in providers" :key="provider.id">
            <div class="card-body">
                <h2 class="card-title">
                    {{ provider.name }}
                </h2>
                <p>
                    {{ provider.email }}
                </p>
                <p>
                    {{ provider.phone }}
                </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-info btn-sm" @click="seleccionarEdit(provider.id)">Editar</button>
                    <button class="btn btn-error btn-sm" @click="seleccionarEliminar(provider.id)">Eliminar</button>
                </div>
            </div>
        </div>
    </div> -->
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th>Empresa</th>
                    <th>Contacto</th>
                    <th>Direccion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <tr v-for="prov in providers" :key="prov.id">
                    <td>
                        <div class="flex items-center gap-3">

                            <div class="flex flex-col gap-1">
                                <div class="font-bold capitalize badge badge-ghost">{{ prov.companyName }} </div>
                                <div class="text-sm opacity-80">{{ prov.companyEmail }} </div>
                                <div class="text-sm opacity-80">{{ prov.companyPhone }} </div>

                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center gap-3">

                            <div class="flex flex-col gap-1">
                                <div class="font-bold capitalize">{{ prov.provFirstname }} {{ prov.provLastname }} </div>
                                <div class="text-sm opacity-80">{{ prov.provEmail }} </div>
                                <div class="text-sm opacity-80">{{ prov.provPhone }} </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="text-sm truncate">{{ prov.companyAddress }} </div>

                    </td>
                    <th>
                        <div>
                            <button class="btn btn-xs bg-rose-500 text-white">
                                Eliminar
                            </button>
                            <button class="btn btn-xs bg-sky-500 text-white">
                                Editar
                            </button>
                        </div>
                    </th>
                </tr>

            </tbody>
            <!-- foot -->
            <tfoot>
                <tr>
                    <th>Empresa</th>
                    <th>Contacto</th>
                    <th>Direccion</th>
                    <th>Acciones</th>
                </tr>
            </tfoot>

        </table>
    </div>
</template>

<script setup>
import Modal from '../Modal.vue';
import { useToggle } from '@vueuse/core'
import EditProveedor from '../forms/EditProveedor.vue';
import { ref } from 'vue';
import { useProveedoresStore } from '../../stores/proveedores';
import DeleteProveedor from '../forms/DeleteProveedor.vue';

const store = useProveedoresStore()

const [showEditModal, toggleEditModal] = useToggle()
const [showDeleteModal, toggleDeleteModal] = useToggle()

const { providers } = defineProps(['providers'])
const proveedor = ref({})

const seleccionarEdit = async (id) => {
    proveedor.value = await store.getProveedor(id)
    toggleEditModal()
    // console.log(proveedor.value);
}

const seleccionarEliminar = async (id) => {
    proveedor.value = await store.getProveedor(id)
    toggleDeleteModal()
    // console.log(proveedor.value);
}
</script>
