import { Response, Request, NextFunction } from "express";
import { StringUtil } from '../../utilities/string-util';
import User from '../../model/user-model';

// User Register
export async function index(req: Request, res: Response) {
    const validation = await validateIndex(req.body);
    if (!validation.isValid) {
        console.log('not valid!');
        return res.status(403).json({ message: validation.message });
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        first: req.body.first,
        last: req.body.last,
        role: req.body.role,
    });
    user.save(error => {
        if (error) {
            console.log('save error: ' + error)
            // Mongoose Error Code 11000 means validation failure (username taken)
            if (error.code === 11000) {
                return res.status(403).json({ message: 'Username is already taken' });
            }
            return res.status(500).json();
        }
        return res.status(201).json();
    });
}

async function validateIndex(body: any) {
    let errors = '';
    if (StringUtil.isEmpty(body.username)) {
        errors += 'Username is required. ';
    }
    if (StringUtil.isEmpty(body.password)) {
        errors += 'Password is required. ';
    }
    if (StringUtil.isEmpty(body.first)) {
        errors += 'First name is required. ';
    }
    if (StringUtil.isEmpty(body.last)) {
        errors += 'Last name is required. ';
    }
    
    const user = await User.findOne({username: body.username});
    if(user) {
        console.log('user existed')
        errors += `${body.username} is already existed!`;
    } 

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}