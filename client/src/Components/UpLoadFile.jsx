import React, { useState } from "react";
import { Box, Image, Input } from "@chakra-ui/react";

const UploadFile = ({ onUpload }) => {
  const [loading, setLoading] = useState(false);

  const upFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/uploadFile`, {
        method: "POST",
        body: data,
      });
      const response = await res.json();

      if (response.status === "uploaded") {
        alert("Ok, Archivo subido");
        //onUpload(files[0]);
        onUpload(response.name);
      } else {
        alert("Error al subir el archivo: " + response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box marginTop={"2rem"}>
      <Box color={"black"} fontSize="1.2rem">
        <label htmlFor="file-input">Subir aquí tu archivo</label>
      </Box>
      <Input
        color={"black"}
        type="file"
        name="file"
        variant="unstyled"
        _placeholder="Sube tu archivo aqui"
        onChange={upFile}
      />
      {loading ? (
        <h3 color="black">Cargando archivo...</h3>
      ) : (
        <h2 color="black">Archivo subido correctamente</h2>
      )}
    </Box>
  );
};

export default UploadFile;
