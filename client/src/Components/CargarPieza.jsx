import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import axios from "axios";
import UploadImage from "../Cloudinary/Cloudinary";
import Select from "react-select";

const PiezaForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    estanteria: 0,
    estante: 0,
    posicion: "",
    identificacion: "",
    piezaSeguridad: "",
    clientes: "",
    img: "",
    archivo: "",
    cantidad: 0,
  });

  const [errors, setErrors] = useState({});

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

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue = name === "identificacion" ? value.toUpperCase() : value; // esto es para que el campo identficacion siempre sea en mayusuclas(el back espera eso)

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

    setErrors(newErrors); // Actualizar el estado de errores con los nuevos mensajes
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  const handleUploadImage = (url) => {
    setFormData({ ...formData, img: url });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/piezas`,
        formData
      );

      console.log(response.data);

      setFormData({
        nombre: "",
        estanteria: 0,
        estante: 0,
        posicion: "",
        identificacion: "",
        piezaSeguridad: "",
        clientes: "",
        img: "",
        archivo: "",
        cantidad: 0,
      });
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="nombre">
        <FormLabel color={"black"}>Nombre</FormLabel>
        <Input
          color={"black"}
          bg={"white"}
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <Box color="red">{errors.nombre}</Box>}
      </FormControl>
      <FormControl id="estanteria">
        <FormLabel color={"black"}>Estantería</FormLabel>
        <Input
          color={"black"}
          bg={"white"}
          type="tex"
          name="estanteria"
          placeholder="0"
          onChange={handleChange}
        />
        {errors.estanteria && <Box color="red">{errors.estanteria}</Box>}
      </FormControl>
      <FormControl id="estante">
        <FormLabel color={"black"}>Estante</FormLabel>
        <Input
          color={"black"}
          bg={"white"}
          type="text"
          name="estante"
          placeholder="0"
          onChange={handleChange}
        />
        {errors.estante && <Box color="red">{errors.estante}</Box>}
      </FormControl>
      <FormControl id="posicion">
        <FormLabel color={"black"}>Posición</FormLabel>
        <Input
          color={"black"}
          bg={"white"}
          type="text"
          name="posicion"
          placeholder="0"
          onChange={handleChange}
        />
        {errors.posicion && <Box color="red">{errors.posicion}</Box>}
      </FormControl>
      <FormControl id="identificacion">
        <FormLabel color={"black"}>Identificación</FormLabel>
        <Input
          color={"black"}
          bg={"white"}
          type="text"
          name="identificacion"
          value={formData.identificacion}
          onChange={handleChange}
        />
        {errors.identificacion && (
          <Box color="red">{errors.identificacion}</Box>
        )}
      </FormControl>
      <FormControl id="cantidad">
        <FormLabel color={"black"}>Cantidad</FormLabel>
        <Input
          color={"black"}
          bg={"white"}
          type="text"
          name="cantidad"
          placeholder="0"
          onChange={handleChange}
        />
        {errors.cantidad && <Box color="red">{errors.cantidad}</Box>}
      </FormControl>
      <FormControl id="piezaSeguridad">
        <FormLabel color={"black"}>Pieza de Seguridad</FormLabel>
        <Select
          name="piezaSeguridad"
          value={{
            value: formData.piezaSeguridad,
            label: formData.piezaSeguridad,
          }}
          onChange={(selectedOption) =>
            setFormData({ ...formData, piezaSeguridad: selectedOption.value })
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
      <FormControl id="clientes">
        <FormLabel color={"black"}>Cliente</FormLabel>
        <Select
          name="clientes"
          value={{
            value: formData.clientes,
            label: formData.clientes,
          }}
          onCh
          onChange={(selectedOption) =>
            setFormData({ ...formData, clientes: selectedOption.value })
          }
          options={[
            { value: "TOYOTA", label: "TOYOTA" },
            { value: "VOLVO", label: "VOLVO" },
            { value: "GUIDI", label: "GUIDI" },
            { value: "HONDA", label: "HONDA" },
            { value: "METALSA", label: "METALSA" },
            { value: "TBA", label: "TBA" },
            { value: "VOLKSWAGEN", label: "VOLKSWAGEN" },
            { value: "MERCEDEZ BENZ", label: "MERCEDEZ BENZ" },
            { value: "CILINDROS MARO", label: "CILINDROS MARO" },
          ]}
          styles={customStyles}
        />

        {errors.clientes && <Box color="red">{errors.clientes}</Box>}
      </FormControl>

      <UploadImage onUpload={handleUploadImage} onChange={handleChange} />
      <Button mt={4} bg={"#0075B7"} type="submit">
        Crear Pieza
      </Button>
    </form>
  );
};

export default PiezaForm;
