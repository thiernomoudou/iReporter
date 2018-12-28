/* eslint-disable import/prefer-default-export */
import ExpressValidator from 'express-validator/check';

const { check } = ExpressValidator;

export const validateNewIncident = [
  // validate type field
  check('type')
    .exists().withMessage('type is required')
    .isIn([
      'Redflag', 'redflag', 'Red-flag', 'Redflag', 'Intervention',
      'intervention'
    ])
    .withMessage('Type must be a Red-flag or an Intervention'),
  // validate comment field
  check('comment')
    .isString().withMessage('Comment Must be only alphabetical characters')
    .isLength({ min: 10 })
    .withMessage('Comment Must be at least 10 characters long'),
  // Validate location field
  check('location')
    .exists().withMessage('location is required')
    .isLength({ min: 5 })
    .withMessage('Location Must be at least 5 characters long'),
];

export const validateSignup = [
  check('username')
    .isString().withMessage('Username must be alphabetical characters.')
    .isLength({ min: 4 })
    .withMessage('Username must be at least 5 characters long'),

  check('email')
    .exists().withMessage('Email is missing')
    .isEmail()
    .withMessage('You must enter a valid email address.')
    .isLength({ min: 8, max: 40 })
    .withMessage('Email must be at least 8 characters long and not more than 40'),

  check('password')
    .exists().withMessage('Password is missing')
    .isString()
    .withMessage('Password must be alphanumeric characters.')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password must be at least 6 characters long and not more than 20'),

  // check('firstname')
  //   .isString().withMessage('First name must be alphabetic characters.')
  //   .isLength({ min: 3, max: 40 })
  //   .withMessage('First name must be at least 3 characters long and not more than 40'),

  // check('lastname')
  //   .isString().withMessage('Last name must be alphanumeric characters.')
  //   .isLength({ min: 3, max: 40 })
  //   .withMessage('Last name must be at least 3 characters long and not more than 40'),

  // check('phonenumber')
  //   .isString().withMessage('Phone number must be numeric characters.')
  //   .isLength({ min: 10, max: 15 })
  //   .withMessage('Phone number must be at least 10 characters long and not more than 15'),
];

export const validateSignin = [
  check('username')
    .isString().withMessage('Username must be alphabetical characters.')
    .isLength({ min: 4, max: 20 })
    .withMessage('Username must be at least 5 characters long and not more than 20'),

  check('password')
    .isString().withMessage('Password must be alphanumeric characters.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const validateStatus = [
  check('status')
    .isString().withMessage('Status must be alphabetical characters.')
    .isLength({ min: 4, max: 20 })
    .withMessage('Status must be at least 5 characters long and not more than 20'),
];
