/*eslint no-unused-vars:*/

import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';

const testController = require('../Controllers/TestController');
const sendEmailController = require('../Controllers/SendEmail');

router.use(bodyParser.urlencoded({ extended: true }));

import { check } from 'express-validator';


router.post('/create', [
    check('name')
        .notEmpty()
        .withMessage("Name field cannot be empty!")
        .isLength({ min: 2, max: 20 })
        .isString(),
    check('email')
        .notEmpty()
        .withMessage("Email field cannot be empty!")
        .isEmail()
], testController.create);

router.post('/read', [
    check('id')
        .notEmpty()
        .isInt()
], testController.read);

router.post('/update', [
    check('name')
        .notEmpty()
        .isString()
        .isLength({ min: 2, max: 20 }),
    check('id')
        .notEmpty()
        .isInt()
]
    , testController.update);

router.post('/delete', [
    check('id')
        .isInt()
        .notEmpty()
]
    , testController.destroy);

router.post('/read_csv_file', testController.read_csv_file);

router.post('/sendMail', sendEmailController.sendEmail);

module.exports = router;
