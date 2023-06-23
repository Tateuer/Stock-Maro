import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientesContainer from "./Components/ClientesContainer.jsx/ClientesContainer";
import ConsumiblesContainer from "./Components/ConsumiblesContainer/ConsumiblesContainer";
import { Box } from "@chakra-ui/react";

function App() {
    return (
        <Box bg="white" p="8rem" borderRadius="1rem">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/clientes" element={<ClientesContainer />} />
                    <Route
                        path="/consumibles"
                        element={<ConsumiblesContainer />}
                    />
                </Routes>
            </BrowserRouter>
        </Box>
    );
}

export default App;
