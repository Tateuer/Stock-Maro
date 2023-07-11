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
      <Search />
      <Order />
      <Table variant="striped">
        <Thead>
          <Tr color={"black"}>
            <Th padding={"30px"}>CÓDIGO</Th>
            <Th padding={"30px"}>PIEZA DE SEGURIDAD</Th>
            <Th padding={"30px"}>CLIENTES</Th>
            <Th padding={"30px"}>IMAGEN</Th>
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
                  {pieza.nombre}
                </Text>
              </Td>
              <Td color={"black"}>{pieza.piezaSeguridad.toUpperCase()}</Td>
              <Td color={"black"}>{pieza.clientes}</Td>
              <Td
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {pieza.img && (
                  <img src={pieza.img} alt={pieza.nombre} width={"60px"} />
                )}
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
