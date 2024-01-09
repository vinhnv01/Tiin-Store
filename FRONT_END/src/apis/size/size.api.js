import { requestAdmin } from "../../helper/request";

export class SizeAPI {
  static fetchAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/size`,
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/size`,
      data: data,
    });
  };
}
