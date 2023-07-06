import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Grid, GridItem, Menu } from "@chakra-ui/react";
import LogoMaro from "../assets/logoMaro.png";
import { Image } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const NavBar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowNavbar(location.pathname === "/");
  }, [location.pathname]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <GridItem>
        <Link to="/">
          <Image
            marginTop="-5rem"
            paddingBottom="2rem"
            gridArea={"logo"}
            src={LogoMaro}
            alt="Maro S.A"
          />
        </Link>
      </GridItem>
      {location.pathname !== "/" && (
        <Button fontSize="20px" onClick={handleGoBack}>
          Atrás
        </Button>
      )}
      {location.pathname !== "/cargarpieza" &&
      location.pathname !== "/piezafaltante" &&
      location.pathname !== "/cilindros" &&
      location.pathname !== "/consumibles" &&
      location.pathname !== "/piezaseguridad" &&
      location.pathname !== "/qr" &&
      location.pathname !== "/stock" &&
      location.pathname !== "/clientes" ? (
        <Menu>
          <Grid
            templateRows={"repeat(3, 1fr)"}
            templateColumns={"repeat(2, 1fr)"}
            fontSize="1.4rem"
          >
            <Link to="/cargarpieza">Cargar pieza</Link>
            <Link to="/piezafaltante">Piezas faltantes</Link>
            <Link to="/cilindros">Cilindros</Link>
            <Link to="/consumibles">Consumibles</Link>
            <Link to="/piezaseguridad">Piezas de seguridad</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/stock">Stock</Link>
            <Link to="/qr">QRs</Link>
          </Grid>
        </Menu>
      ) : null}
    </Box>
  );
};

export default NavBar;
