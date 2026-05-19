import { Request, Response } from "express";

const PAGES: Record<string, { title: string; content: string }> = {
  about: {
    title: "Về chúng tôi",
    content:
      "Blossom Flower là cửa hàng hoa tươi tại Hà Nội, chuyên thiết kế bó hoa, giỏ hoa và hộp hoa cho mọi dịp: sinh nhật, kỷ niệm, đám cưới, khai trương. Chúng tôi cam kết hoa nhập mới mỗi ngày và giao nhanh trong nội thành.",
  },
  privacy: {
    title: "Chính sách bảo mật",
    content:
      "Chúng tôi chỉ thu thập thông tin cần thiết để xử lý đơn hàng (họ tên, số điện thoại, địa chỉ giao hàng, email). Dữ liệu không được chia sẻ cho bên thứ ba ngoài đối tác giao hàng. Bạn có quyền yêu cầu chỉnh sửa hoặc xóa thông tin cá nhân qua email liên hệ.",
  },
  terms: {
    title: "Điều khoản sử dụng",
    content:
      "Khi sử dụng website Blossom Flower, bạn đồng ý không sao chép nội dung, không sử dụng sai mục đích hệ thống đặt hàng. Giá sản phẩm có thể thay đổi theo mùa hoa. Đơn hàng chỉ được xác nhận sau khi chúng tôi liên hệ xác nhận.",
  },
  "return-policy": {
    title: "Chính sách hoàn trả",
    content:
      "Hoa tươi là sản phẩm dễ hư hỏng. Nếu hoa bị dập, héo do vận chuyển, vui lòng gửi ảnh trong vòng 2 giờ kể từ khi nhận hàng để được đổi bó tương đương hoặc hoàn tiền theo chính sách cửa hàng.",
  },
  "purchase-policy": {
    title: "Chính sách mua hàng",
    content:
      "Thanh toán khi nhận hàng hoặc chuyển khoản trước với đơn giao xa. Đơn giao trong ngày cần đặt trước 15:00. Phí giao hàng tính theo khu vực, miễn phí đơn từ 500.000đ nội thành Hà Nội.",
  },
  support: {
    title: "Hỗ trợ khách hàng",
    content:
      "Hotline: 0941 579 339 (8:00–21:00). Email: contact@blossomflower.vn. Bạn cũng có thể nhắn tin qua fanpage Facebook hoặc form trang Liên hệ.",
  },
};

const getStaticPage = (key: string) => async (req: Request, res: Response) => {
  const page = PAGES[key];
  if (!page) {
    return res.status(404).render("status/404.ejs");
  }
  return res.render("client/pages/static.ejs", {
    pageTitle: page.title,
    title: page.title,
    content: page.content,
  });
};

export const getAboutPage = getStaticPage("about");
export const getPrivacyPage = getStaticPage("privacy");
export const getTermsPage = getStaticPage("terms");
export const getReturnPolicyPage = getStaticPage("return-policy");
export const getPurchasePolicyPage = getStaticPage("purchase-policy");
export const getSupportPage = getStaticPage("support");
