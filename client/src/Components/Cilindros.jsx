import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPiezas } from "../redux/actions/stockActions";
import Search from "./Search";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function Cilindros() {
    const dispatch = useDispatch();
    const piezas = useSelector((state) => state.piezas);

    useEffect(() => {
        dispatch(fetchPiezas());
    }, [dispatch]);

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
                    CILINDROS
                </Text>
                <Search />
            </Box>
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
                    {piezas
                        .filter((pieza) =>
                            pieza.nombre.toLowerCase().startsWith("cilindro")
                        )
                        .sort((a, b) =>
                            a.identificacion.localeCompare(b.identificacion)
                        )
                        .sort(
                            (a, b) =>
                                parseInt(a.posicion) - parseInt(b.posicion)
                        )
                        .sort(
                            (a, b) => parseInt(a.estante) - parseInt(b.estante)
                        )
                        .map((pieza) => (
                            <Tr key={pieza.id}>
                                <Td>
                                    <Text color={"black"}>
                                        {pieza.estanteria}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text color={"black"}>{pieza.estante}</Text>
                                </Td>
                                <Td>
                                    <Text color={"black"}>
                                        {pieza.posicion}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text color={"black"}>
                                        {pieza.identificacion}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text color={"black"}>{pieza.nombre}</Text>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
        </Box>
    );
}
