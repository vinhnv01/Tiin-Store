import { requestAdmin } from "../../helper/request";

export class EmployeeAPI {
  static fetchAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/employee`,
      //   params: filter,
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/employee`,
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
