'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.users);
    }
  };
  result.init({
    student_id: DataTypes.INTEGER,
    grade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'result',
  });
  return result;
};