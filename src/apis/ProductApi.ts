import request from "../utils/request";

export interface ProductInfo {
    id?: number;
    name: string;
    description: string;
}

export interface CreateProductRequest {
    categoryId: number;
    name: string;
    brand: string;
    model: string;
    description: string;
    productAttrs: { categoryAttributeId: number; value: string }[];
}

export const getProducts = async () => {
    const res = await request.get<ProductInfo[]>("/api/product", { params: { page: 1, pageSize: 10 }});
    return res; 
}

export const createProduct = async (data: CreateProductRequest) => {


    const requestId = crypto.randomUUID();
    const res = await request.post("/api/Product", data , {
        headers: {
            'x-requestid': requestId,
        }
    });
    return res;
}