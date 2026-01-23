import {Request, Response} from 'express';
import { RegisterSchema, TRegisterSchema } from '../../validation/register.schema';
import { handleRegister } from '../../services/client/register-service';

const getRegisterPage = async(req:Request, res:Response) => {
    return res.render("client/auth/register.ejs");
}

const getLoginPage = async(req:Request, res:Response) => {
    const message = req.query.message || null;
    return res.render("client/auth/login.ejs", { message });
}

const postRegister = async(req:Request, res:Response) => {
    try {
        // Validate data using Zod
        const validatedData: TRegisterSchema = RegisterSchema.parse(req.body);

        // Call register service
        const result = await handleRegister(
            validatedData.fullName,
            validatedData.username,
            validatedData.password
        );

        if (!result.success) {
            return res.status(400).render("client/auth/register.ejs", {
                error: result.message,
                formData: {
                    fullName: validatedData.fullName,
                    username: validatedData.username
                }
            });
        }

        return res.redirect("/client/login");

    } catch (error: any) {
        if (error.name === 'ZodError') {
            const errorMessages = error.errors.map((err: any) => ({
                field: err.path[0],
                message: err.message
            }));
            return res.status(400).render("client/auth/register.ejs", {
                errors: errorMessages,
                formData: req.body
            });
        }
        
        console.log("Register error:", error);
        return res.status(500).render("client/auth/register.ejs", {
            error: "Lỗi đăng ký. Vui lòng thử lại!"
        });
    }
}

export { getRegisterPage, getLoginPage, postRegister };