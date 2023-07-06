import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchPiezas } from "../redux/actions/stockActions";
import Search from "./Search";
import { Box, Text } from "@chakra-ui/react";
import Modal from "./Modal";

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
      <Search />
      <ul>
        {piezas.map((pieza) => (
          <li key={pieza.id}>
            <Text
              color={"black"}
              onClick={() => handlePiezaClick(pieza)}
              style={{ cursor: "pointer" }}
            >
              {pieza.nombre}
            </Text>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <Modal pieza={selectedPieza} onClose={() => setIsModalOpen(false)} />
      )}
    </Box>
  );
}
