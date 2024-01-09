import { requestAdmin } from "../../helper/request";

export class ProductAPI {
  static fetchAll = (filter) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/product`,
      params: filter,
    });
  };

  static getAll = (filter) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/product/get-all`,
      params: filter,
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/product`,
      data: data,
    });
  };

  static update = (data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/product`,
      data: data,
    });
  };
}
