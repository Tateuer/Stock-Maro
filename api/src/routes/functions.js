const { Piezas } = require("../db");
const { Sequelize } = require("sequelize");

const piezasDb = async () => {
  try {
    const piezasMaro = await Piezas.findAll();
    return piezasMaro;
  } catch (error) {
    console.log(error);
  }
};

const piezaById = async (id) => {
  try {
    const piezasMaro = await Piezas.findByPk(id);
    return piezasMaro;
  } catch (error) {
    console.log(error);
  }
};

// const piezaByName = async (nombre) => {
//   try {
//     const Op = Sequelize.Op;
//     const piezaNombre = await Piezas.findAll({
//       where: {
//         nombre: {
//           [Op.like]: `%${nombre}%`,
//         },
//       },
//       raw: true,
//     });
//     return piezaNombre;
//   } catch (error) {
//     console.log(error);
//   }
// };

const piezaByName = async (nombre) => {
  try {
    const piezaNombre = await Piezas.findAll({
      where: {
        nombre: {
          [Sequelize.Op.iLike]: `%${nombre}%`,
        },
      },
      raw: true,
    });
    return piezaNombre;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  piezasDb,
  piezaById,
  piezaByName,
};
