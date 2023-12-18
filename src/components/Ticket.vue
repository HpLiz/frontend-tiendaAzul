
<template>
    <div id="invoice-POS">

        <center id="top">
            <div class="logo"></div>
            <div class="info">
                <h2>Tienda Azul</h2>
            </div><!--End Info-->
        </center><!--End InvoiceTop-->

        <div id="mid">
            <div class="info">
                <h2>Contacto</h2>
                <p>
                    Dirección : Oaxaca de Juárez, Oax.
                    Correo : tiendazul@gmail.com
                    Teléfono : 555-555-5555
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
                            <h2>Sub Total</h2>
                        </td>
                    </tr>

                    <tr class="service">
                        <td class="tableitem">
                            <p class="itemtext">Zote 100grs</p>
                        </td>
                        <td class="tableitem">
                            <p class="itemtext">1</p>
                        </td>
                        <td class="tableitem">
                            <p class="itemtext">$14.00</p>
                        </td>
                    </tr>


                    <tr class="tabletitle">
                        <td></td>
                        <td class="Rate">
                            <h2>Subtotal</h2>
                        </td>
                        <td class="payment">
                            <h2>$14.00</h2>
                        </td>
                    </tr>

                    <tr class="tabletitle">
                        <td></td>
                        <td class="Rate">
                            <h2>Total</h2>
                        </td>
                        <td class="payment">
                            <h2>$14.00</h2>
                        </td>
                    </tr>

                </table>
            </div><!--End Table-->

            <div id="legalcopy">
                <p class="legal"><strong>Gracias por su compra!</strong>  No se realizan cambios ni devoluviones; por favor,
                    revise sus productos antes de salir. Vuelva pronto!.
                </p>
            </div>

        </div><!--End InvoiceBot-->
    </div><!--End Invoice-->
</template>


<script setup>
const props = defineProps(['detalle'])
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
    /*background: url(http://michaeltruong.ca/images/logo1.png) no-repeat;*/
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
