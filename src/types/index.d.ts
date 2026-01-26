import { User,Role } from "prisma/client";


type UserRole = User & Role;//union

declare global {
  namespace Express {
    interface User extends User {
      role?: Role;
    }
  }
}