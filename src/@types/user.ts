import { Request } from 'express';

interface CreateUser extends Request {
    body: {
        name: string;
        email: string;
        password: string;
    }
}