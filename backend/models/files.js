'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class files extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  files.init(
    {
      video_filename: DataTypes.STRING,
      videopath: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'files',
    },
  )
  return files
}
