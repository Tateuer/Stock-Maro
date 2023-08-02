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
import Pagination from "./Paginado";
import Order from "./Order";
import ModalQr from "./ModalQr";

export default function QrModificar() {
  const dispatch = useDispatch();
  const piezas = useSelector((state) => state.piezas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPieza, setSelectedPieza] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePiezaClick = (pieza) => {
    setSelectedPieza(pieza);
    setIsModalOpen(true);
  };

  const getPaginationRange = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return [startIndex, endIndex];
  };

  const [startIndex, endIndex] = getPaginationRange();
  const piezasToShow = piezas.slice(startIndex, endIndex);

  const handleIncrement = (piezaId) => {
    const nuevaCantidad = selectedPieza.cantidad + 1;
    dispatch(actualizarCantidadPieza(piezaId, nuevaCantidad));
  };

  const handleDecrement = (piezaId) => {
    if (selectedPieza.cantidad > 0) {
      const nuevaCantidad = selectedPieza.cantidad - 1;
      dispatch(actualizarCantidadPieza(piezaId, nuevaCantidad));
    }
  };

  useEffect(() => {
    dispatch(fetchPiezas());
  }, [dispatch]);

  useEffect(() => {
    setTotalPages(Math.ceil(piezas.length / 10));
  }, [piezas]);

  return (
    <Box>
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
          MODIFICAR PIEZA
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
            <Th padding={"30px"}>IDENTIF.</Th>
            <Th padding={"30px"}>CÓDIGO</Th>
            <Th padding={"30px"}>CANTIDAD</Th>
          </Tr>
        </Thead>
        <Tbody>
          {piezasToShow.map((pieza) => (
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
                <Text
                  color={"black"}
                  fontWeight={"bold"}
                  display="inline"
                  paddingX="10px"
                >
                  {pieza.cantidad}
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((prevPage) => prevPage - 1)}
        onNext={() => setCurrentPage((prevPage) => prevPage + 1)}
      />

      {isModalOpen && (
        <ModalQr
          pieza={selectedPieza}
          onClose={() => setIsModalOpen(false)}
          handleIncrement={() => handleIncrement(selectedPieza.id)}
          handleDecrement={() => handleDecrement(selectedPieza.id)}
          currentQuantity={selectedPieza.cantidad}
        />
      )}
    </Box>
  );
}