/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
create DATABASE pruebas;
use pruebas;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE Inmuebles (
    ID INT PRIMARY KEY,
    Direccion VARCHAR(255),
    NumeroHabitaciones INT,
    TipoPropiedad VARCHAR(255),
    CostoMensual DECIMAL(10, 2)
);


CREATE TABLE ArriendoPropiedades (
    ID INT PRIMARY KEY,
    FechaInicio DATE,
    Duracion INT,
    InmuebleID INT,
    usuarioID INT,
    MontoMensual DECIMAL(10, 2),
    FOREIGN KEY (InmuebleID) REFERENCES Inmuebles(ID),
    FOREIGN KEY (usuarioid) REFERENCES usuarios(ID)
);

CREATE TABLE ControlPagos (
    ID INT PRIMARY KEY,
    ArriendoID INT,
    FechaPago DATE,
    MontoPagado DECIMAL(10, 2),
    FOREIGN KEY (ArriendoID) REFERENCES ArriendoPropiedades(ID)
);
SELECT *
FROM Inmuebles
WHERE Ciudad = 'ciudad_especifica'
AND ID NOT IN (SELECT InmuebleID FROM ArriendoPropiedades);

CREATE USER 'admin'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;
-- Crear usuario 'gestor' y darle permisos
CREATE USER 'gestor'@'%' IDENTIFIED BY 'contraseña_gestor';
GRANT SELECT, INSERT, UPDATE, DELETE ON pruebas.Inmuebles TO 'gestor'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON pruebas.usuarios TO 'gestor'@'%';
-- Crear usuario 'consulta' y darle permisos
CREATE USER 'consulta'@'%' IDENTIFIED BY 'contraseña_consulta';
GRANT SELECT ON pruebas.Inmuebles TO 'consulta'@'%';
GRANT SELECT ON pruebas.usuarios TO 'consulta'@'%';

-- Inserción de registros de ejemplo en la tabla usuarios
INSERT INTO usuarios (usuario, address, phone, updated_at, created_at) 
VALUES 
('Juan', 'Calle 123', '123456789', '2024-03-07 12:00:00', '2024-03-07 12:00:00'),
('María', 'Avenida 456', '987654321', '2024-03-07 12:00:00', '2024-03-07 12:00:00');

-- Inserción de registros de ejemplo en la tabla Inmuebles
ALTER TABLE Inmuebles
ADD COLUMN Ciudad VARCHAR(255) NOT NULL;

-- Inserción de registros de ejemplo en la tabla Inmuebles con la nueva columna Ciudad
INSERT INTO Inmuebles (ID, Direccion, NumeroHabitaciones, TipoPropiedad, CostoMensual, Ciudad) 
VALUES 
(3, 'Calle Principal 789', 4, 'Casa', 1800.00, 'Ciudad Ejemplo'),
(4, 'Avenida Secundaria 012', 2, 'Apartamento', 1000.00, 'Otra Ciudad');


-- Inserción de registros de ejemplo en la tabla ArriendoPropiedades
INSERT INTO ArriendoPropiedades (ID, FechaInicio, Duracion, InmuebleID, usuarioID, MontoMensual) 
VALUES 
(7, '2024-03-01', 12, 3, 1, 1500.00),
(3, '2024-03-05', 6, 4, 2, 1200.00);

-- Inserción de registros de ejemplo en la tabla ControlPagos
INSERT INTO ControlPagos (ID, ArriendoID, FechaPago, MontoPagado) 
VALUES 
(1, 1, '2024-03-05', 1500.00),
(2, 2, '2024-03-10', 1200.00);




DELIMITER //
CREATE PROCEDURE ConsultarDisponibilidad(IN ciudad_param VARCHAR(255))
BEGIN
    SELECT ID, Direccion, NumeroHabitaciones, TipoPropiedad, CostoMensual
    FROM Inmuebles
    WHERE Ciudad = ciudad_param
    AND ID NOT IN (
        SELECT InmuebleID
        FROM ArriendoPropiedades
        WHERE FechaInicio <= CURRENT_DATE()
        AND CURRENT_DATE() <= DATE_ADD(FechaInicio, INTERVAL Duracion MONTH)
    );
END //
DELIMITER ;
CALL ConsultarDisponibilidad('Ciudad Ejemplo');
SELECT ID, Direccion, NumeroHabitaciones, TipoPropiedad, CostoMensual
FROM Inmuebles
WHERE Ciudad = 'Ciudad Ejemplo';
