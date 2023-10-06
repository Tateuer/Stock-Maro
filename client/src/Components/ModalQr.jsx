import { Box, Text, Td, Button } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { actualizarCantidadPieza } from "../redux/actions/stockActions";
import Swal from "sweetalert2";

export default function ModalQr({ pieza, onClose, onSave }) {
  if (!pieza) {
    return null; // No renderizar el modal si pieza es null
  }

  const dispatch = useDispatch();
  const [cantidadActualizada, setCantidadActualizada] = useState(
    pieza.cantidad
  );

  const handleChange = (e) => {
    setCantidadActualizada(e.target.value);
  };

  const handleGuardar = () => {
    try {
      dispatch(actualizarCantidadPieza(pieza.id, cantidadActualizada));
      Swal.fire({
        icon: "success",
        title: "Guardado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();
    } catch (error) {
      console.log("No se pudo actualizar");
    }
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      background="rgba(0, 0, 0, 0.5)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="9999"
    >
      <Box width="400px" background="#fff" padding="20px" borderRadius="4px">
        <Text
          color={"black"}
          fontSize="20px"
          fontWeight="bold"
          marginBottom="10px"
        >
          Detalles de la pieza
        </Text>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {pieza.img && (
            <img src={pieza.img} alt={pieza.nombre} width={"100px"} />
          )}
        </Box>
        <Text color={"black"}>Codigo: {pieza.nombre}</Text>
        <Text color={"black"}>Estantería: {pieza.estanteria}</Text>
        <Text color={"black"}>Estante: {pieza.estante}</Text>
        <Text color={"black"}>Posición: {pieza.posicion}</Text>
        <Text color={"black"}>Identificación: {pieza.identificacion}</Text>
        <Text color={"black"}>Cliente: {pieza.clientes}</Text>
        <Text color={"black"}>
          Cantidad:
          <Input
            color="black"
            bg="white"
            type="number"
            name="nombre"
            value={cantidadActualizada}
            onChange={handleChange}
            variant="outline"
            borderRadius={"5px"}
            textAlign="center"
            borderColor="#0075B7"
            _hover={{ borderColor: "#0075B7" }}
            width={"60px"}
            fontSize="1.4rem"
          />
        </Text>
        <Button bg={"#0075B7"} onClick={onClose}>
          Cerrar
        </Button>
        <Button bg={"#0075B7"} m={"10px"} fontSize="15px">
          Descargar Archivo
        </Button>
        <Button
          bg={"#0075B7"}
          m={"10px"}
          fontSize="15px"
          onClick={handleGuardar}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
}
