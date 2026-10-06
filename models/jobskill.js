'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobSkill extends Model {

    static associate(models) {

      JobSkill.belongsTo(models.JobApplication, {
        foreignKey : "jobApplicationId",
        as: 'job'
      });

      JobSkill.belongsTo(models.Skill, {
        foreignKey: "skillId",
        as: "skills"
      });

    }
  }
  JobSkill.init({
    jobApplicationId: DataTypes.INTEGER,
    skillId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'JobSkill',
  });
  return JobSkill;
};