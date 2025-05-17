import express from 'express';
import {get, identity, merge} from 'lodash';

import { getUserByToken } from '../db/users';

export const isOwner = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {id} = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId) {
            return res.sendStatus(403);
        }

        if(currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['USER-AUTH'];
        if(!sessionToken) {
            return res.status(403).json({message: 'No session token found'});
        }

        const existingUser = await getUserByToken(sessionToken);
        if(!existingUser) {
            return res.status(403).json({ message: 'Invalid session token' });
        }

        merge(req, {identity: existingUser});
        return next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Authentication error' });
    }
}