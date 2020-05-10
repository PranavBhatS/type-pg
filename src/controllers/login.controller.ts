import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import User from './../models/user.model';
import { Logger } from '@overnightjs/logger';
import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import * as jwt from "jsonwebtoken";


@Controller("auth/")
export class LoginController {

    @Post('')
    private login(req: Request, res: Response) {
        if (!(req.body.userName && req.body.password)) {
            Logger.Warn("invalid credentials")
            res.status(401).json({
                message: "invalid credentials"
            })
        }
        User.findOne({
            where: Sequelize.and({
                password: req.body.password,
                userName: req.body.userName
            })
        })
            .then(user => {
                if (user) {
                    Logger.Info("user got")
                    const { id, userName } = user;
                    const newToken = jwt.sign({ id, userName }, config.jwtSecret, {
                        expiresIn: "1h"
                    });
                    delete user.password
                    res.status(200).json({
                        token:newToken,
                        user
                    })
                }
            })
            .catch(err => {
                Logger.Err("failed to get user from db")
            })
    }
}