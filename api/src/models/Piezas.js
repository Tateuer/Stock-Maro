const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "piezas",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estanteria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 50,
        },
      },
      estante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 4,
        },
      },
      posicion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[A-Z]$/, //esto es para que sea de la A a la Z
        },
      },
      identificacion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[A-Z]$/,
        },
      },
      piezaSeguridad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["si", "no"]], //esto es para saber si es una pieza de seguridad o no
        },
      },
      clientes: {
        type: DataTypes.ENUM("Toyota", "Volvo"), //falta agregar clientes (son 12)
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
      },
      archivo: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
