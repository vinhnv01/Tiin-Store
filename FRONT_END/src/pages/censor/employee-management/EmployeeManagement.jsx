import {
  faFilter,
  faPenToSquare,
  faPlus,
  faTrash,
  faUsersLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Slider,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import showConfirmationModal from "../../../util/modal-confirm/ModalConfirm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./EmployeeManagement.model.css";

export default function EmployeeManagement() {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(100);

  const [search, setSearch] = useState({
    fullName: "",
    phoneNumber: "",
    status: "",
    ageMin: 0,
    ageMax: 0,
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: " Ảnh",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (text) => (
        <Image
          width={100}
          height={90}
          style={{ borderRadius: "15px" }}
          src={text}
        />
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Họ và tên</div>,
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
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
          {text === "DANG_HOAT_DONG" ? "Đang hoạt động" : "Ngừng hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Hủy tài khoản">
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                height: "35px",
              }}
              onClick={() => {
                showConfirmationModal(
                  "Bạn có chắc muốn xóa nhân viên " +
                    record.fullName +
                    " không ? ",
                  () => hanldeDelete(record)
                );
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Tooltip>
          <Tooltip title="Sửa">
            <Button
              onClick={() => {
                nav(`/update-employee-management/${record.id}`);
              }}
              style={{
                backgroundColor: "#0066CC",
                color: "white",
                height: "35px",
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
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
      fullName: "John Brown",
      image:
        "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      age: 32,
      address: "New York No. 1 Lake Park",
      status: "DANG_HOAT_DONG",
    },
    {
      stt: 2,
      id: "2",
      fullName: "John Brown 2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXsJKebNLSLsSC0PY6zUagtfpuYhkxk9jJYw&usqp=CAU",
      age: 32,
      address: "New York No. 1 Lake Park",
      status: "NGUNG_HOAT_DONG",
    },
    {
      stt: 2,
      id: "3",
      fullName: "John Brown 3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQZljZ5zv6I2nQt902zFQrCZcHeZOQ5t9pe5Ky7Mpxa0aOPeYaMBpk2QdjSi27IKRK2w0&usqp=CAU",
      age: 32,
      address: "New York No. 1 Lake Park",
      status: "NGUNG_HOAT_DONG",
    },
  ];

  const handleUpdate = (data) => {
    console.log(data);
  };

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

  return (
    <div>
      <div className="conten-employee">
        <h1>
          <span style={{ marginLeft: "15px" }}>Quản lý nhân viên</span>
        </h1>
      </div>
      <Form form={form}>
        <Card>
          <h2 className="conten-employee">
            <FontAwesomeIcon icon={faFilter} />
            <span style={{ marginLeft: "15px" }}>Bộ lọc</span>
          </h2>

          <Row justify={"center"}>
            <Col span={10} style={{ marginRight: "20px" }}>
              <Form.Item name="fullName" label="Họ và tên">
                <Input placeholder="Nhập họ và tên nhân viên." />
              </Form.Item>
              <Form.Item
                label="Trạng thái"
                name="status"
                style={{ marginTop: "35px" }}
              >
                <Select defaultValue={""}>
                  <Select.Option value="">Tất cả</Select.Option>
                  <Select.Option value="DANG_HOAT_DONG">
                    Đang hoạt động
                  </Select.Option>
                  <Select.Option value="NGUNG_HOAT_DONG">
                    Ngừng hoạt động
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10} style={{ marginLeft: "20px" }}>
              <Form.Item name="phoneNumber" label="Số điện thoại">
                <Input placeholder="Nhập số điện thoại của nhận viên." />
              </Form.Item>
              <Form.Item
                name="age"
                label="Độ tuổi"
                style={{ marginTop: "35px" }}
              >
                <Slider
                  range
                  defaultValue={[ageMin, ageMax]}
                  tooltip={{
                    open: true,
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" align="middle" style={{ marginTop: "20px" }}>
            <Col>
              <Button
                style={{
                  marginRight: "10px",
                  backgroundColor: "#1C86EE",
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
            <FontAwesomeIcon icon={faUsersLine} />
            <span style={{ marginLeft: "15px" }}>Danh sách</span>
          </h2>
          <Row justify="end" align="middle">
            <Button
              style={{
                width: "100px",
                height: "40px",
                margin: "0 10px 10px 10px ",
                backgroundColor: "#3366CC",
                color: "white",
              }}
              onClick={() => {
                nav("/create-employee-management");
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Thêm mới
            </Button>
          </Row>
          <Table columns={columns} dataSource={data} rowKey="id" />
        </Card>
      </Form>
    </div>
  );
}
