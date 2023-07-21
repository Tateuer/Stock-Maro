import { Box, Text, Td, Button } from "@chakra-ui/react";

export default function Modal({ pieza, onClose }) {
  if (!pieza) {
    return null; // No renderizar el modal si pieza es null
  }

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
        <Text color={"black"}>Cantidad:{pieza.cantidad}</Text>
        <Button bg={"#0075B7"} m={"10px"} fontSize="15px">
          Descargar Archivo
        </Button>
        <Button bg={"#0075B7"} onClick={onClose}>
          Cerrar
        </Button>
      </Box>
    </Box>
  );
}
