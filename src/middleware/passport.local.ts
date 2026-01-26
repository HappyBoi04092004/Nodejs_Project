import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { prisma } from 'config/client';
import { comparePassword } from 'services/user-service';
import { get } from 'http';
import { getUserWithRoleById } from 'services/client/register-service';



const configPassportLocal = () => {
    passport.use(new LocalStrategy({},async function verify(username, password, callback: any) {
        console.log('Check username,password:', username, password);
        // db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
        //     if (err) { return cb(err); }
        //     if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
            
        //     bcrypt.compare(password, row.hashed_password, function(err, result) {
        //     if (err) { return cb(err); }
        //     if (!result) {
        //         return cb(null, false, { message: 'Incorrect username or password.' });
        //     }
        //     return cb(null, row);
        //     });
        // });
         const user = await prisma.user.findUnique({
        where: { username }
    });

    if (!user) {
          // throw new Error(`Username:${username} not found`);
           return callback(null, false, { message: `Username:${username} not found` });
    }
    //compare password with hashed password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
            //throw new Error('Invalid password');
            return callback(null, false, { message: 'Invalid password' });
    }      
    
    //return user;
    return callback(null, user);
         }));
};

passport.serializeUser(function(user: any, callback) {
    
        callback(null, {id: user.id, username: user.username});
    });


passport.deserializeUser(  async function(user: any, callback) {
        const { id,username } = user;
        //query db 
        const userinDB = await getUserWithRoleById(id);
        return callback(null,{...userinDB});
    }); 

export default configPassportLocal;