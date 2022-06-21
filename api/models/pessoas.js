'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if(dado.length < 3) throw new Error('o campo nome deve ter mais de 3 caracteres')   
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate:{                       
        isEmail: {
          args: true,
          msg:'dado do tipo e-mail invalidos'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    paranoid: true,
    defaultScope: {
      where: { ativo : true }  
    },
    scopes: {
      todos: { where: {}},
      //
    }
  });
  
  Pessoas.associate = function(models) {
    Pessoas.hasMany(models.Turmas, {
      foreignKey: 'docente_Id'
    })// associations can be defined here  niveis tem uma associação de um pra varios com turmas
    Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_Id', //niveis tem uma associação de um pra varios com Matriculas
      scope: { status: 'confirmado'},
      as: 'aulasMatriculadas'
    })  
  };
  return Pessoas;
};
