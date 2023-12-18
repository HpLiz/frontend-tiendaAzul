import axios from "axios";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";

export const useProveedoresStore = defineStore("proveedores", () => {
	let proveedores = ref([]);
	const token = $cookies.get("user")?.token;
	const toast = useToast();

	const fetchProveedores = () => {
		axios
			.request({
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "GET",
				url: `/api/providers`,
			})
			.then((res) => {
				proveedores.value = res.data;
			})
			.catch((err) => {
				toast.error("Error al cargar los proveedores");
				console.log(err);
			});
	};

	async function crearProveedor(body) {
		try {
			const response = await axios.request({
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "POST",
				url: "/api/providers",
				data: body,
			});
			fetchProductos();
			toast.success("Proveedor creado correctamente");
		} catch (error) {
			console.log(error);
			toast.error("Error al crear el Proveedor" + error);
		}
	}

	async function eliminarProveedor(id) {
		try {
			const response = await axios.request({
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "DELETE",
				url: `/api/providers/${id}`,
			});
			fetchProductos();
			toast.success("Proveedor elimininado correctamente");
		} catch (err) {
			console.log(err);
			toast.error("Error al borrar el Proveedor");
		}
	}

	async function editarProveedor(id, changes) {
		try {
			const response = await axios.request({
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "PATCH",
				url: `/api/providers/${id}`,
				data: changes,
			});
			fetchProveedores();
			toast.success("Proveedor actualizado correctamente");
		} catch (error) {
			console.log(error);
			toast.error("Error al actualizar el Proveedor");
		}
	}

	async function getProveedor(id) {
		try {
			const response = await axios.request({
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "GET",
				url: `/api/providers/${id}`,
			});
			return response.data;
		} catch (error) {
			console.log(error);
			toast.error("Error al obtener el Proveedor");
		}
	}

	return {
		//regresr todos los metodos
		proveedores,
		fetchProveedores,
		crearProveedor,
		editarProveedor,
		eliminarProveedor,
		getProveedor,
		crear,
	};
});
/*
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProveedoresStore, import.meta.hot))
}
*/
