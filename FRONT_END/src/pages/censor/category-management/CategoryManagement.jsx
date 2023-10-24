import {
  faEye,
  faFilter,
  faLayerGroup,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import showConfirmationModal from "../../../util/modal-confirm/ModalConfirm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CategoryManagement.model.css";
import moment from "moment";
import AddCategory from "./modal/addCategory";
import UpdateCategory from "./modal/updateCategory";

export default function CategoryManagement() {
  const [form] = Form.useForm();
  const [search, setSearch] = useState({
    name: "",
    fomDate: "",
    toDate: "",
    status: "",
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: "Tên thể loại",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "fromDate",
      key: "fromDate",
      align: "center",
    },
    {
      title: "Ngày cập nhập",
      dataIndex: "toDate",
      key: "toDate",
      align: "center",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: 7,
      align: "center",
      render: (text) => (
        <Tag
          color={text === "DANG_HOAT_DONG" ? "green" : "red"}
          style={{
            fontSize: "14px",
            padding: "5px 10px",
            borderRadius: "10px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {text === "DANG_HOAT_DONG" ? "Đang sử dụng" : "Ngừng sử dụng "}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Button
              onClick={() => handleUpdateClick(record)}
              style={{
                backgroundColor: "#0066CC",
                color: "white",
                height: "35px",
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </Tooltip>
          <Tooltip title="Hủy">
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                height: "35px",
              }}
              onClick={() => {
                showConfirmationModal(
                  "Bạn có chắc muốn hủy trạng thái " +
                    record.name +
                    " không ? ",
                  () => hanldeDelete(record)
                );
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data = [
    {
      stt: 1,
      id: "1",
      name: "John Brown",
      fromDate: moment(948472400000).format("DD-MM-YYYY"),
      toDate: moment(988472400000).format("DD-MM-YYYY"),
      status: "DANG_HOAT_DONG",
    },
    {
      stt: 2,
      id: "2",
      name: "John Brown na",
      fromDate: moment(948472400000).format("DD-MM-YYYY"),
      toDate: moment(988472400000).format("DD-MM-YYYY"),
      status: "NGUNG_HOAT_DONG",
    },
    {
      stt: 3,
      id: "3",
      name: "John Brown vinh",
      fromDate: moment(948472400000).format("DD-MM-YYYY"),
      toDate: moment(988472400000).format("DD-MM-YYYY"),
      status: "DANG_HOAT_DONG",
    },
  ];

  const hanldeDelete = (data) => {
    console.log(data);
  };

  const hanldeClear = () => {
    form.resetFields();
  };

  const hanldeSearch = () => {
    const values = form.getFieldsValue();
    setSearch({
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      status: values.status,
      ageMin: values.age[0],
      ageMax: values.age[1],
    });
  };

  // add category
  const [openAdd, setOpenAdd] = useState(false);
  const handleAddClick = () => {
    setOpenAdd(true);
  };

  // update category
  const [openUpdate, setOpenUpdate] = useState(false);
  const [idCategory, setIdCategory] = useState(null);
  const handleUpdateClick = (id) => {
    setIdCategory(id);
    setOpenUpdate(true);
  };

  const handleCancel = () => {
    setOpenAdd(false);
    setOpenUpdate(false);
  };

  return (
    <div>
      <div className="conten-category">
        <h1>
          <span style={{ marginLeft: "15px" }}>Quản lý thể loại</span>
        </h1>
      </div>
      <Form form={form}>
        <Card>
          <h2 className="conten-category">
            <FontAwesomeIcon icon={faFilter} />
            <span style={{ marginLeft: "15px" }}>Bộ lọc</span>
          </h2>
          <br />
          <Row justify={"center"}>
            <Col span={10} style={{ marginRight: "20px" }}>
              <Form.Item name="fullName" label="Tên thể loại">
                <Input placeholder="Nhập tên thể loại." />
              </Form.Item>
            </Col>
            <Col span={10} style={{ marginLeft: "20px" }}>
              <Form.Item label="Trạng thái" name="status">
                <Select defaultValue={""}>
                  <Select.Option value="">Tất cả</Select.Option>
                  <Select.Option value="DANG_HOAT_DONG">
                    Đang sử dụng
                  </Select.Option>
                  <Select.Option value="NGUNG_HOAT_DONG">
                    Ngừng sử dụng
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" align="middle" style={{ marginTop: "20px" }}>
            <Col>
              <Button
                style={{
                  marginRight: "10px",
                  backgroundColor: "#0066CC",
                  color: "white",
                }}
                onClick={hanldeSearch}
              >
                Tìm kiếm
              </Button>
            </Col>
            <Col>
              <Button
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#CC9900",
                  color: "white",
                }}
                onClick={hanldeClear}
              >
                Làm mới
              </Button>
            </Col>
          </Row>
        </Card>
        <Card style={{ marginTop: "35px" }}>
          <h2 className="conten-employee">
            <FontAwesomeIcon icon={faLayerGroup} />
            <span style={{ marginLeft: "15px" }}>Danh sách</span>
          </h2>
          <Row justify="end" align="middle">
            <Tooltip title="Thêm mới">
              <Button
                style={{
                  width: "100px",
                  height: "40px",
                  margin: "0 10px 10px 10px ",
                  backgroundColor: "#3366CC",
                  color: "white",
                }}
                onClick={handleAddClick}
              >
                <FontAwesomeIcon icon={faPlus} />
                Thêm mới
              </Button>
            </Tooltip>
            <AddCategory visible={openAdd} onCancel={handleCancel} />
          </Row>
          <Table columns={columns} dataSource={data} rowKey="id" />
        </Card>
        <UpdateCategory
          category={idCategory}
          visible={openUpdate}
          onCancel={handleCancel}
        />
      </Form>
    </div>
  );
}
