import React, { useState, useRef } from "react";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import Swal from "sweetalert2";
//import { useEffect } from "react";

const UploadFile = ({ onUpload, resetFile }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];

    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, selecciona un archivo primero.",
      });
      return;
    }

    const data = new FormData();
    data.append("file", file);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/uploadFile`, {
        method: "POST",
        body: data,
      });
      const response = await res.json();

      if (response.status === "uploaded") {
        Swal.fire("Archivo subido!", "Bien hecho!", "success");
        onUpload(response.name);
      } else {
        Swal.fire({
          icon: "error",
          text: "Error: " + response.message,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fileInputRef.current.value = "";
  //   handleFileUpload();
  // }, [resetFile]);

  return (
    <Box marginTop={"2rem"}>
      <Box color={"black"} fontSize="1.2rem">
        <Text color={"#0075B7"} htmlFor="file-input">
          Subir aquí tu archivo
        </Text>
      </Box>
      <Input
        color={"black"}
        type="file"
        name="file"
        variant="unstyled"
        _placeholder="Sube tu archivo aqui"
        ref={fileInputRef}
      />
      * <Button
        mt={4}
        bg={"#0075B7"}
        onClick={handleFileUpload}
        disabled={loading}
      >
        Cargar archivo
      </Button> *
      {loading ? <h3 color="black">Cargando archivo...</h3> : null}
    </Box>
  );
};

export default UploadFile;

// import React, { useState } from "react";
// import { Box, Image, Input } from "@chakra-ui/react";

// const UploadFile = ({ onUpload }) => {
//   const [loading, setLoading] = useState(false);

//   const upFile = async (e) => {
//     const files = e.target.files;
//     const data = new FormData();
//     data.append("file", files[0]);
//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:3001/uploadFile`, {
//         method: "POST",
//         body: data,
//       });
//       const response = await res.json();

//       if (response.status === "uploaded") {
//         alert("Ok, Archivo subido");
//         //onUpload(files[0]);
//         onUpload(response.name);
//       } else {
//         alert("Error al subir el archivo: " + response.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <Box marginTop={"2rem"}>
//       <Box color={"black"} fontSize="1.2rem">
//         <label htmlFor="file-input">Subir aquí tu archivo</label>
//       </Box>
//       <Input
//         color={"black"}
//         type="file"
//         name="file"
//         variant="unstyled"
//         _placeholder="Sube tu archivo aqui"
//         onChange={upFile}
//       />
//       {loading ? (
//         <h3 color="black">Cargando archivo...</h3>
//       ) : (
//         <h2 color="black">Archivo subido correctamente</h2>
//       )}
//     </Box>
//   );
// };

// export default UploadFile;
