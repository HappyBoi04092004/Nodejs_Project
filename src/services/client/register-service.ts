import { comparePassword } from "services/user-service";
import { prisma } from "../../config/client";
import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (plaintext: string) => {
  return await bcrypt.hash(plaintext, saltRounds);
};

const handleRegister = async (
  fullName: string,
  username: string,
  password: string
) => {
  try {
    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return {
        success: false,
        message: "Tên đăng nhập đã được sử dụng"
      };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user with accountType = SYSTEM
    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        accountType: "SYSTEM",
        roleId: 2 // Default user role
      }
    });

    return {
      success: true,
      message: "Đăng ký thành công",
      user: newUser
    };

  } catch (error) {
    console.log("Register service error:", error);
    return {
      success: false,
      message: "Lỗi đăng ký. Vui lòng thử lại!"
    };
  }
};


export { handleRegister };
