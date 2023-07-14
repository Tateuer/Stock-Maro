import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchPiezas } from "../redux/actions/stockActions";
import Search from "./Search";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Modal from "./Modal";
import UploadImage from "../Cloudinary/Cloudinary";
import Order from "./Order";

export default function PiezaSeguridad() {
  const dispatch = useDispatch();
  const piezas = useSelector((state) => state.piezas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPieza, setSelectedPieza] = useState(null);

  const piezasSeguridad = piezas.filter(
    (pieza) => pieza.piezaSeguridad === "si"
  );

  const handlePiezaClick = (pieza) => {
    setSelectedPieza(pieza);
    setIsModalOpen(true);
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
          PIEZAS DE SEGURIDAD
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
            <Th padding={"30px"}>CLIENTES</Th>
          </Tr>
        </Thead>
        <Tbody>
          {piezasSeguridad.map((pieza) => (
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
              <Td>
                <Text
                  color={"black"}
                  onClick={() => handlePiezaClick(pieza)}
                  style={{ cursor: "pointer" }}
                >
                  {pieza.estante}
                </Text>
              </Td>
              <Td>
                <Text
                  color={"black"}
                  onClick={() => handlePiezaClick(pieza)}
                  style={{ cursor: "pointer" }}
                >
                  {pieza.posicion}
                </Text>
              </Td>
              <Td>
                <Text
                  color={"black"}
                  onClick={() => handlePiezaClick(pieza)}
                  style={{ cursor: "pointer" }}
                >
                  {pieza.identificacion}
                </Text>
              </Td>
              <Td>
                <Text
                  color={"black"}
                  onClick={() => handlePiezaClick(pieza)}
                  style={{ cursor: "pointer" }}
                >
                  {pieza.nombre}
                </Text>
              </Td>
              <Td color={"black"}>{pieza.clientes}</Td>
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
