export const roleMiddleware = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // assuming user role is stored in req.user

        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
        }

        next();
    };
};
