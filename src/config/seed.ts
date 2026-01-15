import { prisma } from "config/client";
import { hashPassword } from "services/user-service";
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async() => {
    const countUsers = await prisma.user.count();
    const countRoles = await prisma.role.count();
    if(countRoles === 0){
        await prisma.role.createMany({
        data: [
            {
                name: "Admin",            },
            {
                name: "User",
            },
        ],
})
    }
    if(countUsers === 0){
        const defaultPassword = await hashPassword("123456");
        const adminrole = await prisma.role.findFirst({
            where: { name: "Admin" }
        });
        if (adminrole) {
            await prisma.user.createMany({
        data: [
            {
                fullName: "John Doe",
                username: "johndoe@example.com",
                address: "123 Main St, Cityville",
                password: defaultPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId : adminrole.id
            },
            {
                fullName: "Jane Smith",
                username: "janesmith@example.com",
                address: "456 Oak Ave, Townsville",
                password: defaultPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId : adminrole.id
            },
            {
                fullName: "Admin",
                username: "admin@example.com",
                address: "456 Main St, Cityville",
                password: defaultPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId : adminrole.id
            },
        ],
})
        }

       
    }
    if(countRoles !==0 && countUsers!==0){
        console.log("Database da duoc khoi tao, khong can khoi tao lai");
    }

    
};

export default initDatabase;