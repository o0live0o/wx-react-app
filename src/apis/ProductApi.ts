import request from "../utils/request";
import { PageResult,PageRequest } from "../types";
export interface ProductInfo {
    id?: number;
    categoryId: number;
    name: string;
    brand: string;
    model: string;
    description: string;
    productAttrs: { categoryAttributeId: number; value: string }[];
}

export interface ProductViewInfo {
    id?: number;
    categoryId: number;
    categoryName: string;
    name: string;
    brand: string;
    model: string;
    description: string;
    productAttrs: ProductAttr[];
}

export interface ProductAttr {
    id: number;
    name: string;
    value: string;
}
export const getProducts = async (params: PageRequest) => {
    const res = await request.get<PageResult<ProductInfo>>(`/api/product?pageIndex=${params.page}&pageSize=${params.pageSize}`);
    return res; 
}

export const getProductById = async (id: number) => {
    const res = await request.get<ProductViewInfo>(`/api/product/${id}`);
    return res;
}

export const createProduct = async (data: ProductInfo) => {
    const requestId = crypto.randomUUID();
    const res = await request.post("/api/Product", data , {
        headers: {
            'x-requestid': requestId,
        }
    });
    return res;
}