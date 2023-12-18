<template>
    <div class="flex items-start justify-center content-center overflow-x-auto h-80">




        <div class="">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr class="text-base-content text-base">
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    <tr class="hover" v-for="categoria in categories" :key="categoria.id">
                        <td>{{ categoria.name }}</td>
                        <td>{{ categoria.description }}</td>
                        <td class="flex w-full content-evenly justify-evenly items-center">
                            <div class="tooltip" data-tip="Editar">
                                <button class="btn btn-info btn-xs " @click="seleccionarEdit(categoria.id)">
                                    <font-awesome-icon icon="fa-solid fa-pen" />
                                </button>
                            </div>
                            <div class="tooltip" data-tip="Eliminar">
                                <button class="btn btn-error text-base-content btn-xs "
                                    @click="seleccionarDelete(categoria.id)" type="button">
                                    <font-awesome-icon icon="fa-solid fa-trash" />
                                </button>

                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>




    <Modal :show="showEditModal" @close="toggleEditModal()">
        <template #title>
            <h3 class="text-xl font-bold text-center ">Editar categoria</h3>
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
            <EditCategory :categoria="categoria" @closeModal="toggleEditModal()" />
        </template>
    </Modal>
    <Modal :show="showDeleteModal" @close="toggleModal()">
        <template v-slot:title>
            <h3 class="text-lg font-bold text-center mt-5">Eliminar Categoria</h3>
        </template>

        <template #closeModal>
            <div class="flex justify-end">

                <button class="btn btn-sm text-xl hover:text-2xl btn-circle btn-ghost " @click="toggleModal()">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </div>
        </template>

        <template #body>
            <DeleteCategory :category="categoria" @close-modal="toggleModal()" />
        </template>
    </Modal>
</template>

<script setup>
import Modal from '../Modal.vue';
import { useToggle } from '@vueuse/core'
import { ref, onMounted } from 'vue'
import EditCategory from '../forms/EditCategory.vue';
import DeleteCategory from '../forms/DeleteCategory.vue'
import { useCategoriesStore } from '../../stores/categories';

const [showDeleteModal, toggleModal] = useToggle()
const [showEditModal, toggleEditModal] = useToggle()

const categoria = ref({})
const store = useCategoriesStore()

const props = defineProps(['categories'])


const seleccionarEdit = async (id) => {
    categoria.value = await store.getCategoryById(id)
    toggleEditModal()
}
const seleccionarDelete = async (id) => {
    categoria.value = await store.getCategoryById(id)
    toggleModal()
}





</script>
