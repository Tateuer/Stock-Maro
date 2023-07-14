import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchPiezas } from "../redux/actions/stockActions";
import Search from "./Search";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
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
