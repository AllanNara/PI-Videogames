const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('genre', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      timestamps: false
    });
  };

  // [ ] Genero con las siguientes propiedades:
// ID
// Nombre

// PLATFORM.JS
// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//     // defino el modelo
//     sequelize.define('platform', {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         unique: true
//       },
//       name: {
//         type: DataTypes.STRING,
//         unique: true
//       }
//     },
//     {
//       timestamps: false
//     });
//   };