import React from "react";
import { Box, Input, Text } from "@chakra-ui/react";

const UploadFile = ({ onUpload, fileUploadRef }) => {
  return (
    <Box marginTop={"2rem"}>
      <Box color={"black"} fontSize="1.2rem">
        <Text color={"#0075B7"} htmlFor="file-input">
          Subir aquí tu archivo
        </Text>
      </Box>
      <Input
        onChange={onUpload}
        color={"black"}
        type="file"
        name="file"
        variant="unstyled"
        _placeholder="Sube tu archivo aqui"
        ref={fileUploadRef}
      />
    </Box>
  );
};

export default UploadFile;
