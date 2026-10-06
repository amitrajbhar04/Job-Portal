const { errorResponse } = require("../utils/FormatResponse");

const authorizeRole = (...allowedRoles) => {

    return (request, result, next) => {

        if (!request.user) {
            return errorResponse(
                result,
                "Unauthorized",
                401
            );
        }

        if (!allowedRoles.includes(request.user.roleId)) {
            return errorResponse(
                result,
                "You do not have permission to access this resource",
                403
            );
        }

        next();
    };
};

module.exports = authorizeRole;