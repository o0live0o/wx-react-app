import request from "../utils/request";
import { PageResult,PageRequest } from "../types";
export interface CategoryInfo {
    id?: number;
    name: string;
    parentId: number;
    categoryAttrs: CategoryAttr[];
}

export interface  CategoryAttr{
    attrId: number;
    name: string;
}

export const getCategoryById = async (id: number) => {
    const res = await request.get<CategoryInfo>(`/api/category/${id}`);
    return res
}

export const deleteCategoryById = async (id: number) => {
    const res = await request.delete(`/api/category/${id}`);
    return res
}

export const getCategoryList = async (params: PageRequest) => {
    const res = await request.get<PageResult<CategoryInfo>>(`/api/category?pageIndex=${params.page}&pageSize=${params.pageSize}`);
    return res
}

export const addCategory = async (data: CategoryInfo) => {
    const res = await request.post<CategoryInfo>("/api/category", data);
    return res
}

export const deleteCategoryAttr = async (id: number, attrId: number) => {
    const res = await request.delete<CategoryInfo>(`/api/category/${id}/attr/${attrId}`);
    return res
}

export const addCategoryAttr = async (id: number, attrName:string) => {
    const res = await request.post(`/api/category/${id}/attr`, { name: attrName });
    return res
}
