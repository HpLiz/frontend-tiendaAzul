<!---SI ES pasar a CreateProvide-->

<template>
    <form class="mt-3 w-full">
        <div class="divider">Información del Contacto</div>
        <div class="grid grid-cols-1 gap-x-4 mt-4 sm:grid-cols-2">
            <div>
                <label class="font-bold pr-4">
                    Nombre(s)*
                </label>
                <input v-bind="provFirstname" type="text" class="input-bordered input input-sm uppercase w-full">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.provFirstname }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Apellidos*
                </label>
                <input v-bind="provLastname" type="text" class="input-bordered input input-sm uppercase w-full">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.provLastname }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Correo electrónico*
                </label>
                <input type="email" class="input-bordered input input-sm w-full" v-bind="provEmail">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.provEmail }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Teléfono
                </label>
                <input type="text" class="input input-bordered  input-sm w-full" v-bind="provPhone">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.provPhone }}</span>
                </label>
            </div>

        </div>
        <div class="divider">Información de la empresa</div>
        <div class="grid grid-cols-1 gap-x-4  mt-4 sm:grid-cols-2">
            <div class="col-span-2">
                <label class="font-bold pr-4">
                    Nombre de la empresa*
                </label>
                <input v-bind="companyName" type="text" class="input-bordered input input-sm uppercase w-full">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.companyName }}</span>
                </label>
            </div>
            <div class="col-span-2">
                <label class="font-bold pr-4">
                    Dirección
                </label>
                <input v-bind="companyAddress" type="text" class="input-bordered input input-sm  w-full">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.companyAddress }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Correo electrónico*
                </label>
                <input type="email" class="input-bordered input input-sm w-full" v-bind="companyEmail">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.companyEmail }}</span>
                </label>
            </div>
            <div>
                <label class="font-bold pr-4">
                    Telefono
                </label>
                <input type="text" class="input input-bordered  input-sm w-full" v-bind="companyPhone">
                <label class="label h-6 static">
                    <span class="label-text-alt text-rose-600 absolute">{{ errors.companyPhone }}</span>
                </label>
            </div>
        </div>
        <div class="flex justify-end">
            <button class="btn btn-md btn-primary" @click="onSubmit()" :disabled="isSubmitting">
                {{ isSubmitting ? "Creando..." : "Crear" }}
            </button>
        </div>


    </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useProveedoresStore } from '../../stores/proveedores';

const store = useProveedoresStore()

const emits = defineEmits(['closeModal'])


const { errors, defineInputBinds, isSubmitting, handleSubmit } = useForm({
    validationSchema: yup.object({
        provFirstname: yup.string().min(3).required("Este campo es obligatorio"),
        provLastname: yup.string().min(3).required("Este campo es obligatorio"),
        provPhone: yup.number("Debe ser un numero de telefono valido"),
        provEmail: yup.string().email("Debe ser un email valido").required(),
        companyName: yup.string().min(1).required("Este campo es obligatorio"),
        companyAddress: yup.string(),
        companyPhone: yup.number("Debe ser un numero de telefono valido"),
        companyEmail: yup.string().email("Debe ser un email valido").required(),

    }),
    initialValues: {
        provFirstname: "",
        provLastname: "",
        provPhone: "",
        provEmail: "",
        companyName: "",
        companyAddress: "",
        companyPhone: "",
        companyEmail: "",
    }

})

const provFirstname = defineInputBinds("provFirstname")
const provLastname = defineInputBinds("provLastname")
const provPhone = defineInputBinds("provPhone")
const provEmail = defineInputBinds("provEmail")
const companyName = defineInputBinds("companyName")
const companyAddress = defineInputBinds("companyAddress")
const companyPhone = defineInputBinds("companyPhone")
const companyEmail = defineInputBinds("companyEmail")


const onSubmit = handleSubmit(async (values) => {

    const body = {
        ...values
    }
    await store.crear(body)
    emits('closeModal')

})

</script>
