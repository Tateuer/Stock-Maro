import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPiezas } from "../redux/actions/stockActions";
import { Box, Button, Input } from "@chakra-ui/react";

export default function Search() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchPiezas(search));
  }

  function handleChange(e) {
    setSearch(e.target.value.toLowerCase());
  }

  return (
    <Box>
      <Input
        type="text"
        onChange={handleChange}
        value={search}
        placeholder="Nombre de la pieza"
      />
      <Button onClick={handleSubmit}>Buscar</Button>
    </Box>
  );
}
