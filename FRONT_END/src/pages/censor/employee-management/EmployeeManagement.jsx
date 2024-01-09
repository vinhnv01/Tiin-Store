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
  message,
} from "antd";
import showConfirmationModal from "../../../util/modal-confirm/ModalConfirm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./EmployeeManagement.model.css";

import { useAppDispatch } from "../../../app/hook";
import { EmployeeAPI } from "../../../apis/user/Employee.api";
import { SetEmployee } from "../../../app/reducer/Employee.reducer";

export default function EmployeeManagement() {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(100);

  const calculateAge = (birthdateInMillis) => {
    const birthDateObject = new Date(birthdateInMillis);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDateObject.getFullYear();
    if (
      currentDate.getMonth() < birthDateObject.getMonth() ||
      (currentDate.getMonth() === birthDateObject.getMonth() &&
        currentDate.getDate() < birthDateObject.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

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
      dataIndex: "avata",
      key: "avata",
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
      title: "Mã nhân viên",
      dataIndex: "code",
      key: "code",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <div style={{ textAlign: "center" }}>Họ và tên</div>,
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <div style={{ textAlign: "center" }}>Email</div>,
      dataIndex: "email",
      key: "email",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tuổi",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      align: "center",
      render: (text) => calculateAge(text),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
          color={text === "DANG_SU_DUNG" ? "green" : "red"}
          style={{
            fontSize: "14px",
            padding: "5px 10px",
            borderRadius: "10px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {text === "DANG_SU_DUNG" ? "Đang hoạt động" : "Ngừng hoạt động"}
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
              onClick={() => {
                nav(`/update-employee-management/${record.idUser}`);
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
          <Tooltip title="Hủy tài khoản">
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                height: "35px",
              }}
              onClick={() => {
                showConfirmationModal(
                  "Bạn có chắc muốn cập nhập trạng thái nhân viên " +
                    record.fullName +
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

  const [data, setData] = useState([]);
  const loadData = (search) => {
    EmployeeAPI.fetchAll(search)
      .then((res) => {
        dispatch(SetEmployee(res.data.data));
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const hanldeDelete = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append(`id`, JSON.stringify(data.idUser));
    formData.append(
      "status",
      JSON.stringify(
        data.status === "DANG_SU_DUNG" ? "KHONG_SU_DUNG" : "DANG_SU_DUNG"
      )
    );
    EmployeeAPI.updateStatus(formData)
      .then((res) => {
        message.success("Cập nhập thành công.");
        loadData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hanldeClear = () => {
    form.resetFields();
  };

  const hanldeSearch = () => {
    const values = form.getFieldsValue();
    const data = {
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      status: values.status,
    };
    console.log(data);
    loadData(data);
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
                  <Select.Option value="DANG_SU_DUNG">
                    Đang hoạt động
                  </Select.Option>
                  <Select.Option value="KHONG_SU_DUNG">
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
                width: "110px",
                height: "40px",
                margin: "0 10px 10px 10px ",
                backgroundColor: "#3366CC",
                color: "white",
              }}
              onClick={() => {
                nav("/create-employee-management");
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
              Thêm mới
            </Button>
          </Row>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Form>
    </div>
  );
}
