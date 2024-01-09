/* eslint-disable react-hooks/exhaustive-deps */
import {
  faFilter,
  faLayerGroup,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row,
  Select,
  Slider,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import ConvertLongToDate from "../../../util/date/ConverLongToDate";
import { GetProduct, SetProduct } from "../../../app/reducer/Product.reducer";
import { ProductAPI } from "../../../apis/product/product.api";
import { useEffect, useState } from "react";
import { GetColor, SetColor } from "../../../app/reducer/Color.reducer";
import { GetSize, SetSize } from "../../../app/reducer/Size.reducer";
import { GetSole, SetSole } from "../../../app/reducer/Sole.reducer";
import {
  GetMaterial,
  SetMaterial,
} from "../../../app/reducer/Material.reducer";
import { GetBrand, SetBrand } from "../../../app/reducer/Brand.reducer";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducer/Category.reducer";
import { CategoryAPI } from "../../../apis/category/category.api";
import { BrandAPI } from "../../../apis/brand/brand.api";
import { MaterialAPI } from "../../../apis/material/material.api";
import { SoleAPI } from "../../../apis/sole/sole.api";
import { SizeAPI } from "../../../apis/size/size.api";
import { ColorAPI } from "../../../apis/color/color.api";
import showConfirmationModal from "../../../util/modal-confirm/ModalConfirm";
import {
  GetProductDetail,
  SetProductDetail,
} from "../../../app/reducer/ProductDetail.reducer";
import { ProductDetailAPI } from "../../../apis/product-detail/productDetail.api";

import("./ProductDetailManagement.model.css");
export default function UpdateProductDetail() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(100);

  const [search, setSearch] = useState({
    name: "",
    status: "",
  });

  const dataCategory = useAppSelector(GetCategory);
  const dataBrand = useAppSelector(GetBrand);
  const dataMaterial = useAppSelector(GetMaterial);
  const dataSole = useAppSelector(GetSole);
  const dataSize = useAppSelector(GetSize);
  const dataColor = useAppSelector(GetColor);
  const dataProductDetail = useAppSelector(GetProductDetail);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "imageProductDetail",
      key: "imageProductDetail",
      align: "center",
      width: "7%",
      render: (text, record) => (
        <>
          <Badge.Ribbon
            text={record.totalQuantity}
            color={record.totalQuantity > 50 ? "#EE0000" : "#FF9900"}
          >
            <img
              src={text}
              alt="Ảnh sản phẩm"
              style={{ width: "100px", borderRadius: "10%", height: "100px" }}
            />
          </Badge.Ribbon>
        </>
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Tên sản phẩm</div>,
      dataIndex: "nameProductDetail",
      key: "nameProductDetail",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Số lượng tồn",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Màu sắc",
      dataIndex: "codeColor",
      key: "codeColor",
      align: "center",
      render: (_, record) => (
        <Button style={{ backgroundColor: record.codeColor, width: "60px" }} />
      ),
    },
    {
      title: "Ngày khởi tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
      render: (_, record) => <ConvertLongToDate long={record.createdDate} />,
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
          <Tooltip title="Sửa">
            <Button
              // onClick={() => handleUpdateClick(record)}
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

  const loadData = (search) => {
    CategoryAPI.fetchAll(search).then((res) => {
      dispatch(SetCategory(res.data.data));
    });
    BrandAPI.fetchAll(search).then((res) => {
      dispatch(SetBrand(res.data.data));
    });
    MaterialAPI.fetchAll(search).then((res) => {
      dispatch(SetMaterial(res.data.data));
    });
    SoleAPI.fetchAll(search).then((res) => {
      dispatch(SetSole(res.data.data));
    });
    SizeAPI.fetchAll(search).then((res) => {
      dispatch(SetSize(res.data.data));
    });
    ColorAPI.fetchAll(search).then((res) => {
      dispatch(SetColor(res.data.data));
    });
    ProductAPI.fetchAll(search).then((res) => {
      dispatch(SetProduct(res.data.data));
    });
    ProductDetailAPI.fetchAll().then((res) => {
      dispatch(SetProductDetail(res.data.data));
    });
  };

  useEffect(() => {
    loadData();
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
    console.log(values);
  };

  // cập nhập giá chung
  const [openQuantityAndPrice, setQuantityAndPrice] = useState(false);
  const handleUpdateQuantityAndPrice = (newValues) => {
    setQuantityAndPrice(false);
  };

  const showModalQuantityAndPrice = () => {
    setQuantityAndPrice(true);
  };
  const handleCancelQuantityAndPrice = () => {
    setQuantityAndPrice(false);
  };

  const handleSuccessUpdateQuantityAndPrice = () => {};

  return (
    <>
      <div className="conten-category">
        <h1>
          <span style={{ marginLeft: "15px" }}>Quản lý phiên bản sản phẩm</span>
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
            <Col span={7} style={{ marginRight: "20px" }}>
              <Form.Item
                name="category"
                label="Thể loại"
                tooltip="Thể loại sản phẩm là gì?"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
              >
                <Select defaultValue={""}>
                  <Select.Option value="" style={{ textAlign: "center" }}>
                    --Tất cả--
                  </Select.Option>
                  {dataCategory?.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        value={item.name}
                        style={{ textAlign: "center" }}
                      >
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="material"
                label="Chất liệu"
                tooltip="Chất liệu sản phẩm là gì?"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
              >
                <Select defaultValue={""}>
                  <Select.Option value="" style={{ textAlign: "center" }}>
                    --Tất cả--
                  </Select.Option>
                  {dataMaterial?.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        value={item.name}
                        style={{ textAlign: "center" }}
                      >
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="size"
                label="Kích cỡ"
                tooltip="Kích cỡ sản phẩm là gì?"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
              >
                <Select defaultValue={""}>
                  <Select.Option value="" style={{ textAlign: "center" }}>
                    --Tất cả--
                  </Select.Option>
                  {dataSize?.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        value={item.name}
                        style={{ textAlign: "center" }}
                      >
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={7} style={{ marginRight: "20px" }}>
              <Form.Item
                name="brand"
                label="Thương hiệu"
                tooltip="Thương hiệu sản phẩm là gì?"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
              >
                <Select defaultValue={""}>
                  <Select.Option value="" style={{ textAlign: "center" }}>
                    --Tất cả--
                  </Select.Option>
                  {dataBrand?.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        value={item.name}
                        style={{ textAlign: "center" }}
                      >
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="sole"
                label="Đế giày"
                tooltip="Đế giày sản phẩm là gì?"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
              >
                <Select defaultValue={""}>
                  <Select.Option value="" style={{ textAlign: "center" }}>
                    --Tất cả--
                  </Select.Option>
                  {dataSole?.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        value={item.name}
                        style={{ textAlign: "center" }}
                      >
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="color"
                label="Màu sắc"
                tooltip="Màu sắc sản phẩm là gì?"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
              >
                <Select defaultValue={""}>
                  <Select.Option value="" style={{ textAlign: "center" }}>
                    --Tất cả--
                  </Select.Option>
                  {dataColor?.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        value={item.code}
                        style={{ textAlign: "center" }}
                      >
                        <Button
                          style={{ backgroundColor: item.code, width: "100%" }}
                        ></Button>
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={7} style={{ marginLeft: "20px" }}>
              <Form.Item
                label="Trạng thái"
                name="status"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
                tooltip="Trạng thái sản phẩm là gì?"
              >
                <Select defaultValue={""}>
                  <Select.Option value="" style={{ textAlign: "center" }}>
                    --Tất cả--
                  </Select.Option>
                  <Select.Option
                    value="DANG_SU_DUNG"
                    style={{ textAlign: "center" }}
                  >
                    Đang sử dụng
                  </Select.Option>
                  <Select.Option
                    value="KHONG_SU_DUNG"
                    style={{ textAlign: "center" }}
                  >
                    Ngừng sử dụng
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="gender"
                label="Giới tính"
                tooltip="Giới tính sản phẩm là gì?"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
              >
                <Select defaultValue={""}>
                  <Select.Option value="" style={{ textAlign: "center" }}>
                    --Tất cả--
                  </Select.Option>
                  <Select.Option
                    value="NAM_VA_NU"
                    style={{ textAlign: "center" }}
                  >
                    Nam và Nữ
                  </Select.Option>
                  <Select.Option value="NAM" style={{ textAlign: "center" }}>
                    Nam
                  </Select.Option>
                  <Select.Option value="NU" style={{ textAlign: "center" }}>
                    Nữ
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="number"
                label="Số lượng"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
                tooltip="Tống số lượng sản phẩm là bao nhiêu ?"
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
            <Tooltip title=" Chỉnh số lượng và giá chung">
              <Button
                type="primary"
                htmlType="submit"
                onClick={showModalQuantityAndPrice}
                style={{
                  height: "40px",
                  margin: "0 10px 10px 10px ",
                  backgroundColor: "#3366CC",
                  color: "white",
                }}
              >
                Chỉnh số lượng và giá chung
              </Button>
            </Tooltip>
            <Tooltip title="Cập nhập giá và số lượng">
              <Button
                style={{
                  height: "40px",
                  margin: "0 10px 10px 10px ",
                  backgroundColor: "#3366CC",
                  color: "white",
                }}
                onClick={() =>
                  showConfirmationModal(
                    "Bạn có chắc muốn cập nhập giá và số lượng ?",
                    handleSuccessUpdateQuantityAndPrice
                  )
                }
              >
                Cập nhập
              </Button>
            </Tooltip>
          </Row>
          <Table
            columns={columns}
            dataSource={dataProductDetail}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Form>
    </>
  );
}
