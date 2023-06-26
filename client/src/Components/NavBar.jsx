import { Link } from "react-router-dom";
import { Box, Menu } from "@chakra-ui/react";
import LogoMaro from "../assets/logoMaro.png";
import { Image } from "@chakra-ui/react";

const NavBar = () => {
    return (
        <Box>
            <Link to="/">
                <Image paddingBottom="2rem" src={LogoMaro} alt="Maro S.A" />
            </Link>
            <Menu>
                <Box fontSize="1.4rem">
                    <Link to="/cargarpieza">Cargar pieza</Link>
                    <Link to="/piezafaltante">Piezas faltantes</Link>
                    <Link to="/qr">QRs</Link>
                </Box>
                <Box fontSize="1.4rem">
                    <Link to="/cilindros">Cilindros</Link>
                    <Link to="/consumibles">Consumibles</Link>
                    <Link to="/piezaseguridad">Piezas de seguridad</Link>
                    <Link to="/clientes">Clientes</Link>
                </Box>
            </Menu>
        </Box>
    );
};

export default NavBar;
