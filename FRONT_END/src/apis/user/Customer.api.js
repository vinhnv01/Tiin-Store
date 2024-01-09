import { requestAdmin } from "../../helper/request";

export class CustomerAPI {
  static fetchAll = (filter) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/customer`,
      params: filter,
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/customer`,
      data: data,
    });
  };

  static update = (data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/customer`,
      data: data,
    });
  };

  static updateStatus = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/customer/update`,
      data: data,
    });
  };

  static getOneByIdUser = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/customer/${id}`,
    });
  };
}
