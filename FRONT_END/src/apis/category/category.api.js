import { requestAdmin } from "../../helper/request";

export class CategoryAPI {
  static fetchAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/category`,
      //   params: filter,
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/category`,
      data: data,
    });
  };
}
