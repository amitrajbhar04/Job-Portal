const { request } = require("express");
const { JobApplication, User, JobSkill, Skill, AppliedJob, sequelize } = require("../../../models");

const { errorResponse, successResponse } = require("../../utils/FormatResponse");

exports.createJob = async (request, result) => {
    const transaction = await sequelize.transaction();
    try {
        const {jobName,salary,description,skills} = request.body;
        const employerId = request.user.id;

        if(!jobName || !salary || !description) {
            return errorResponse(result, "All fields is required", 422);
        }

        if (!Array.isArray(skills) || skills.length === 0) {
            return errorResponse(result,"Please select at least one skills",422);
        }

        const createJob = await JobApplication.create({employerId,jobName,salary,description},{transaction});

        const jobSkills = skills.map(skillId => ({
            jobApplicationId: createJob.id,
            skillId: skillId
        }));

        await JobSkill.bulkCreate(jobSkills,{transaction});
        
        const getCurrentJob = await JobApplication.findOne({where:{id:createJob.id},
            include:[
                {
                    model: User,
                    as: "employerDetail",
                    attributes: ["id","name","email","phone"]
                },
                {
                    model: JobSkill,
                    as : "jobSkills",
                    include: [
                        {
                            model: Skill,
                            as : "skills",
                            attributes: ["id","name"]
                        }
                    ]
                }
            ],
            transaction
        });

        await transaction.commit();
        return successResponse(result,"Job created successfully",getCurrentJob);
    } catch(error) {
        await transaction.rollback();
        return errorResponse(result, error.message);
    }
}

exports.getAllJobs = async (request, result) => {
    try {
        const employerId = request.user.id;
        const getAllJobs = await JobApplication.findAll({where:{employerId},
            include: [
                {
                    model: User,
                    as : "employerDetail",
                    attributes: ["id","name","email","phone"]
                },
                {
                    model: JobSkill,
                    as : "jobSkills",
                    include:{
                        model: Skill,
                        as : "skills",
                        attributes : ["id","name"]
                    }
                }
            ]
        });

        return successResponse(result, "Get all jobs successfully", getAllJobs);
    } catch(error) {
        return errorResponse(result, error.message);
    }
}

exports.jobAppliedCandidateList = async(request, result) => {
    try {
        const employerId = request.user.id;

        const jobAppliedCandidateList = await JobApplication.findAll({where:{employerId},
            include:[
                {
                    model: User,
                    as : "employerDetail",
                    attributes: ["id","name","email","phone"]
                },
                {
                    model: AppliedJob,
                    as : "jobAppliedCandidateList",
                    include:{
                        model: User,
                        as : "candidateDetails",
                        attributes:["id","name","email","phone"]
                    }
                },
                {
                    model : JobSkill,
                    as : "jobSkills",
                    include:{
                        model: Skill,
                        as : "skills",
                        attributes: ["id","name"]
                    }
                }
            ]
        });

        return successResponse(result, "Fetch Job applied canidate list successfully",jobAppliedCandidateList);
    } catch(error) {
        return errorResponse(result, error.message);
    }
}