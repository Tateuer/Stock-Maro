import React, { useState, useRef } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import UploadImage from "../Cloudinary/Cloudinary";
import Select from "react-select";
import UploadFile from "./UploadFile";
import Swal from "sweetalert2";

const PiezaForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    estanteria: "",
    estante: "",
    posicion: "",
    identificacion: "",
    piezaSeguridad: "",
    clientes: "",
    img: "",
    archivo: "",
    cantidad: "",
  });

  const fileUploadRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [resetUploadImage, setResetUploadImage] = useState(false);
  const [resetUploadFile, setResetUploadFile] = useState(false);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #0075B7" : "1px solid #CBD5E0",
      boxShadow: state.isFocused ? "0 0 0 1px #0075B7" : "none",
      "&:hover": {
        border: state.isFocused ? "1px solid #0075B7" : "1px solid #CBD5E0",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#0075B7" : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue = name === "identificacion" ? value.toUpperCase() : value;

    setFormData({ ...formData, [name]: newValue });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.nombre.trim() === "") {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (formData.estanteria < 1 || formData.estanteria > 7) {
      newErrors.estanteria = "La estantería debe ser entre 1 y 7";
    }

    if (formData.estante < 1 || formData.estante > 4) {
      newErrors.estante = "El estante debe estar entre 1 y 4";
    }

    if (
      formData.posicion.trim() === "" ||
      formData.posicion < 1 ||
      formData.posicion > 50
    ) {
      newErrors.posicion = "La posición debe estar entre 1 y 50";
    }

    if (
      formData.identificacion.trim().length !== 1 ||
      !/^[A-Z]$/i.test(formData.identificacion.trim())
    ) {
      newErrors.identificacion =
        "La identificación debe ser una sola letra de la A a la Z";
    }

    if (!["si", "no"].includes(formData.piezaSeguridad)) {
      newErrors.piezaSeguridad = "Debe seleccionar 'si' o 'no'";
    }

    if (
      ![
        "TOYOTA",
        "VOLVO",
        "GUIDI",
        "HONDA",
        "METALSA",
        "TBA",
        "VOLKSWAGEN",
        "MERCEDEZ BENZ",
        "CILINDROS MARO",
      ].includes(formData.clientes)
    ) {
      newErrors.clientes = "Debe seleccionar un cliente válido";
    }

    if (formData.cantidad <= 0) {
      newErrors.cantidad = "La cantidad debe ser mayor a 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUploadImage = (url) => {
    setFormData({ ...formData, img: url });
  };

  const handleFileChange = (url) => {
    console.log("asd", fileUploadRef.current.files[0]);
  };

  const handleFileUpload = async (file) => {
    const data = new FormData();

    data.append("file", file);
    try {
      const res = await fetch(`http://localhost:3001/uploadFile`, {
        method: "POST",
        body: data,
      });
      const response = await res.json();
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const file = fileUploadRef.current.files[0];
      let fileUpload = null;
      if (file) {
        fileUpload = await handleFileUpload(file);
      }
      const response = await axios.post(`http://localhost:3001/piezas`, {
        ...formData,
        archivo: fileUpload ? fileUpload.url : "",
      });

      setFormData({
        nombre: "",
        estanteria: "",
        estante: "",
        posicion: "",
        identificacion: "",
        piezaSeguridad: "",
        clientes: "",
        img: "",
        archivo: "",
        cantidad: "",
      });
      setResetUploadImage(!resetUploadImage);
      setResetUploadFile(!resetUploadFile);
      Swal.fire("Pieza creada", "Bien hecho!", "success");
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex>
      <form onSubmit={handleSubmit}>
        <Grid
          templateAreas={`"nombre nombre"
                                    "estanteria estante"
                                    "posicion identificacion"
                                    "cantidad cantidad"
                                    "ps cliente"
                                    "img img"
                                    "archivo archivo"
                                    "crearpieza crearpieza"`}
          gridTemplateRows={"1fr 1fr 1fr 1fr 1fr 1fr 1fr"}
          gridTemplateColumns={"1fr 1fr"}
        >
          <GridItem area={"nombre"}>
            <FormControl id="nombre" marginTop="3rem" marginBottom="1rem">
              <FormLabel color={"black"} textAlign="center" fontSize="1.2em">
                Nombre
              </FormLabel>
              <Input
                color={"black"}
                bg={"white"}
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                p=".5em"
                fontSize="1.4em"
                textAlign="center"
              />
              {errors.nombre && <Box color="red">{errors.nombre}</Box>}
            </FormControl>
          </GridItem>
          <GridItem area={"estanteria"}>
            <FormControl id="estanteria" margin="1rem">
              <FormLabel color={"black"} textAlign="center" fontSize="1.2em">
                Estantería
              </FormLabel>
              <Input
                color={"black"}
                bg={"white"}
                type="tex"
                name="estanteria"
                value={formData.estanteria}
                placeholder="0"
                onChange={handleChange}
                p=".5em"
                fontSize="1.4em"
                textAlign="center"
              />
              {errors.estanteria && <Box color="red">{errors.estanteria}</Box>}
            </FormControl>
          </GridItem>
          <GridItem area={"estante"}>
            <FormControl id="estante" margin="1rem">
              <FormLabel color={"black"} textAlign="center" fontSize="1.2em">
                Estante
              </FormLabel>
              <Input
                color={"black"}
                bg={"white"}
                type="text"
                name="estante"
                value={formData.estante}
                placeholder="0"
                onChange={handleChange}
                p=".5em"
                fontSize="1.4em"
                textAlign="center"
              />
              {errors.estante && <Box color="red">{errors.estante}</Box>}
            </FormControl>
          </GridItem>
          <GridItem area={"posicion"}>
            <FormControl id="posicion">
              <FormLabel color={"black"} textAlign="center" fontSize="1.2em">
                Posición
              </FormLabel>
              <Input
                color={"black"}
                bg={"white"}
                type="text"
                name="posicion"
                value={formData.posicion}
                placeholder="0"
                onChange={handleChange}
                p=".5em"
                fontSize="1.4em"
                textAlign="center"
              />
              {errors.posicion && <Box color="red">{errors.posicion}</Box>}
            </FormControl>
          </GridItem>
          <GridItem area={"identificacion"}>
            <FormControl id="identificacion">
              <FormLabel color={"black"} textAlign="center" fontSize="1.2em">
                Identificación
              </FormLabel>
              <Input
                color={"black"}
                bg={"white"}
                type="text"
                name="identificacion"
                value={formData.identificacion}
                onChange={handleChange}
                p=".5em"
                fontSize="1.4em"
                textAlign="center"
              />
              {errors.identificacion && (
                <Box color="red">{errors.identificacion}</Box>
              )}
            </FormControl>
          </GridItem>
          <GridItem area={"cantidad"}>
            <FormControl id="cantidad" margin="-1rem">
              <FormLabel color={"black"} textAlign="center" fontSize="1.2em">
                Cantidad
              </FormLabel>
              <Input
                color={"black"}
                bg={"white"}
                type="text"
                name="cantidad"
                placeholder="0"
                value={formData.cantidad}
                onChange={handleChange}
                p=".5em"
                fontSize="1.4em"
                textAlign="center"
              />
              {errors.cantidad && <Box color="red">{errors.cantidad}</Box>}
            </FormControl>
          </GridItem>
          <GridItem area={"ps"}>
            <FormControl
              id="piezaSeguridad"
              margin="-1rem 1rem"
              fontSize="1.2em"
            >
              <FormLabel color={"black"} textAlign="center">
                Pieza de Seguridad
              </FormLabel>
              <Select
                name="piezaSeguridad"
                value={{
                  value: formData.piezaSeguridad,
                  label: formData.piezaSeguridad,
                }}
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    piezaSeguridad: selectedOption.value,
                  })
                }
                options={[
                  { value: "si", label: "Sí" },
                  { value: "no", label: "No" },
                ]}
                styles={customStyles}
              />
              {errors.piezaSeguridad && (
                <Box color="red">{errors.piezaSeguridad}</Box>
              )}
            </FormControl>
          </GridItem>
          <GridItem area={"cliente"} fontSize="1.2em">
            <FormControl id="clientes" margin="-1rem 1rem">
              <FormLabel color={"black"} textAlign="center">
                Cliente
              </FormLabel>
              <Select
                name="clientes"
                value={{
                  value: formData.clientes,
                  label: formData.clientes,
                }}
                onCh
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    clientes: selectedOption.value,
                  })
                }
                options={[
                  { value: "TOYOTA", label: "TOYOTA" },
                  { value: "VOLVO", label: "VOLVO" },
                  { value: "GUIDI", label: "GUIDI" },
                  { value: "HONDA", label: "HONDA" },
                  { value: "METALSA", label: "METALSA" },
                  { value: "TBA", label: "TBA" },
                  {
                    value: "VOLKSWAGEN",
                    label: "VOLKSWAGEN",
                  },
                  {
                    value: "MERCEDEZ BENZ",
                    label: "MERCEDEZ BENZ",
                  },
                  {
                    value: "CILINDROS MARO",
                    label: "CILINDROS MARO",
                  },
                ]}
                styles={customStyles}
              />

              {errors.clientes && <Box color="red">{errors.clientes}</Box>}
            </FormControl>
          </GridItem>
          <GridItem value={formData.img} area={"img"} margin="-1rem">
            <UploadImage
              onUpload={handleUploadImage}
              onChange={handleChange}
              resetImg={() => setResetUploadImage(false)}
              key={resetUploadImage}
            />
          </GridItem>
          <GridItem value={formData.archivo} area={"archivo"}>
            <UploadFile
              onUpload={handleFileChange}
              onChange={handleChange}
              resetFile={() => setResetUploadFile(false)}
              key={resetUploadFile}
              fileUploadRef={fileUploadRef}
            />
          </GridItem>
          <GridItem area={"crearpieza"}>
            <Button mt={4} bg={"#0075B7"} type="submit">
              Crear Pieza
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Flex>
  );
};

export default PiezaForm;
