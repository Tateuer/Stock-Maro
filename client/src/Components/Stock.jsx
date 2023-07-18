import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  fetchPiezas,
  actualizarCantidadPieza,
} from "../redux/actions/stockActions";
import Search from "./Search";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import Modal from "./Modal";
import UploadImage from "../Cloudinary/Cloudinary";
import Order from "./Order";

export default function Stock() {
  const dispatch = useDispatch();
  const piezas = useSelector((state) => state.piezas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPieza, setSelectedPieza] = useState(null);

  const handlePiezaClick = (pieza) => {
    setSelectedPieza(pieza);
    setIsModalOpen(true);
  };

  const handleIncrement = (piezaId) => {
    const pieza = piezas.find((p) => p.id === piezaId);
    const nuevaCantidad = pieza.cantidad + 1;
    dispatch(actualizarCantidadPieza(piezaId, nuevaCantidad));
  };

  const handleDecrement = (piezaId) => {
    const pieza = piezas.find((p) => p.id === piezaId);
    if (pieza.cantidad > 0) {
      const nuevaCantidad = pieza.cantidad - 1;
      dispatch(actualizarCantidadPieza(piezaId, nuevaCantidad));
    }
  };

  useEffect(() => {
    dispatch(fetchPiezas());
  }, [dispatch]);

  return (
    <Box>
      {/* <UploadImage /> */}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text
          fontWeight={"bold"}
          fontSize={"25px"}
          marginRight={"10px"}
          color={"#0075B7"}
        >
          STOCK
        </Text>
        <Search />
      </Box>
      <Order />
      <Table variant="striped">
        <Thead>
          <Tr color={"black"}>
            <Th padding={"30px"}>ESTANTERÍA</Th>
            <Th padding={"30px"}>ESTANTE</Th>
            <Th padding={"30px"}>POSICIÓN</Th>
            <Th padding={"30px"}>IDENTIFICACIÓN</Th>
            <Th padding={"30px"}>CÓDIGO</Th>
            <Th padding={"30px"}>CANTIDAD</Th>
          </Tr>
        </Thead>
        <Tbody>
          {piezas.map((pieza) => (
            <Tr key={pieza.id}>
              <Td>
                <Text
                  color={"black"}
                  onClick={() => handlePiezaClick(pieza)}
                  style={{ cursor: "pointer" }}
                >
                  {pieza.estanteria}
                </Text>
              </Td>
              <Td
                onClick={() => handlePiezaClick(pieza)}
                style={{ cursor: "pointer" }}
                color={"black"}
              >
                {pieza.estante}
              </Td>
              <Td
                onClick={() => handlePiezaClick(pieza)}
                style={{ cursor: "pointer" }}
                color={"black"}
              >
                {pieza.posicion}
              </Td>
              <Td
                onClick={() => handlePiezaClick(pieza)}
                style={{ cursor: "pointer" }}
                color={"black"}
              >
                {pieza.identificacion}
              </Td>
              <Td
                onClick={() => handlePiezaClick(pieza)}
                style={{ cursor: "pointer" }}
                color={"black"}
              >
                {pieza.nombre}
              </Td>
              <Td>
                <Button
                  bg={"#0075B7"}
                  size={"sm"}
                  onClick={() => handleDecrement(pieza.id)}
                >
                  -
                </Button>
                <Text
                  color={"black"}
                  fontWeight={"bold"}
                  display="inline"
                  paddingX="10px"
                >
                  {pieza.cantidad}
                </Text>
                <Button
                  bg={"#0075B7"}
                  size={"sm"}
                  onClick={() => handleIncrement(pieza.id)}
                >
                  +
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {isModalOpen && (
        <Modal pieza={selectedPieza} onClose={() => setIsModalOpen(false)} />
      )}
    </Box>
  );
}
