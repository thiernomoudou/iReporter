const errorHandler = {
  invalidEmail: {
    status: 400,
    error: 'Please enter a valid email address'
  },
  emailOrPwordMissing: {
    status: 400,
    error: 'Email or Password are missing'
  },
  adminPermission: {
    status: 403,
    error: 'Forbidden. You need admin permission to change statuses'
  },
  notFound: {
    status: 404,
    error: 'Red-flag not found'
  }
};

export default errorHandler;
