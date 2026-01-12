import { prisma } from "config/client";

const initDatabase = async() => {
    const countUsers = await prisma.user.count();
    if(countUsers == 0){
        await prisma.user.createMany({
        data: [
            {
                fullName: "John Doe",
                username: "johndoe@example.com",
                address: "123 Main St, Cityville",
                password: "123456",
                accountType: "system"
            },
            {
                fullName: "Jane Smith",
                username: "janesmith@example.com",
                address: "456 Oak Ave, Townsville",
                password: "123456",
                accountType: "system"
            },
        ],
})
    }else{
        console.log("Database da duoc khoi tao, khong can khoi tao lai");
    }

    
};

export default initDatabase;