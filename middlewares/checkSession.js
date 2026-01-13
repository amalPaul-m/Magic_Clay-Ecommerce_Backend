import HTTP_STATUS from "../utils/httpStatus.js"

export const checkSession = (req, res, next) => {
  if (!req.session.user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
next();
};
