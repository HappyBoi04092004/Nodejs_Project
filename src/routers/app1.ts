import express,{Express} from "express";
import {  getHomePage, postCreateUser ,postDeleteUser,getViewUser,postUpdateUser,getCreateUserPage} from "../controllers/admin/user.controller";
import { getDashboardPage ,getAdminUserPage,getAdminOrderPage,getAdminProductPage, getAdminLogout} from "../controllers/admin/dashboard.controller";
import {getCreateProductPage, getDetailProductPage ,postAdminProductPage, postAdminCreateProductPage, getEditProductPage, postUpdateProductPage, postDeleteProductPage,postAddProductToCart, getCartPage, postDeleteProductInCart, getCheckOutPage, getShopPage} from "../controllers/admin/product.controller";
import fileUploadMiddleware from "../middleware/multer";
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogout, postRegister } from "controllers/client/auth.controller";
import { getOrderHistoryPage, getOrderDetailPage, postCheckoutOrder } from "controllers/client/order.controller";
import { getContactPage, postContactPage } from "controllers/client/contact.controller";
import {
  getAboutPage,
  getPrivacyPage,
  getTermsPage,
  getReturnPolicyPage,
  getPurchasePolicyPage,
  getSupportPage,
} from "controllers/client/page.controller";
import passport from "passport";
import { isAdmin, isLogin } from "src/middleware/auth";
import requireAuth from "src/middleware/require-auth";
import { getAdminOrderDetailPage } from "controllers/admin/order.controller";
import { getAdminSettingPage } from "../controllers/admin/dashboard.controller";
//import { get } from "http";

const router = express.Router();
const webrouters = (app) =>{
    // Lịch sử mua hàng user
    router.get('/order-history', requireAuth, getOrderHistoryPage);
    router.get('/order/:id', requireAuth, getOrderDetailPage);
    router.post('/checkout', requireAuth, postCheckoutOrder);
    // Quản lý order admin (có phân trang)
    router.get('/admin/order',isAdmin,getAdminOrderPage);
    router.get('/shop',getShopPage)
    router.get('/', getHomePage);
    router.get('/client/index.html', getHomePage);
    router.get('/client', getHomePage);
    router.get('/product/:id', getDetailProductPage);

    //admin router
    router.get('/admin', isAdmin, getDashboardPage);
    router.get('/admin/create-user',isAdmin, getCreateUserPage);
    router.get('/admin/user',isAdmin, getAdminUserPage);
    router.post('/admin/delete-user/:id',isAdmin,postDeleteUser);
    router.get('/admin/view-user/:id',isAdmin,getViewUser);
    router.post('/admin/update-user',isAdmin,fileUploadMiddleware("avatar"),postUpdateUser);
    router.post('/admin/handle-create-user',isAdmin,fileUploadMiddleware("avatar"), postCreateUser);
    // router.post('/admin/handle-create-user',upload.single('avatar'), (req, res) => {
    //     return res.send('SUCCESS');
    // });

    router.get('/admin/product',isAdmin, getAdminProductPage);
    router.get('/admin/logout',isAdmin, getAdminLogout);
    router.get('/admin/setting',isAdmin, getAdminSettingPage);
    router.get('/admin/create-product',isAdmin, getCreateProductPage);
    router.post('/admin/handle-create-product',isAdmin,fileUploadMiddleware("image","images/product"), postAdminCreateProductPage);
    router.get('/admin/view-product/:id',isAdmin, getDetailProductPage);
    router.get('/admin/edit-product/:id',isAdmin, getEditProductPage);
    router.post('/admin/update-product/:id',isAdmin, fileUploadMiddleware("image","images/product"), postUpdateProductPage);
    router.post('/admin/delete-product/:id',isAdmin, postDeleteProductPage);
    router.get('/contact', getContactPage);
    router.post('/contact', postContactPage);
    router.get('/about', getAboutPage);
    router.get('/privacy', getPrivacyPage);
    router.get('/terms', getTermsPage);
    router.get('/return-policy', getReturnPolicyPage);
    router.get('/purchase-policy', getPurchasePolicyPage);
    router.get('/support', getSupportPage);

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
    router.get('/checkout', requireAuth, getCheckOutPage);
    
    router.get('/admin/order',isAdmin, getAdminOrderPage);
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
adminRouter.get('/order/:id',getAdminOrderDetailPage);

app.use('/admin', adminRouter);
app.use('/', router);
}
export default webrouters;

 