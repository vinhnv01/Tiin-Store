import moment from "moment/moment";

export default function ConvertLongToDate({ long }) {
  return moment(long).toDate();
}
