import { useEffect, useState } from "react";
import { getClientes } from "../asyncMock";
import { Box, Center, Flex, Grid, Image, Text } from "@chakra-ui/react";

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
            borderRadius="1rem"
            marginTop="1rem"
            p=".1rem 1rem 1rem 1rem"
        >
            <Text
                fontWeight={"bold"}
                fontSize={"25px"}
                marginRight={"10px"}
                color={"#0075B7"}
            >
                CLIENTES DE MARO
            </Text>
            <Grid
                gridTemplateRows={"1fr 1fr 1fr 1fr"}
                gridTemplateColumns={"1fr 1fr"}
            >
                {clientes.map((cliente) => (
                    <Flex
                        key={cliente.id}
                        justifyContent="space-between"
                        alignItems="center"
                        margin="1.3rem 1.3rem"
                    >
                        <Text color={"#0075B7"} fontSize="1.5rem">
                            {cliente.cliente}
                        </Text>
                        <Image
                            maxHeight="70px"
                            maxWidth="150px"
                            paddingLeft="4rem"
                            src={cliente.img}
                            alt={cliente.cliente}
                        />
                    </Flex>
                ))}
            </Grid>
        </Box>
    );
};

export default ClientesContainer;
