import HTTP_STATUS from "../utils/httpStatus.js"

const errorHandler = (err, req, res, next) => {
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
  });
};

export default errorHandler;
