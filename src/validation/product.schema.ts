import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string({ required_error: "Tên sản phẩm là bắt buộc" })
    .min(3, "Tên sản phẩm phải ít nhất 3 ký tự")
    .trim(),
  
  detailDesc: z.string({ required_error: "Chi tiết sản phẩm là bắt buộc" })
    .min(10, "Chi tiết mô tả phải ít nhất 10 ký tự")
    .trim(),
  
  shortDesc: z.string({ required_error: "Mô tả ngắn là bắt buộc" })
    .min(3, "Mô tả ngắn phải ít nhất 3 ký tự")
    .trim(),
  
  price: z.string({ required_error: "Giá sản phẩm là bắt buộc" })
    .refine((val) => val !== "", "Giá sản phẩm không được để trống")
    .transform((val) => Number(val))
    .refine((num) => num > 0, "Giá sản phẩm phải lớn hơn 0"),

  quantity: z.string({ required_error: "Số lượng là bắt buộc" })
    .refine((val) => val !== "", "Số lượng không được để trống")
    .transform((val) => Number(val))
    .refine((num) => num > 0, "Số lượng phải lớn hơn 0"),

  factory: z.string({ required_error: "Hãng sản xuất là bắt buộc" })
    .min(1, "Hãng sản xuất không được để trống"),
  
  target: z.string({ required_error: "Đối tượng là bắt buộc" })
    .min(1, "Đối tượng không được để trống"),

  image: z.any().optional(),
  sold: z.number().min(0, "Số lượng bán phải là số dương").optional(),
});

export type TProductSchema = z.infer<typeof ProductSchema>;