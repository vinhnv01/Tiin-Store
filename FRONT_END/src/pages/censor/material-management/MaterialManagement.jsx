import {
  faEye,
  faFilter,
  faLayerGroup,
  faPenToSquare,
  faPlus,
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
import { useEffect, useState } from "react";

import "./MaterialManagement.model.css";
import { CategoryAPI } from "../../../apis/category/category.api";
import ConvertLongToDate from "../../../util/date/ConverLongToDate";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducer/Category.reducer";
import UpdateMaterial from "./modal/update";
import ModalAddMaterial from "./modal/add.jsx";
import { MaterialAPI } from "../../../apis/material/material.api.js";
import {
  GetMaterial,
  SetMaterial,
} from "../../../app/reducer/Material.reducer.js";
import ModalUpdateMaterial from "./modal/update";
import ModalDetailMaterial from "./modal/Detail.jsx";

export default function MaterialManagement() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState({
    name: "",
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
      title: <div style={{ textAlign: "center" }}>Tên chất liệu</div>,
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
      render: (_, record) => <ConvertLongToDate long={record.createdDate} />,
    },
    {
      title: "Ngày cập nhập",
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      align: "center",
      render: (_, record) => (
        <ConvertLongToDate long={record.lastModifiedDate} />
      ),
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
          {text === "DANG_SU_DUNG" ? "Đang sử dụng" : "Ngừng sử dụng "}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chi tiết chất liệu">
            <Button
              onClick={() => handleDetailClick(record)}
              style={{
                backgroundColor: "#FF9900",
                color: "white",
                height: "35px",
              }}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Tooltip>
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
        </Space>
      ),
    },
  ];

  const data = useAppSelector(GetMaterial);
  const loadData = (search) => {
    MaterialAPI.fetchAll(search)
      .then((res) => {
        dispatch(SetMaterial(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadData(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const hanldeClear = () => {
    form.resetFields();
  };

  const hanldeSearch = () => {
    const values = form.getFieldsValue();
    const data = {
      name: values.fullName,
      status: values.status,
    };
    loadData(data);
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

  const [openDetail, setOpenDetail] = useState(false);
  const handleDetailClick = (id) => {
    setIdCategory(id);
    setOpenDetail(true);
  };

  const handleCancel = () => {
    setOpenAdd(false);
    setOpenUpdate(false);
    setOpenDetail(false);
  };

  return (
    <div>
      <div className="conten-category">
        <h1>
          <span style={{ marginLeft: "15px" }}>Quản lý chất liệu</span>
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
              <Form.Item name="fullName" label="Tên chất liệu">
                <Input placeholder="Nhập tên chất liệu." />
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
                  width: "110px",
                  height: "40px",
                  margin: "0 10px 10px 10px ",
                  backgroundColor: "#3366CC",
                  color: "white",
                }}
                onClick={handleAddClick}
              >
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                Thêm mới
              </Button>
            </Tooltip>
            <ModalAddMaterial visible={openAdd} onCancel={handleCancel} />
          </Row>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
        <ModalUpdateMaterial
          material={idCategory}
          visible={openUpdate}
          onCancel={handleCancel}
        />
        <ModalDetailMaterial
          material={idCategory}
          visible={openDetail}
          onCancel={handleCancel}
        />
      </Form>
    </div>
  );
}
