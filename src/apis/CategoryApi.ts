import request from "../utils/request";

export interface CategoryInfo {
    id?: number;
    name: string;
    parentId: number;
    categoryAttrs: CategoryAttr[];
}

export interface  CategoryAttr{
    id: number;
    name: string;
}

export const getCategoryList = async () => {
    const res = await request.get<CategoryInfo[]>("/api/category");
    return res
}

export const addCategory = async (data: CategoryInfo) => {
    const res = await request.post<CategoryInfo>("/api/category", data);
    return res
}
