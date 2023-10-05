import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientesContainer from "./Components/ClientesContainer";
import ConsumiblesContainer from "./Components/ConsumiblesContainer";
import { Box } from "@chakra-ui/react";
import Stock from "./Components/Stock";
import PiezaSeguridad from "./Components/PiezaSeguridad";
import Cilindros from "./Components/Cilindros";
import PiezaForm from "./Components/CargarPieza";
import QrModificar from "./Components/QrModificar";
import PiezaFaltante from "./Components/PiezaFaltante";

function App() {
    return (
        <Box
            bg="white"
            p="6rem 1rem 2rem 1rem"
            borderRadius="1rem"
            display={"flex"}
            flexDirection={"column"}
            z-zIndex={"2000"}
        >
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/stock" element={<Stock />} />
                    <Route path="/cargarpieza" element={<PiezaForm />} />
                    <Route path="/clientes" element={<ClientesContainer />} />
                    <Route
                        path="/consumibles"
                        element={<ConsumiblesContainer />}
                    />
                    <Route
                        path="/piezaseguridad"
                        element={<PiezaSeguridad />}
                    />
                    <Route path="/cilindros" element={<Cilindros />} />
                    <Route path="/qr" element={<QrModificar />} />
                    <Route path="/piezafaltante" element={<PiezaFaltante />} />
                </Routes>
            </BrowserRouter>
        </Box>
    );
}

export default App;
