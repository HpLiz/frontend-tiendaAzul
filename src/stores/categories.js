import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

export const useCategoriesStore = defineStore("categories", () => {
	const toast = useToast();
	const token = $cookies.get("user")?.token;
	let categories = ref([]);

	const fetchCategories = () => {
		axios
			.request({
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "GET",
				url: "/api/categories",
			})
			.then((res) => {
				// console.log(res.data);
				categories.value = res.data?.categorias;
			})
			.catch((error) => {
				console.log(error);
				toast.error("Error al cargar las categorias");
			});
	};

	function addCategory(data) {
		axios
			.post("/api/categories", data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				fetchCategories();
				toast.success("Categoria creada correctamente");
			})
			.catch((error) => {
				console.log(error);
				toast.error("Error al crear una categoria");
			});
	}

	async function deleteCategory(id) {
		try {
			const response = await axios.delete(`/api/categories/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			fetchCategories();
			toast.info("Categoria eliminada correctamente");
		} catch (error) {
			toast.error("Error al eliminar una categoria");
			console.log(error);
		}
	}
	function editarCategoria(id, values) {
		axios
			.patch(`/api/categories/${id}`, values, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				fetchCategories();
				toast.success("La Categoria se ha actualizado correctamente");
			})
			.catch((err) => {
				console.log(err);
				toast.error("Error al actualizar la categoria");
			});
	}

	async function getCategoryById(id) {
		try {
			const reponse = await axios.request({
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "GET",
				url: `/api/categories/${id}`,
			});
			// console.log(object);
			return reponse.data;
		} catch (error) {
			toast.error("Error al encontrar la categoria");
			console.log(error);
		}
	}

	return {
		categories,
		fetchCategories,
		addCategory,
		editarCategoria,
		deleteCategory,
		getCategoryById,
	};
});
