const { request } = require("express");
const { errorResponse, successResponse } = require("../../utils/FormatResponse");
const {JobApplication, User, JobSkill, Skill,AppliedJob, sequelize} = require("../../../models");

exports.appliedJob = async(request,result) => {
    const transaction = await sequelize.transaction();
    try {
        const {jobApplicationId} = request.body;
        const candidateId = request.user.id;

        if(!jobApplicationId) {
            return errorResponse(result, "Job Application id field is required", 422);
        }

        const alreadyAppliedJob = await AppliedJob.findOne({where:{jobApplicationId}});
        if(alreadyAppliedJob) {
            await transaction.rollback();
            return errorResponse(result, "You have already for this jobs",409);
        }

        const appliedJob = await AppliedJob.create({jobApplicationId, candidateId});

        const getAppliedJob = await AppliedJob.findOne({where:{id:appliedJob.id},
            include: [
                {
                    model: JobApplication,
                    as : "jobApplicationDetails",
                    attributes: ["id","jobName","salary"]
                },
                {
                    model : User,
                    as : "candidateDetails",
                    attributes: ["id","name", "email", "phone"]
                }
            ]
        });
        await transaction.commit();
        return successResponse(result, "Job applied successfully",getAppliedJob);
    } catch(error) {
        await transaction.rollback();
        return errorResponse(result, error.message);
    }
}

exports.getJobs = async(request, result) => {
    try {
        const getAllJobs = await JobApplication.findAll({
            include: [
                {
                    model: User,
                    as: "employerDetail",
                    attributes: ["id", "name", "email", "phone"]
                },
                {
                    model: JobSkill,
                    as: "jobSkills",
                    include: [
                        {
                            model: Skill,
                            as: "skills",
                            attributes: ["id", "name"]
                        }
                    ]
                }
            ]
        });

        return successResponse(result, "Get all jobs successfully",getAllJobs);
    } catch(error) {
        return errorResponse(result, error.message);
    }
}

exports.getAllAppliedJobs = async(request, result) => {
    try {
        const candidateId = request.user.id;
        const getAllAppliedJobs = await AppliedJob.findAll({where:{candidateId},
            include:[
                {
                    model: User,
                    as : "candidateDetails",
                    attributes: ["id","name","email","phone"]
                },
                {
                    model: JobApplication,
                    as : "jobApplicationDetails",
                    attributes: ["id","employerId", "jobName","salary","description"],
                    include: [
                        {
                            model : User,
                            as : "employerDetail",
                            attributes: ["id","name","email","phone"]
                        },
                        {
                            model : JobSkill,
                            as : "jobSkills",
                            include: {
                                model : Skill,
                                as : "skills",
                                attributes: ["id","name"]
                            }
                        }
                    ]
                }
            ]
        });
        return successResponse(result,"Fetch job applied details Successfull",getAllAppliedJobs);
    } catch(error) {
        return errorResponse(result, error.message);
    }
}