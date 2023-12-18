<template>
    <NavBar titleModule="Categorias" />
    <div class="w-4/6 mx-auto items-center">
        <div class="flex flex-col items-center justify-center h-full w-full my-12">
            <label @click="toggleModal()" class="btn btn-primary">Nueva categoría</label>


            <Modal :show="showCreateModal" @close="toggleModal()">
                <template v-slot:title>
                    <h3 class="text-xl font-bold text-center ">Nueva categoría</h3>
                </template>

                <template #closeModal>
                    <div class="relative">

                        <button class="btn btn-sm text-xl hover:text-2xl btn-circle btn-ghost absolute right-1 top-0"
                            @click="toggleModal()">
                            <font-awesome-icon :icon="['fas', 'xmark']" />
                        </button>
                    </div>
                </template>

                <template #body>
                    <CreateCategory @closeModal="toggleModal()" />
                </template>

            </Modal>
        </div>

        <div class="flex flex-col justify-center h-full w-full overflow-x-auto  my-12">
            <TableCategories :categories="store.categories" />
        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/navbars/NavBar.vue';
import TableCategories from '../../components/tables/Categories.vue'
import CreateCategory from '../../components/forms/CreateCategory.vue';
import Modal from '@/components/Modal.vue'
import { useCategoriesStore } from '../../stores/categories'
import { useToggle } from '@vueuse/core'
import { onBeforeMount } from 'vue';

const store = useCategoriesStore()

const [showCreateModal, toggleModal] = useToggle()

onBeforeMount(() => {
    store.fetchCategories()
})

</script>
