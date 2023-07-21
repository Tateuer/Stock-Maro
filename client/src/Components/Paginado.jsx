import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Button
        bg={"#0075B7"}
        onClick={onPrev}
        disabled={currentPage === 1}
        style={{ fontSize: "15px", padding: "6px 10px" }}
      >
        Anterior
      </Button>
      <Text mx={4} color={"black"}>
        Página {currentPage} de {totalPages}
      </Text>
      <Button
        bg={"#0075B7"}
        onClick={onNext}
        disabled={currentPage >= totalPages}
        style={{ fontSize: "15px", padding: "6px 10px" }}
      >
        Siguiente
      </Button>
    </Box>
  );
};

export default Pagination;
