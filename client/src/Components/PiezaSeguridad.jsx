import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchPiezas } from "../redux/actions/stockActions";
import Search from "./Search";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Modal from "./Modal";
import Pagination from "./Paginado";
import Order from "./Order";

export default function PiezaSeguridad() {
    const dispatch = useDispatch();
    const piezas = useSelector((state) => state.piezas);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPieza, setSelectedPieza] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(fetchPiezas());
    }, [dispatch]);

    const piezasSeguridad = piezas.filter(
        (pieza) => pieza.piezaSeguridad === "si"
    );

    const piezasPorClientes = {};
    piezasSeguridad.forEach((pieza) => {
        if (!piezasPorClientes[pieza.clientes]) {
            piezasPorClientes[pieza.clientes] = [];
        }
        piezasPorClientes[pieza.clientes].push(pieza);
    });

    const sortedPiezas = Object.values(piezasPorClientes).map((piezasCliente) =>
        piezasCliente
            .sort((a, b) => a.identificacion.localeCompare(b.identificacion))
            .sort((a, b) => parseInt(a.posicion) - parseInt(b.posicion))
            .sort((a, b) => parseInt(a.estante) - parseInt(b.estante))
            .sort((a, b) => a.estanteria - b.estanteria)
    );

    // Ordenar los grupos de piezas por cliente
    sortedPiezas.sort((a, b) => {
        const clienteA = a[0].clientes.toUpperCase();
        const clienteB = b[0].clientes.toUpperCase();
        return clienteA.localeCompare(clienteB);
    });

    const totalPages = Math.ceil(sortedPiezas.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const piezasToShow = sortedPiezas.slice(startIndex, endIndex).flat();

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePiezaClick = (pieza) => {
        setSelectedPieza(pieza);
        setIsModalOpen(true);
    };

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
                    PIEZAS DE SEGURIDAD
                </Text>
                <Search />
            </Box>
            <Order />
            <Table variant="striped">
                <Thead>
                    <Tr color={"black"}>
                        <Th padding={".5rem"}>ESTANTERÍA</Th>
                        <Th padding={".5rem"}>ESTANTE</Th>
                        <Th padding={".5rem"}>POSICIÓN</Th>
                        <Th padding={".5rem"}>IDENTIFICACIÓN</Th>
                        <Th padding={".5rem"}>CÓDIGO</Th>
                        <Th padding={".5rem"}>CLIENTES</Th>
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
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
            />

            {isModalOpen && (
                <Modal
                    pieza={selectedPieza}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </Box>
    );
}
