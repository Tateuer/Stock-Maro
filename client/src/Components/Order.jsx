import React from "react";
import { useDispatch } from "react-redux";
import { orderEstanteria } from "../redux/actions/stockActions";
import { Box, Select } from "@chakra-ui/react";

const Order = (props) => {
  const dispatch = useDispatch();

  function handleEstaneria(e) {
    e.preventDefault();
    dispatch(orderEstanteria(e.target.value));
  }

  return (
    <Box>
      <Select
        bg={"#0075B7"}
        m={"10px"}
        fontSize="17px"
        borderRadius={"4px"}
        onChange={handleEstaneria}
      >
        <option value="all">TODOS</option>
        <option value="1">ESTANTERIA 1</option>
        <option value="2">ESTANTERIA 2 </option>
        <option value="3">ESTANTERIA 3</option>
        <option value="4">ESTANTERIA 4</option>
        <option value="5">ESTANTERIA 5</option>
        <option value="6">ESTANTERIA 6</option>
        <option value="7">ESTANTERIA 7</option>
      </Select>
    </Box>
  );
};

export default Order;
