import { requestAdmin } from "../../helper/request";

export class ColorAPI {
  static fetchAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/color`,
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/color`,
      data: data,
    });
  };
}
