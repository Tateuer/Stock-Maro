import { Box, Grid } from "@chakra-ui/react";
import { getConsumibles } from "../asyncMock";
import { useEffect, useState } from "react";

const ConsumiblesContainer = () => {
    const [consumibles, setConsumibles] = useState([]);

    useEffect(() => {
        const fetchConsumibles = async () => {
            try {
                const consumiblesData = await getConsumibles();
                setConsumibles(consumiblesData);
            } catch (error) {
                console.error("Error al obtener los consumibles", error);
            }
        };
        fetchConsumibles();
    }, []);

    return (
        <Box>
            <h2>Consumibles</h2>
            <Box>
                {consumibles.map((consumible) => (
                    <Grid key={consumible.id}> {consumible.detalle} </Grid>
                ))}
            </Box>
        </Box>
    );
};

export default ConsumiblesContainer;
