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
import Pagination from "./Paginado";
import Order from "./Order";

export default function Stock() {
    const dispatch = useDispatch();
    const piezas = useSelector((state) => state.piezas);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPieza, setSelectedPieza] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const sortedPiezas = [...piezas].sort((a, b) => {
        if (a.estanteria !== b.estanteria) {
            return a.estanteria - b.estanteria;
        }
        if (a.estante !== b.estante) {
            return a.estante - b.estante;
        }
        if (a.posicion !== b.posicion) {
            return a.posicion - b.posicion;
        }
        if (a.identificacion !== b.identificacion) {
            return a.identificacion.localeCompare(b.identificacion);
        }
        return 0;
    });

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
    const piezasToShow = sortedPiezas.slice(startIndex, endIndex);

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
                    STOCK
                </Text>
                <Search />
            </Box>
            <Order />
            <Table variant="striped" p={"-3rem"}>
                <Thead>
                    <Tr color={"black"}>
                        <Th padding={"1rem"}>ESTANTERÍA</Th>
                        <Th padding={"1rem"}>ESTANTE</Th>
                        <Th padding={"1rem"}>POSICIÓN</Th>
                        <Th padding={"1rem"}>IDENTIFICACIÓN</Th>
                        <Th padding={"1rem"}>CÓDIGO</Th>
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
                <Modal
                    pieza={selectedPieza}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </Box>
    );
}
