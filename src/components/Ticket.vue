
<template>
    <div id="invoice-POS">

        <div id="top">
            <div class="logo"></div>
            <div class="info">
                <h2>Tienda Azul</h2>
            </div><!--End Info-->
        </div><!--End InvoiceTop-->

        <div id="mid">
            <div class="info">
                <h2>Contacto</h2>
                <p>
                    Cajero : {{ ticketInfo.employee.fullname }}
                    Fecha : {{ticketInfo.createdAt}}
                </p>
            </div>
        </div><!--End Invoice Mid-->

        <div id="bot">

            <div id="table">
                <table>
                    <tr class="tabletitle">
                        <td class="item">
                            <h2>Producto</h2>
                        </td>
                        <td class="Hours">
                            <h2>Cantidad</h2>
                        </td>
                        <td class="Rate">
                            <h2>Precio</h2>
                        </td>
                    </tr>

                    <tr class="service" v-for="detalle in ticketInfo?.items" :key="detalle.id">
                        <td class="tableitem">
                            <p class="itemtext">{{detalle.name}}</p>
                        </td>
                        <td class="tableitem">
                            <p class="itemtext">{{detalle.SaleProduct.amount}}</p>
                        </td>
                        <td class="tableitem">
                            <p class="itemtext">{{ detalle.salePrice }}</p>
                        </td>
                    </tr>


                    

                    <tr class="tabletitle">
                        <td></td>
                        <td class="Rate">
                            <h2>Total</h2>
                        </td>
                        <td class="payment">
                            <h2>${{ ticketInfo.total.toFixed(2) }}</h2>
                        </td>
                    </tr>

                </table>
            </div><!--End Table-->

            <div id="legalcopy">
                <p> Dirección : Oaxaca de Juárez, Oax.<br>
                    Correo : tiendazul@gmail.com<br>
                    Teléfono : 555-555-5555
                </p>
            </div>

        </div><!--End InvoiceBot-->
    </div><!--End Invoice-->
</template>


<script setup>
// const props = ticketInfo(['detalle'])
import { useReportesStore } from "../stores/reportes.js";
const store = useReportesStore()

const {ticketInfo} = store

</script>

<style scoped>
#invoice-POS {
    box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
    padding: 2mm;
    margin: 0 auto;
    width: 44mm;
    background: #FFF;
}

::selection {
    background: #f31544;
    color: #FFF;
}

::moz-selection {
    background: #f31544;
    color: #FFF;
}

h1 {
    font-size: 1.5em;
    color: #222;
}

h2 {
    font-size: 0.9em;
}

h3 {
    font-size: 1.2em;
    font-weight: 300;
    line-height: 2em;
}

p {
    font-size: 0.7em;
    color: #666;
    line-height: 1.2em;
}

#top,
#mid,
#bot {
    border-bottom: 1px solid #EEE;
}

#top {
    min-height: 100px;
}

#mid {
    min-height: 80px;
}

#bot {
    min-height: 50px;
}

#top .logo {
    /* float: left; */
    height: 60px;
    width: 60px;
    background: url(../../public/logo2.png) no-repeat;
    background-size: 60px 60px;
}

.clientlogo {
    float: left;
    height: 60px;
    width: 60px;
    background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
    background-size: 60px 60px;
    border-radius: 50px;
}

.info {
    display: block;
    /* float:left; */
    margin-left: 0;
}

.title {
    float: right;
}

.title p {
    text-align: right;
}

table {
    width: 100%;
    border-collapse: collapse;
}



.tabletitle {
    /* padding: 5px; */
    font-size: 0.5em;
    background: #EEE;
}

.service {
    border-bottom: 1px solid #EEE;
}

.item {
    width: 24mm;
}

.itemtext {
    font-size: 0.5em;
}

#legalcopy {
    margin-top: 5mm;
}
</style>
