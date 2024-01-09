import { requestAdmin } from "../../helper/request";

export class EmployeeAPI {
  static fetchAll = (filter) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/employee`,
      params: filter,
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/employee`,
      data: data,
    });
  };

  static update = (data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/employee`,
      data: data,
    });
  };

  static updateStatus = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/employee/update`,
      data: data,
    });
  };

  static getOneByIdUser = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/employee/${id}`,
    });
  };
}
