import { z } from "zod";

export const RegisterSchema = z.object({
  fullName: z.string({ required_error: "Tên đầy đủ là bắt buộc" })
    .min(3, "Tên phải ít nhất 3 ký tự")
    .max(255, "Tên không vượt quá 255 ký tự")
    .trim(),
  
  username: z.string({ required_error: "Tên đăng nhập là bắt buộc" })
    .min(3, "Tên đăng nhập phải ít nhất 3 ký tự")
    .max(100, "Tên đăng nhập không vượt quá 100 ký tự")
    .regex(/^[a-zA-Z0-9_-]+$/, "Tên đăng nhập chỉ có thể chứa chữ, số, gạch dưới và gạch ngang")
    .trim(),
  
  password: z.string({ required_error: "Mật khẩu là bắt buộc" })
    .min(6, "Mật khẩu phải ít nhất 6 ký tự")
    .max(255, "Mật khẩu không vượt quá 255 ký tự"),
  
  confirmPassword: z.string({ required_error: "Xác nhận mật khẩu là bắt buộc" })
    .min(6, "Xác nhận mật khẩu phải ít nhất 6 ký tự"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
