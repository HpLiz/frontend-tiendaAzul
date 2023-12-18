import axios from "axios";
import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";

export const useReportesStore = defineStore("reportes", () => {
	let reportes = ref([]);
	let reportesToday = ref([]);
	let ticketInfo = ref({});
	let productsSoldMonth = ref([]);
	let productsSoldDay = ref([]);
	const toast = useToast();
	const token = $cookies.get("user")?.token;
	const today = new Date();

	const fetchReportes = () => {
		axios
			.request({
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "POST",
				url: `/api/reports/month`,
				data: {
					year: `${today.getFullYear()}`,
					month: `${today.getMonth() + 1}`,
				},
			})
			.then((res) => {
				reportes.value = res.data;
			})
			.catch((err) => {
				toast.error("Error al cargar los reportes del mes");
				console.log(err);
			});
	};

	const fetchReportesDay = () => {
		axios
			.request({
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "POST",
				url: `/api/reports/day`,
				data: {
					year: `${today.getFullYear()}`,
					month: `${today.getMonth() + 1}`,
					day: `${today.getDate()}`,
				},
			})
			.then((res) => {
				reportesToday.value = res.data;
			})
			.catch((err) => {
				toast.error("Error al cargar los reportes de hoy");
				console.log(err);
			});
	};

	const getTicketInfo = (id) => {
		axios
			.request({
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "GET",
				url: `/api/sales/${id}`,
			})
			.then((res) => {
				console.log(res.data);
				ticketInfo.value = res.data;
			})
			.catch((err) => {
				console.log(err);
				toast.error(`No se encontró la venta con ID "${id}"`);
			});
	};

	function getProductsSold(tiempo) {
		const source = tiempo === "mes" ? reportes.value : reportesToday.value;

		const productos = source.reduce((result, sale) => {
			sale.items.forEach((product) => {
				const productName = product.name;

				if (result[productName]) {
					// result[productName].name = product
					result[productName].quantity += product.SaleProduct.amount;
					result[productName].price = product.salePrice;
					result[productName].totalPrice +=
						product.SaleProduct.amount * product.salePrice;
				} else {
					result[productName] = {
						name: productName,
						quantity: product.SaleProduct.amount,
						price: product.salePrice,
						totalPrice: product.SaleProduct.amount * product.salePrice,
					};
				}
			});

			return result;
		}, {});

		return Object.values(productos);
	}

	function getDatachart(productos) {
		let dataset = [];
		productos.forEach((producto) => {
			const { name, quantity, price, totalPrice } = producto;
			dataset.push({
				label: name,
				backgroundColor: getRandomColor(),
				data: [
					{
						x: price,
						y: totalPrice,
						r: quantity,
					},
				],
			});
		});
		return dataset;
	}

	function getRandomColor() {
		return "#" + Math.floor(Math.random() * 16777215).toString(16);
	}

	return {
		reportes,
		reportesToday,
		fetchReportes,
		fetchReportesDay,
		getTicketInfo,
		ticketInfo,
		getDatachart,
		getProductsSold,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useReportesStore, import.meta.hot));
}
