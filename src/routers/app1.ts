import express,{Express} from "express";
import {  getHomePage, postCreateUser ,postDeleteUser,getViewUser,postUpdateUser,getCreateUserPage} from "../controllers/admin/user.controller";
import { getDashboardPage ,getAdminUserPage,getAdminOrderPage,getAdminProductPage} from "../controllers/admin/dashboard.controller";
import {getCreateProductPage, getDetailProductPage ,postAdminProductPage, postAdminCreateProductPage, getEditProductPage, postUpdateProductPage, postDeleteProductPage,postAddProductToCart, getCartPage, postDeleteProductInCart, getCheckOutPage, getShopPage} from "../controllers/admin/product.controller";
import fileUploadMiddleware from "../middleware/multer";
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogout, postRegister } from "controllers/client/auth.controller";
import { getOrderHistoryPage, getOrderDetailPage, postCheckoutOrder } from "controllers/client/order.controller";
import { getContactPage } from "controllers/client/contact.controller";
import passport from "passport";
import { isAdmin, isLogin } from "src/middleware/auth";
//import { get } from "http";

const router = express.Router();
const webrouters = (app) =>{
    // Lịch sử mua hàng user
    router.get('/order-history',getOrderHistoryPage);
    router.get('/order/:id',getOrderDetailPage);
    // Tạo order khi thanh toán
    router.post('/checkout',postCheckoutOrder);
    // Quản lý order admin (có phân trang)
    router.get('/admin/order',getAdminOrderPage);
    router.get('/shop',getShopPage)
    router.get('/', getHomePage);
    router.get('/client/index.html', getHomePage);
    router.get('/client', getHomePage);
    router.get('/product/:id', getDetailProductPage);

    //admin router
    router.get('/admin', isAdmin, getDashboardPage);
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
    router.post('/admin/handle-create-product',fileUploadMiddleware("image","images/product"), postAdminCreateProductPage);
    router.get('/admin/view-product/:id', getDetailProductPage);
    router.get('/admin/edit-product/:id', getEditProductPage);
    router.post('/admin/update-product/:id', fileUploadMiddleware("image","images/product"), postUpdateProductPage);
    router.post('/admin/delete-product/:id', postDeleteProductPage);
    router.get('/contact', getContactPage);

    router.get("/success-redirect", getSuccessRedirectPage);
    router.get('/client/login' ,getLoginPage);
    router.post('/client/login', passport.authenticate('local', {
        successRedirect: '/success-redirect',
        failureRedirect: '/client/login',
        failureMessage: true
    }));
    router.post('/client/logout', postLogout);
    router.get('/client/register', getRegisterPage);
    router.post('/client/register', postRegister);
    router.post('/add-product-to-cart/:id', postAddProductToCart);
    router.get('/cart', getCartPage);
    router.post('/delete-product-in-cart/:id',postDeleteProductInCart)
    router.get('/checkout',getCheckOutPage);
    
    router.get('/admin/order', getAdminOrderPage);
    // router.listen(PORT, () => {
    //     console.log(`App is running on port : ${PORT} `);
    //     console.log(`Link vao thang web: http://localhost:${PORT}`);
    //     console.log('ENV PORT:', process.env.PORT);

// Tách router admin và client rõ ràng
const adminRouter = express.Router();
adminRouter.use(isAdmin);
adminRouter.get('/', getDashboardPage);
adminRouter.get('/create-user', getCreateUserPage);
adminRouter.get('/user', getAdminUserPage);
adminRouter.post('/delete-user/:id', postDeleteUser);
adminRouter.get('/view-user/:id', getViewUser);
adminRouter.post('/update-user', fileUploadMiddleware("avatar"), postUpdateUser);
adminRouter.post('/handle-create-user', fileUploadMiddleware("avatar"), postCreateUser);
adminRouter.get('/product', getAdminProductPage);
adminRouter.get('/create-product', getCreateProductPage);
adminRouter.post('/handle-create-product', fileUploadMiddleware("image","images/product"), postAdminCreateProductPage);
adminRouter.get('/view-product/:id', getDetailProductPage);
adminRouter.get('/edit-product/:id', getEditProductPage);
adminRouter.post('/update-product/:id', fileUploadMiddleware("image","images/product"), postUpdateProductPage);
adminRouter.post('/delete-product/:id', postDeleteProductPage);
adminRouter.get('/order', getAdminOrderPage);
adminRouter.get('/order/:id', require('../controllers/admin/order.controller').getAdminOrderDetailPage);

app.use('/admin', adminRouter);
app.use('/', router);
}
export default webrouters;

 