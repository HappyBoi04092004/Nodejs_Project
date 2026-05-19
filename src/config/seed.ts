import { prisma } from "config/client";
import { hashPassword } from "services/user-service";
import { ACCOUNT_TYPE } from "config/constant";

const FLOWER_PRODUCTS = [
  {
    name: "Bó hoa hồng đỏ 99 bông",
    price: 890000,
    detailDesc: "Bó hồng Ecuador nhập khẩu, bọc giấy cao cấp, kèm thiệp chúc mừng. Phù hợp tỏ tình, kỷ niệm.",
    shortDesc: "99 bông – Gói quà sang trọng",
    quantity: 50,
    factory: "HOA-HONG",
    target: "TINH-YEU",
    image: "flower-rose-99.jpg",
  },
  {
    name: "Giỏ hoa tulip pastel",
    price: 650000,
    detailDesc: "Tulip Hà Lan mix màu pastel, giỏ mây handmade, tươi 5–7 ngày.",
    shortDesc: "Tulip mix – Giỏ mây",
    quantity: 40,
    factory: "TULIP",
    target: "SINH-NHAT",
    image: "flower-tulip.jpg",
  },
  {
    name: "Bó hoa ly trắng tinh khôi",
    price: 480000,
    detailDesc: "Hoa ly trắng thơm nhẹ, phù hợp chia buồn hoặc chúc mừng thanh lịch.",
    shortDesc: "Ly trắng – 15 cành",
    quantity: 60,
    factory: "HOA-LY",
    target: "CHUC-MUNG",
    image: "flower-lily.jpg",
  },
  {
    name: "Hộp hoa sáp thơm",
    price: 350000,
    detailDesc: "Hoa sáp bền 2 năm, hộp kính sang trọng, không cần tưới.",
    shortDesc: "Hộp quà lưu niệm",
    quantity: 80,
    factory: "HOA-SAP",
    target: "QUA-TANG",
    image: "flower-box.jpg",
  },
  {
    name: "Bó hướng dương nắng vàng",
    price: 320000,
    detailDesc: "Hướng dương Đà Lạt tươi, mang năng lượng tích cực, khai trương.",
    shortDesc: "Sắc vàng rực rỡ",
    quantity: 70,
    factory: "HOA-SAC",
    target: "KHAI-TRUONG",
    image: "flower-sunflower.jpg",
  },
  {
    name: "Bó cẩm chướng mix",
    price: 280000,
    detailDesc: "Cẩm chướng nhiều màu, giá mềm, phù hợp tặng mẹ, 8/3, 20/10.",
    shortDesc: "Mix màu dễ thương",
    quantity: 100,
    factory: "HOA-CAM",
    target: "TANG-ME",
    image: "flower-carnation.jpg",
  },
  {
    name: "Hoa cưới cầm tay ivory",
    price: 1200000,
    detailDesc: "Thiết kế ivory – xanh lá, hoa lan, hồng garden, ribbon satin.",
    shortDesc: "Bó cô dâu đặt may",
    quantity: 20,
    factory: "HOA-CUOI",
    target: "DAM-CUOI",
    image: "flower-wedding.jpg",
  },
  {
    name: "Kệ hoa khai trương 2 tầng",
    price: 2500000,
    detailDesc: "Kệ hoa lớn khai trương, giao trong 2h nội thành, kèm banner.",
    shortDesc: "Kệ 2 tầng – Doanh nghiệp",
    quantity: 15,
    factory: "KE-HOA",
    target: "KHAI-TRUONG",
    image: "flower-opening.jpg",
  },
  {
    name: "Bình hoa văn phòng mini",
    price: 220000,
    detailDesc: "Hoa theo mùa trong bình thủy tinh, thay hoa 2 lần/tuần (gói thuê).",
    shortDesc: "Trang trí bàn làm việc",
    quantity: 90,
    factory: "BINH-HOA",
    target: "VAN-PHONG",
    image: "flower-office.jpg",
  },
  {
    name: "Bó hoa sinh nhật rainbow",
    price: 420000,
    detailDesc: "Mix hoa theo mùa rực rỡ, nơ satin, thiệp viết tay miễn phí.",
    shortDesc: "Sinh nhật vui tươi",
    quantity: 55,
    factory: "HOA-MIX",
    target: "SINH-NHAT",
    image: "flower-birthday.jpg",
  },
];

const initDatabase = async () => {
  const countUsers = await prisma.user.count();
  const countRoles = await prisma.role.count();
  const countProducts = await prisma.product.count();

  if (countRoles === 0) {
    await prisma.role.createMany({
      data: [{ name: "Admin" }, { name: "User" }],
    });
  }

  if (countUsers === 0) {
    const adminrole = await prisma.role.findFirst({ where: { name: "Admin" } });
    if (adminrole) {
      const johndoePassword = await hashPassword("johndoe");
      const janesmithPassword = await hashPassword("janesmith");
      const adminPassword = await hashPassword("admin");

      await prisma.user.createMany({
        data: [
          {
            fullName: "John Doe",
            username: "johndoe@example.com",
            address: "123 Main St, Cityville",
            password: johndoePassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: adminrole.id,
          },
          {
            fullName: "Jane Smith",
            username: "janesmith@example.com",
            address: "456 Oak Ave, Townsville",
            password: janesmithPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: adminrole.id,
          },
          {
            fullName: "Admin Blossom",
            username: "admin@example.com",
            address: "31 Nguyên Xá, Hà Nội",
            password: adminPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: adminrole.id,
          },
        ],
      });
    }
  }

  const laptopCount = await prisma.product.count({
    where: { name: { contains: "Laptop" } },
  });

  if (countProducts === 0 || laptopCount > 0) {
    if (laptopCount > 0) {
      await prisma.cartDetail.deleteMany({});
      await prisma.orderDetail.deleteMany({});
      await prisma.product.deleteMany({});
    }
    await prisma.product.createMany({ data: FLOWER_PRODUCTS });
    console.log("Da cap nhat du lieu san pham hoa tuoi");
  }

  if (countRoles !== 0 && countUsers !== 0) {
    console.log("Database da duoc khoi tao");
  }
};

export default initDatabase;
