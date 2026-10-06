'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppliedJob extends Model {
    static associate(models) {
      AppliedJob.belongsTo(models.JobApplication,{
        foreignKey: "jobApplicationId",
        as : "jobApplicationDetails"
      });

      AppliedJob.belongsTo(models.User,{
        foreignKey: "candidateId",
        as : "candidateDetails"
      })
    }
  }
  AppliedJob.init({
    jobApplicationId: DataTypes.INTEGER,
    candidateId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AppliedJob',
  });
  return AppliedJob;
};