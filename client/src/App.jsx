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

function App() {
  return (
    <Box bg="white" p="8rem" borderRadius="1rem">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/stock" element={<Stock />} />
          <Route path="/cargarpieza" element={<PiezaForm />} />
          <Route path="/clientes" element={<ClientesContainer />} />
          <Route path="/consumibles" element={<ConsumiblesContainer />} />
          <Route path="/piezaseguridad" element={<PiezaSeguridad />} />
          <Route path="/cilindros" element={<Cilindros />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
