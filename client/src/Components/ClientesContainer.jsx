import { useEffect, useState } from "react";
import { getClientes } from "../../asyncMock";
import { Box, Flex, Image } from "@chakra-ui/react";

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
            marginTop="5rem"
            p=".1rem 1rem 1rem 1rem"
        >
            <h2>Los clientes actuales son:</h2>
            <Box>
                {clientes.map((cliente) => (
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        fontSize="1.5rem"
                        p="1rem"
                        key={cliente.id}
                    >
                        {cliente.cliente}{" "}
                        <Image
                            paddingLeft="1rem"
                            maxHeight="60px"
                            maxWidth="250px"
                            src={cliente.img}
                            alt={cliente.cliente}
                        />
                    </Flex>
                ))}
            </Box>
        </Box>
    );
};

export default ClientesContainer;
