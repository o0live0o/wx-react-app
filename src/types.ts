export interface PageResult<T> {
  items: T[];          
  pageIndex: number;  
  pageSize: number;   
  totalCount: number;  
  totalPages: number;  
}

export interface PageRequest {
  page: number;
  pageSize: number;
}