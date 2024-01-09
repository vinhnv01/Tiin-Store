import { requestAdmin } from "../../helper/request";

export class ProductDetailAPI {
  static fetchAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/product-detail`,
      // params: filter,
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/product-detail`,
      data: data,
    });
  };

  static update = (data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/product-detail`,
      data: data,
    });
  };
}
