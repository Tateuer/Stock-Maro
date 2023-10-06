import { Box, Grid, Text } from "@chakra-ui/react";
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
      <Text
        fontWeight={"bold"}
        fontSize={"25px"}
        marginRight={"10px"}
        color={"#0075B7"}
      >
        CONSUMIBLES
      </Text>{" "}
      <Box>
        {consumibles.map((consumible) => (
          <Grid
            color={"black"}
            fontSize="1.1rem"
            p="1rem"
            borderBottom="1px solid #808080"
            key={consumible.id}
          >
            {" "}
            {consumible.detalle.toUpperCase()}{" "}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default ConsumiblesContainer;
