

function authorize(...role) {
  return (req, res, next) => {
    // catch & match the user role
    const userRole = req.user.role;

    // revoke access based on role
    if (!role.includes(userRole)) {
      return res.status(403).json({
        acknowledgement: false,
        message: "ممنوع",
        description: "شما مجاز به دسترسی به این صفحه نیستید",
      });
    }

    next();
  };
}

module.exports = authorize;
