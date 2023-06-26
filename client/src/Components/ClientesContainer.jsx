import { useEffect, useState } from "react";
import { getClientes } from "../asyncMock";
import { Box, Grid, Image } from "@chakra-ui/react";

const ClientesContainer = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const clientesData = await getClientes();
                setClientes(clientesData);
            } catch (error) {
                console.error("Error al obtener los clientes", error);
            }
        };

        fetchClientes();
    }, []);

    return (
        <Box
            border="2px"
            bg="#00B0F0"
            borderRadius="1rem"
            marginTop="1rem"
            p=".1rem 1rem 1rem 1rem"
        >
            <h2>CLIENTES DE MARO</h2>
            <Box>
                {clientes.map((cliente) => (
                    <Grid
                        key={cliente.id}
                        justifyContent="center"
                        alignItems="center"
                        fontSize="1.5rem"
                        p="1rem"
                        templateRows={"repeat(3, 1fr)"}
                        templateColumns={"repeat(2, 1fr)"}
                    >
                        {cliente.cliente}{" "}
                        <Image
                            paddingLeft="1rem"
                            maxHeight="60px"
                            maxWidth="250px"
                            src={cliente.img}
                            alt={cliente.cliente}
                        />
                    </Grid>
                ))}
            </Box>
        </Box>
    );
};

export default ClientesContainer;
