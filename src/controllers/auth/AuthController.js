const { errorResponse, successResponse } = require("../../utils/FormatResponse");
const { User, Role, sequelize } = require("../../../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async(request,result) => {

    try {
        const {email,password} = request.body;

        if(!email || !password) {
            return errorResponse(result,"Email or Password field is required",422);
        }

        const exitedUser = await User.findOne({ where: { email },
            include: [
                {
                    model: Role,
                    as: "role",
                    attributes: ['id', 'name']
                }
            ]
        });

        if(!exitedUser) {
            return errorResponse(result, "Invalid email or password",404);
        }

        const isMatched = await bcryptjs.compare(password,exitedUser.password);

        if(!isMatched) {
            return errorResponse(result, "Invalid email or password",404);
        }

        const loginData = {
            id: exitedUser.id,
            name: exitedUser.name,
            email: exitedUser.email,
            phone: exitedUser.phone,
            roleId: exitedUser.roleId,
            roleName: exitedUser.role?.name
        };

        const token = jwt.sign(loginData,process.env.JWT_SECRET,{expiresIn:'1d'});
        loginData.token = token;

        return successResponse(result, "login successfully",loginData);
    } catch(error) {

        return errorResponse(result,error);
    }
}

exports.registration = async(request, result) => {
    const transaction = await sequelize.transaction();
    try {
        const {password,email,name,phone, roleId} = request.body;

        if(!password || !email || !name || !phone || !roleId) {
            return errorResponse(result, "All fields is required",422);
        }

        const alreadyExisted = await User.findOne({
            where: { email }
        });

        if(alreadyExisted) {
            return errorResponse(result, `This user ${email} has been already registered`,422);
        }

        const hashPassword = await bcryptjs.hash(password,10);

        const userCreated = await User.create({name,email,phone,password:hashPassword,roleId});console.log(userCreated);

        const data = {
            id: userCreated.id,
            name: userCreated.name,
            email: userCreated.email,
            phone: userCreated.phone,
            roleId: userCreated.roleId
        }
        const token = jwt.sign(data,process.env.JWT_SECRET,{ expiresIn: "1d" });

        data.token = token;
        await transaction.commit();
        return successResponse(result,"Registration successfully",data);
    } catch(error) {
        await transaction.rollback();
        return errorResponse(result,error.message);
    }
}

exports.getProfile = async(request, result) => {
    try {
        return successResponse(result, "Get Profile Successfully.",request.user);
    } catch(error) {
        return errorResponse(result,error.message);
    }
}