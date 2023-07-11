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
    data.append("upload_preset", "mmsohvqn"); //codigo cloudinary
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/stockmaro/image/upload", // link de la api
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();

      setImage(file.secure_url);
      console.log(file.secure_url);
      onUpload(file.secure_url);
      setLoading(false);
    } catch (error) {}
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
        <h3>Cargando imagen...</h3>
      ) : (
        <Image src={image} p={"3%"} borderRadius={"1rem"} maxHeight={"12rem"} />
      )}
    </Box>
  );
};

export default UploadImage;
