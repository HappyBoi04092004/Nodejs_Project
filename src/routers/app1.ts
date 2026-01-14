import express,{Express} from "express";
import {  getHomePage, postCreateUser ,postDeleteUser,getViewUser,postUpdateUser,getCreateUserPage} from "../controllers/user.controller";
import { getDashboardPage ,getAdminUserPage,getAdminOrderPage,getAdminProductPage} from "../controllers/admin/dashboard.controller";
//import { get } from "http";

const router = express.Router();
const webrouters = (app) =>{
    router.get('/', getHomePage);
    router.post('/handle-delete-user/:id',postDeleteUser);
    router.get('/handle-view-user/:id',getViewUser);
    router.post('/handle-update-user',postUpdateUser);

    //admin router
    router.get('/admin', getDashboardPage);
    router.get('/admin/create-user', getCreateUserPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/order', getAdminOrderPage);
    router.get('/admin/product', getAdminProductPage);
    router.post('/admin/handle-create-user',postCreateUser);



    // router.listen(PORT, () => {
    //     console.log(`App is running on port : ${PORT} `);
    //     console.log(`Link vao thang web: http://localhost:${PORT}`);
    //     console.log('ENV PORT:', process.env.PORT);

app.use('/', router);
}
export default webrouters;

 