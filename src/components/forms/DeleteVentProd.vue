<template>
    <section class="">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">

            <div class="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-base-300 ">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-base-content text-center">
                        Autorizacion del Administrador
                    </h1>
                    <!-- TODO: corregir ortografia -->

                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label class="block mb-2 font-medium ">
                                Nombre de usuario:
                            </label>
                            <input v-model="username" type="text" class="input input-sm block w-full "
                                placeholder="usuario" required="">
                        </div>

                        <div class="py-2" x-data="{ show: true }">
                            <label for="password" class="block mb-2  font-medium ">Contraseña: </label>
                            <div class="relative">
                                <input placeholder="••••••••••" :type="showPassword ? 'password' : 'text'"
                                    v-model="password" class="input input-sm text-md block px-3 py-2 rounded-lg w-full">
                                <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">

                                    <font-awesome-icon @click="showPassword = !showPassword"
                                        :class="{ 'hidden': !showPassword, 'block': showPassword }"
                                        icon="fa-solid fa-eye" />
                                    <font-awesome-icon @click="showPassword = !showPassword"
                                        :class="{ 'block': !showPassword, 'hidden': showPassword }"
                                        icon="fa-solid fa-eye-slash" />
                                </div>
                            </div>
                        </div>
                        <button @click.prevent="login()" :disabled="isLoading"
                            class="w-full btn btn-primary btn-sm font-medium rounded-lg text-sm px-5 text-center text-white">
                            Autorizar
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification';
import axios from 'axios'

const emits = defineEmits(['closeModal'])
const props = defineProps(['articulo','carrito'])
const producto = props.articulo
const carrito = props.carrito
//let valido=ref(null)

const toast = useToast()

const username = ref("")
const password = ref("")
const showPassword = ref(true)

// const { setToken, setUser } = store

const login = () => {
    axios.post('/api/auth/login', {
        username: username.value,
        password: password.value
    }).then((res) => {
        const { user, token } = res.data;
        if(user.role.includes('admin')){
            const index = carrito.indexOf(producto)
            carrito.splice(index, 1)                               
            toast.success("Eliminación Autorizada");
        }else{            
            toast.error("Error de autentificacion");
        }

        
    }).catch((error) => {
            
        toast.error("Error de autentificacion");   
        console.log(error);
        // console.log(error.response.data.message);
        if (error.message){
            console.log(error.message)
            //toast.error(error.message)
        }
        else if (error.message.data) {
            console.log(error.response.data.message)
            ///toast.error(error.response.data.message);
        }
    })
    emits('closeModal')
    //emits('validoCambiado', valido.value)
}

</script>