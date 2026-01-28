import { User,Role } from "prisma/client";


type UserPrisma = User & Role;//union

declare global {
  namespace Express {
    interface User extends User {
      role?: Role;
    }
  }
}