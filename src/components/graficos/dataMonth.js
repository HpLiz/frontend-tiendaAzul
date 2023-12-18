import axios from "axios";
import { useReportesStore } from "../../stores/reportes";
const token = $cookies.get("user")?.token;
const today = new Date();
export async function data() {
	try {
		const response = await axios.request({
			headers: {
				Authorization: `Bearer ${token}`,
			},
			method: "POST",
			url: `/api/reports/month`,
			data: {
				year: `${today.getFullYear()}`,
				month: `${today.getMonth() + 1}`,
			},
		});

		const reportes = response.data;

		const productos = reportes.reduce((result, sale) => {
			sale.items.forEach((product) => {
				const productName = product.name;

				if (result[productName]) {
					// result[productName].name = product
					result[productName].quantity += product.SaleProduct.amount;
					result[productName].price = product.salePrice;
				} else {
					result[productName] = {
						name: productName,
						quantity: product.SaleProduct.amount,
						price: product.salePrice,
					};
				}
			});

			return result;
		}, {});

		const productsSold = Object.values(productos);
		// console.log("productos vendidos", productsSold);

		const objeto = {
			labels: productsSold.map((producto) => producto.name),
			datasets: [
				{
					label: "Productos Vendidos",
					backgroundColor: "rgba(54, 162, 235, 0.2)",
					borderColor: "rgb(54, 162, 235)",
					borderWidth: 1,
					data: productsSold.map((producto) => producto.quantity),
				},
			],
		};

		console.log("objeto", objeto);
		return objeto;
	} catch (error) {
		console.log(error);
	}
}

export const options = {
	responsive: true,
	maintainAspectRatio: true,
	plugins: {
		title: {
			display: true,
			text: "Productos mas vendidos",
		},
	},
};

function getRandomColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
