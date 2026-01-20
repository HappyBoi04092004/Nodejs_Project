import express,{Express} from "express";
import {  getHomePage, postCreateUser ,postDeleteUser,getViewUser,postUpdateUser,getCreateUserPage} from "../controllers/admin/user.controller";
import { getDashboardPage ,getAdminUserPage,getAdminOrderPage,getAdminProductPage} from "../controllers/admin/dashboard.controller";
import { getCreateProductPage, getDetailProductPage ,postAdminProductPage} from "controllers/admin/product.controller";
import fileUploadMiddleware from "src/middleware/multer";
//import { get } from "http";

const router = express.Router();
const webrouters = (app) =>{
    router.get('/', getHomePage);
    router.get('/product/:id', getDetailProductPage);

    //admin router
    router.get('/admin', getDashboardPage);
    router.get('/admin/create-user', getCreateUserPage);
    router.get('/admin/user', getAdminUserPage);
    router.post('/admin/delete-user/:id',postDeleteUser);
    router.get('/admin/view-user/:id',getViewUser);
    router.post('/admin/update-user',fileUploadMiddleware("avatar"),postUpdateUser);
    router.post('/admin/handle-create-user',fileUploadMiddleware("avatar"), postCreateUser);
    // router.post('/admin/handle-create-user',upload.single('avatar'), (req, res) => {
    //     return res.send('SUCCESS');
    // });

    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/create-product', getCreateProductPage);
    router.post('/admin/handle-create-product',fileUploadMiddleware("image","images/product"), postAdminProductPage);



    router.get('/admin/order', getAdminOrderPage);
    // router.listen(PORT, () => {
    //     console.log(`App is running on port : ${PORT} `);
    //     console.log(`Link vao thang web: http://localhost:${PORT}`);
    //     console.log('ENV PORT:', process.env.PORT);

app.use('/', router);
}
export default webrouters;

 