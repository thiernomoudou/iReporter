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
  },
  inValidCreds: {
    status: 400,
    error: 'The credentials you provided are incorrects'
  },
  noAccount: {
    status: 400,
    error: 'You do not have an active account. Please signup'
  },
  postgresError: {
    code: '23505',
    message: 'A user with your email or username already exists.',
  },
};

export default errorHandler;
