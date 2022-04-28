const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: new Date().toISOString().split('T')[0],
      validate: {
        isDate: true,
        isAfter: "1958-10-17",
        isBefore: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        len: [1, 4],
        min: 0,
        max: 5,
        isNumeric: true
      }
    },
    //  POR LA CANTIDAD DE PLATAFORMAS VOY A COPIARLAS DE LA API
    // plataforms: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // }
  },
  {
    timestamps: false
  }
  );
};

// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *
