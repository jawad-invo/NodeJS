const {
  Model, STRING
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.result);
      this.hasMany(models.messages, { foreignKey: 'sender_id' });
      this.hasMany(models.courses);
    }
  };

  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: [2, 20],
      validate: {
        notNull: {
          msg: "Name cannot be null",
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true,
      allowNull: false,
      validate: {

      }
    },
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};

