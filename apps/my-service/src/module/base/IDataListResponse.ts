export interface IDataListResponse<T> {
  pagination: {
    count: number;
    pageNo: number;
    pageSize: number;
  };
  data: T;
}
