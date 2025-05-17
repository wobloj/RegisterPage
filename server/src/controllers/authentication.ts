import express from 'express';

import { getUserByEmail, createUser } from '../db/users';
import {authentication, random} from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password ');
        if(!user) {
            return res.status(400).json({message: 'User not found'});
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if(user.authentication.password !== expectedHash) {
            return res.status(403).json({message: 'Invalid password'});
        }

        const salt = random();
        user.authentication.token = authentication(salt, user._id.toString());

        await user.save();
        res.cookie('USER-AUTH', user.authentication.token, {domain: 'localhost', path: '/'})

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: 'Unexpected error'});
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password, username} = req.body;

        if(!email || !password || !username) {
            return res.status(400).json({message: 'Email, password and username are required'});
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const salt = random();
        const user = await createUser({
            email, 
            username, 
            authentication:{
              salt,
              password: authentication(salt, password),
            }
        });

        return res.status(201).json(user).end();
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: 'Unexpected error'});
    }
}