import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPiezas } from "../redux/actions/stockActions";
import Search from "./Search";
import { Box, Text } from "@chakra-ui/react";

export default function Stock() {
  const dispatch = useDispatch();
  const piezas = useSelector((state) => state.piezas);

  useEffect(() => {
    dispatch(fetchPiezas());
  }, [dispatch]);

  //console.log("hola", piezas);

  return (
    <Box>
      <Search />
      <ul>
        {piezas.map((pieza) => (
          <li key={pieza.id}>
            <Text color={"black"}>Nombre: {pieza.nombre}</Text>
            <Text color={"black"}>
              Pieza de seguridad: {pieza.piezaSeguridad}
            </Text>
            <Text color={"black"}>Clientes: {pieza.clientes}</Text>
            <img src={pieza.img} alt="Imagen de la pieza" />
          </li>
        ))}
      </ul>
    </Box>
  );
}
