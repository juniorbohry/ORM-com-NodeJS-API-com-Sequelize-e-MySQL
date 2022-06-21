'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matriculas = sequelize.define('Matriculas', {
    status: DataTypes.STRING
  }, {paranoid: true});
  Matriculas.associate = function(models) {
    Matriculas.belongsTo(models.Pessoas, {
      foreignKey: 'estudante_Id'
    });
    Matriculas.belongsTo(models.Turmas, {
      foreignKey: 'turma_Id'
    });
  };
  return Matriculas;
};