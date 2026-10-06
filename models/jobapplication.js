'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JobApplication extends Model {
    static associate(models) {

      JobApplication.belongsTo(models.User, {
        foreignKey: "employerId",
        "as" : 'employerDetail'
      });

      JobApplication.hasMany(models.JobSkill, {
        foreignKey: "jobApplicationId",
        as: "jobSkills"
      });

      JobApplication.hasMany(models.AppliedJob,{
        foreignKey: "jobApplicationId",
        as : "jobAppliedCandidateList"
      })
    }
  }
  JobApplication.init({
    employerId: DataTypes.INTEGER,
    jobName: DataTypes.STRING,
    salary: DataTypes.DOUBLE,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JobApplication',
  });
  return JobApplication;
};