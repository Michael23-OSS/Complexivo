<?php
 header('Access-Control-Allow-Origin: *');
 header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
 header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
 header("Allow: GET, POST, OPTIONS, PUT, DELETE");
 ?>

<!DOCTYPE html>
<html lang="es">
<head>
    <title>SERVIDOR WEB</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./estilos.css">
</head>
<body>
    <!-- Header con logo -->
    <header class="header">
        <div class="logo">
            <img src="https://srvcas.espe.edu.ec/authenticationendpoint/images/Espe-Angular-Logo.png" alt="Logo">
        </div>
        <div class="header">
            <h1>SERVIDOR WEB</h1>
        </div>
    </header>

    <div class="contenedor">

        <div class="div-formulario">
            <h2>Formulario</h2>

            <form action="#" id="formulario">
                <input type="text" id="usuario" placeholder="Ingresa el usuario">
                <input type="text" id="address" placeholder="Ingresa la dirección">
                <input type="text" id="phone" placeholder="Ingresa el numero de contacto">
                <button type="submit" id="btnAgregar">Agregar</button>
            </form>
        </div>

        <div class="div-listado">
            <h2>Listado clientes</h2>
            <div class="div-clientes">
                
            </div>
        </div>

    </div>

    <!-- Footer -->
    <footer class="footer">
        <p>Derechos de autor © 2024 SERVIDOR WEB. Todos los derechos reservados.</p>
    </footer>

    <script src="./app.js"></script>
</body>
</html>
