import db from "../models";
import fs from 'fs';
import csv from 'csv-parser';
const validationResult = require("express-validator");
import { Request, Response } from 'express';

/** 
 * This function creates a new user in database
*/
async function create(req: Request, res: Response) {
    try {
        // const validationErrors = validationResult(req);
        // if (!validationErrors.isEmpty()) {
        //     res.status(400).send(validationErrors);
        // }

        await db.Users.create({
            name: req.body.name,
            email: req.body.email
        }).then(userCreated => res.status(201).send(userCreated));

    } catch (error) {
        res.status(400).send(error);
    }
}


/** 
 * This function return all users
*/
async function read(req: Request, res: Response) {
    try {

        // const validationErrors = validationResult(req);
        // if (!validationErrors.isEmpty()) {
        //     res.status(400).send(validationErrors);
        // }

        await db.Users.findAll({
            where: {
                id: req.body.id
            }, attributes: ['id', 'name', 'email'],
            include: db.messages
        }).then(result => res.status(200).send(result));

    } catch (error) {
        res.status(400).send(error);
    }
}

/** 
 * This function updates a user in database
*/
async function update(req: Request, res: Response) {
    try {

        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            res.status(400).send(validationErrors)
        }

        await db.Users.update({
            name: req.body.name
        },
            {
                where: {
                    id: req.body.id
                }
            }
        ).then(res.status(200).send("Record updated Successfully!"))
    } catch (error) {
        res.status(400).send(error);
    }
}

/** 
 * This function removes a user from database
*/
async function destroy(req: Request, res: Response) {
    try {

        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            res.status(400).send(validationErrors)
        }

        await db.Users.destroy({
            where: {
                id: req.body.id
            }
        }).then(res.status(200).send({ message: "Record deleted successfully", id: req.body.id }))
    } catch (error) {
        res.status(400).send(error);
    }
}

/** 
 * This function read CSV file and return the result as array of objects.
*/
async function read_csv_file(req: Request, res: Response) {
    try {

        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            res.status(400).send(validationErrors)
        }

        const users = [];
        fs.createReadStream('users.csv')
            .pipe(csv())
            .on('data', function (row) {
                const user = {
                    name: row.name,
                    email: row.email
                }
                users.push(user);
            })
            .on('end', function () {
                res.status(200).send(users);
            })
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = {
    create,
    read,
    update,
    destroy,
    read_csv_file
};

