import { Request, Response, NextFunction } from 'express';
import {UserPrisma} from 'src/types';
const isLogin = (req: Request, res: Response, next: NextFunction) => {
  
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
        res.redirect('/');
        return;
    }else {
        next();
    }
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  
    if(req.path.startsWith('/admin')) {
        const user = req.user;
        if (user?.role?.name === 'Admin') {
            next();
            return;
        } else {
            return res.status(403).render("status/403.ejs");
        }
    } 
        //client route
        next();
    }


export { isLogin, isAdmin };