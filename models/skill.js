'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {

      Skill.hasMany(models.JobSkill, {
        foreignKey : "skillId",
        as : "jobSkills"
      });

    }
  }
  Skill.init({
    name: DataTypes.STRING,
    unique: true
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};