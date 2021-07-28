const { response, request } = require('express');

const isAdminRole = (req = request, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere Verifica el rol sin validar el token primero'
        })
    }
    const { Name, role } = req.user

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${Name} isn't administrator`
        });
    }

    try {
        next();
    } catch (error) {

    }

}



const rolesRequiered = (...roles) => {

    return (req = request, res = response, next) => {
        if (!req.user) {

            return res.status(401).json({
                msg: `Se quiere Verificar el rol sin validar el token primero`
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `The service require this roles ${roles}`,
                user_role: req.user.role
            });
        }

        next();
    }

}

module.exports = {
    isAdminRole,
    rolesRequiered
};