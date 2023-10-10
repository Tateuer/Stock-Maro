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
                color={"black"}
                bg={"white"}
                h={"20px"}
                w={"200px"}
                borderRadius={"4px"}
                type="text"
                onChange={handleChange}
                value={search}
                placeholder="Código"
            />
            <Button
                bg={"#0075B7"}
                m={"10px"}
                fontSize="15px"
                onClick={handleSubmit}
            >
                Buscar
            </Button>
        </Box>
    );
}
