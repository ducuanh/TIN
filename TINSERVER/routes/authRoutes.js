const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//validation

const registerValidationRules = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ];
  

  const loginValidationRules = [
    body('username').notEmpty().withMessage('username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ];
  

  const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  };

router.post('/register',registerValidationRules,validate, authController.register);
router.post('/login', loginValidationRules,validate, authController.login);

module.exports = router;
