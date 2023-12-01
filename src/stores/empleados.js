import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'




export const useEmpleadosStore = defineStore('empleados', () => {
    const toast = useToast()
    let empleadosLista = ref([])
    const token = $cookies.get('user')?.token

    const fetchEmpleados = () => {
        axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "GET",
            url: `/api/employees`,

        }).then(res => {
            empleadosLista.value = res.data
        }).catch(err => {
            console.log(err);
        })
    }

    async function crearEmpleado(body) {
        try {
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                url: "/api/employees",
                data: body
            })

            const nuevoEmpleado = response.data?.employee
            empleadosLista.value.push(nuevoEmpleado)
            toast.success("Empleado Creado")
        } catch (error) {
            console.log(error);
            toast.error("Error al crear el empleado")
        }
    }

    async function eliminarEmpleado(id) {
        try {
            const empleado = await getEmpleado(id)
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "DELETE",
                url: `/api/employees/${empleado.id}`,
            })
            const res2 = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "DELETE",
                url: `/api/users/${empleado.userId}`,
            })
            const nuevosEmpleados = empleadosLista.value.filter(user => user.id !== id)
            empleadosLista.value = nuevosEmpleados
            // else toast.error("Error al eliminar el empleado")
            toast.success("Empleado elimininado correctamente")
        } catch (err) {
            console.log(err);
            toast.error("Error al borrar el empleado")
        }
    }

    async function editarEmpleado(id, changes) {
        try {
            const empleado = await getEmpleado(id)
            const response1 = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "PATCH",
                url: `/api/employees/${empleado.id}`,
                data: changes?.employee
            })
            const response2 = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "PATCH",
                url: `/api/users/${empleado.userId}`,
                data: changes?.user
            })
        } catch (error) {
            console.log(err);
            toast.error("Error al actualizar el empleado")
        }
    }

    async function getEmpleado(id) {
        try {
            const response = await axios.request({
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
                url: `/api/employees/${id}`
            })
            return response.data
        } catch (error) {
            toast.error("Error al obtener el empleado")
        }
    }


    return {
        empleadosLista,
        fetchEmpleados,
        crearEmpleado,
        eliminarEmpleado,
        editarEmpleado,
        getEmpleado
    }
})
