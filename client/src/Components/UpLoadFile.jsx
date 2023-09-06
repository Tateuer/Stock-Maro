import React from "react";
import { Box, Image, Input } from "@chakra-ui/react";
import { useState } from "react";

const UploadImage = ({ onUpload }) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const upImages = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3001/uploadFile`, // link de la api
        {
          method: "POST",
          body: data,
        }
      )
      const response = await res.json();
      if(response.status == 'uploaded'){
        alert('Ok, Archivo subido');
      }else{
        alert(response);
      }
      //setImage(response.secure_url);
      //onUpload(response.secure_url);
      //setLoading(false);
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <Box>
      <Input
        color={"black"}
        type="file"
        name="file"
        variant="unstyled"
        _placeholder="Sube tu imagen aqui"
        onChange={upImages}
     
      />
      {loading ? (
        <h3 color="black">Cargando imagen...</h3>
      ) : (
        <Image src={image} width={"100px"} />
      )}
    </Box>
  );
};

export default UploadImage;
