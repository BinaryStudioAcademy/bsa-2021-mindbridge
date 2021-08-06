export interface IFetchData {
  type: string;
  endpoint: string;
  requestData?: object | string;
  queryParams?: object;
}
