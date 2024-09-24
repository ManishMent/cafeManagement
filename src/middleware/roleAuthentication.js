// Middleware to check role-based access
const roleAuthorization = (...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Assuming the user object is already attached to req after JWT verification
  
      // Check if the user's role is in the allowed roles
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied: insufficient privileges' });
      }
      next();
    };
  };

  module.exports = { roleAuthorization }