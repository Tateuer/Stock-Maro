const { Router } = require("express");
const { piezasDb, piezaById, piezaByName } = require("./functions");
const { Piezas } = require("../db");
const path = require("path");
const fs = require("fs");

const router = Router();

router.get("/piezas", async (req, res) => {
  try {
    const allPiezas = await piezasDb();
    res.status(200).json(allPiezas);
  } catch (error) {
    res.status(400).send("Error de servidor");
  }
});

router.get("/piezas/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const piezaId = await piezaById(id);
    res.status(200).json(piezaId);
  } catch (error) {
    res.status(400).send("Error de servidor");
  }
});

router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;

  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "files",
    filename
  );

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Archivo no encontrado");
  }
});

router.delete("/piezas/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const pieza = await Piezas.findByPk(id);

    if (!pieza) {
      return res.status(404).send("Pieza no encontrada");
    }

    await pieza.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor al eliminar la pieza");
  }
});

router.get("/piezas/name/:name", async (req, res) => {
  const nombre = req.params.name;
  try {
    if (nombre) {
      const piezaNombre = await piezaByName(nombre.toLowerCase());

      if (piezaNombre && piezaNombre.length > 0) {
        res.status(200).json(piezaNombre);
      } else {
        res.status(404).send("No se encontró el nombre");
      }
    } else {
      res.status(400).send("Nombre no proporcionado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error server");
  }
});

router.post("/piezas", async (req, res) => {
  const {
    nombre,
    estanteria,
    estante,
    posicion,
    identificacion,
    piezaSeguridad,
    clientes,
    img,
    archivo,
    cantidad,
  } = req.body;
  console.log("asd", archivo);
  try {
    const createdPieza = await Piezas.create({
      nombre,
      estanteria,
      estante,
      posicion,
      identificacion,
      piezaSeguridad,
      clientes,
      img,
      archivo,
      cantidad,
    });
    res.status(201).json(createdPieza);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al crear pieza");
  }
});

router.put("/piezas/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const {
      nombre,
      estanteria,
      estante,
      posicion,
      identificacion,
      piezaSeguridad,
      clientes,
      img,
      archivo,
      cantidad,
    } = req.body;

    const piezaEditada = await Piezas.update(
      {
        nombre: nombre,
        estanteria: estanteria,
        estante: estante,
        posicion: posicion,
        identificacion: identificacion,
        piezaSeguridad: piezaSeguridad,
        clientes: clientes,
        img: img,
        archivo: archivo,
        cantidad: cantidad,
      },
      { where: { id: id }, returning: true }
    );
    res.status(200).json(piezaEditada);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al editar");
  }
});

router.post("/uploadFile", (req, res, next) => {
  let { file } = req.files;
  const originalName = file.name;
  const md5 = file.md5;

  const saveAs = `${md5}_${originalName}`;
  const filePath = `${__dirname}/../../public/files/${saveAs}`;

  file.mv(filePath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).json({
      status: "uploaded",
      name: saveAs,
      url: `${process.env.BACKEND_URL}/download/${saveAs}`,
    });
  });
});

// router.post("/uploadFile", (req, res, next) => {
//   let { file } = req.files;
//   const name = file.name;
//   const md5 = file.md5;

//   const saveAs = `${md5}_${name}`;
//   console.log(`${__dirname}/../../public/files/${saveAs}`);
//   file.mv(`${__dirname}/../../public/files/${saveAs}`, function (err) {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     return res.status(200).json({ status: "uploaded", name: saveAs });
//   });
// });

module.exports = router;
