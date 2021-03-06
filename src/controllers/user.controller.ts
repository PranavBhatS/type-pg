import { Controller, Get, Post, Middleware, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import User from '../models/user.model';
import { Logger } from '@overnightjs/logger';
import { v4 as uuidv4 } from 'uuid';
import PassWordSecurity from './../services/passwordSecurity.service'
import { checkJwt } from './../middleware/checkJwt';

@Controller('users/')
export class UserController {

    @Post('')
    private add(req: Request, res: Response) {
        let encryptedPassword = ''
        PassWordSecurity.hashPassword(req.body.password + '', 12, (err, hash) => {
            if (err) {
                Logger.Err("user creation failed becoz of password encryption");
                res.status(500).json({
                    error: "user creation failed becoz of password encryption",
                    err: err.message
                })
                return
            }
            encryptedPassword = hash;
            let { fullName, userName } = req.body
            const user = new User({
                id: uuidv4(),
                password: encryptedPassword,
                fullName, userName
            })

            user.save().then(createdUser => {
                Logger.Info("user created successfully")
                res.status(200).json({
                    message: "user created successfully"
                })
            })
                .catch(err => {
                    Logger.Err("user creation failed");
                    res.status(500).json({
                        error: "user creation failed",
                        err
                    })
                })
        })
    }

    @Get('')
    @Middleware([checkJwt])
    private async  get(req: Request, res: Response) {
        User.findAll().map(el => el.get({ plain: true })).then(users => {
            Logger.Info("get all user successfull")
            let modifiedUsers = users.map((user) => {
                let tempUser: any = user;
                delete tempUser.password;
                return tempUser
            });
            res.send(
                modifiedUsers
            );
        })
            .catch(err => {
                Logger.Err("get all users failed");
                res.status(500).json({
                    error: "user creation failed"
                })
            })
    }

    @Put('update/:id')
    @Middleware([checkJwt])
    private async deactivate(req: Request, res: Response) {
        User.update({
            ...req.body
        },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(updated => {
                if (!updated[0]) {
                    res.status(500).json({
                        error: req.params.id + " id does not exist",
                    })
                }
                res.send(
                    {
                        "message": "updated succesfuly"
                        , updated
                    }
                );
            })
            .catch(err => {
                Logger.Err("User update failed");
                res.status(500).json({
                    error: "User update failed",
                    err
                })
            })
    }
}