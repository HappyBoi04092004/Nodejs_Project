import express,{Express} from "express";
import { getCreateUserPage, getHomePage, postCreateUser ,postDeleteUser,getViewUser} from "../controllers/user.controller";
import { get } from "http";

const router = express.Router();
const webrouters = (app) =>{
    router.get('/', getHomePage);
    router.get('/create-user', getCreateUserPage);
    router.post('/handle-create-user',postCreateUser);
    router.post('/handle-delete-user/:id',postDeleteUser);
    router.get('/handle-view-user/:id',getViewUser);


    // router.listen(PORT, () => {
    //     console.log(`App is running on port : ${PORT} `);
    //     console.log(`Link vao thang web: http://localhost:${PORT}`);
    //     console.log('ENV PORT:', process.env.PORT);

app.use('/', router);
}
export default webrouters;

