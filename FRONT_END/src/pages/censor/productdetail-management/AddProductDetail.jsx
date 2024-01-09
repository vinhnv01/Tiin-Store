/* eslint-disable react-hooks/exhaustive-deps */
import {
  AutoComplete,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducer/Category.reducer";
import { CategoryAPI } from "../../../apis/category/category.api";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetBrand, SetBrand } from "../../../app/reducer/Brand.reducer";
import {
  GetMaterial,
  SetMaterial,
} from "../../../app/reducer/Material.reducer";
import { GetSole, SetSole } from "../../../app/reducer/Sole.reducer";
import { BrandAPI } from "../../../apis/brand/brand.api";
import { MaterialAPI } from "../../../apis/material/material.api";
import { SoleAPI } from "../../../apis/sole/sole.api";
import ModalAddSole from "../sole-management/modal/add";
import ModalAddBrand from "../brand-management/modal/add";
import ModalAddCategory from "../category-management/modal/addCategory";
import ModalAddMaterial from "../material-management/modal/add";
import showConfirmationModal from "../../../util/modal-confirm/ModalConfirm";
import { GetSize, SetSize } from "../../../app/reducer/Size.reducer";
import { GetColor, SetColor } from "../../../app/reducer/Color.reducer";
import { SizeAPI } from "../../../apis/size/size.api";
import { ColorAPI } from "../../../apis/color/color.api";
import ShowModalAddColor from "../../../util/modal-confirm/ModalAddColor";
import { useNavigate } from "react-router-dom";
import { GetProduct, SetProduct } from "../../../app/reducer/Product.reducer";
import { ProductAPI } from "../../../apis/product/product.api";
import useDebounce from "../../../util/useDebounce";

export default function AddProductDetail() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  // data thuộc tính
  const dataCategory = useAppSelector(GetCategory);
  const dataBrand = useAppSelector(GetBrand);
  const dataMaterial = useAppSelector(GetMaterial);
  const dataSole = useAppSelector(GetSole);
  const dataSize = useAppSelector(GetSize);
  const dataColor = useAppSelector(GetColor);
  const dataProduct = useAppSelector(GetProduct);

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
    ProductAPI.getAll(search).then((res) => {
      dispatch(SetProduct(res.data.data));
    });
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, []);

  //search prducts
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleSearch = (value) => {
    setValueInput(value);
  };

  const renderOptions = (nameList) => {
    return nameList.map((product, index) => ({
      key: `${product}-${index}`,
      value: product.name,
      label: product.name,
    }));
  };

  const [valueInput, setValueInput] = useState("");
  const debouncedNameValue = useDebounce(valueInput, 700);

  useEffect(() => {
    ProductAPI.fetchAll({
      name: valueInput,
      status: "DANG_SU_DUNG",
    }).then((res) => {
      dispatch(SetProduct(res.data.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNameValue]);

  // add category
  const [openModalSole, setOpenModalSole] = useState(false);
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [openModalBrand, setOpenModalBrand] = useState(false);
  const [openModalMaterial, setOpenModalMaterial] = useState(false);
  const [openModalColor, setOpenModalColor] = useState(false);

  const handleAddSoleClick = () => {
    setOpenModalSole(true);
  };
  const handleAddCategoryClick = () => {
    setOpenModalCategory(true);
  };
  const handleAddBrandClick = () => {
    setOpenModalBrand(true);
  };
  const handleAddMaterialClick = () => {
    setOpenModalMaterial(true);
  };
  const handleAddColorClick = () => {
    setOpenModalColor(true);
  };
  const handleCancel = () => {
    setOpenModalSole(false);
    setOpenModalBrand(false);
    setOpenModalCategory(false);
    setOpenModalMaterial(false);
    setOpenModalColor(false);
  };

  const [listColor, setListColor] = useState([]);
  const [listSize, setListSize] = useState([]);
  // kích cỡ
  const optionsSize = [];
  for (let i = 0; i < dataSize.length; i++) {
    optionsSize.push({
      label: dataSize[i].name,
      value: dataSize[i].id,
    });
  }
  const handleChangeSize = (value) => {
    setListSize(value);
  };

  // màu sắc
  const optionsColor = [];
  for (let i = 0; i < dataColor.length; i++) {
    optionsColor.push({
      label: dataColor[i].name,
      value: dataColor[i].id,
    });
  }
  const handleChangeColor = (value) => {
    setListColor(value);
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={label}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
          border: "1px solid black",
        }}
      >
        <span style={{ marginRight: 8, color: "white" }}>{label}</span>
        <span
          style={{
            backgroundColor: value,
            width: 20,
            height: 20,
            display: "inline-block",
            borderRadius: 2,
          }}
        ></span>
      </Tag>
    );
  };

  //QR code mã vạch
  const [qrResult, setQrResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleScanButtonClick = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleQRResult = (result) => {
    if (result != null) {
      setShowModal(false);
    }
    setQrResult(result);
  };

  // handleSuccess
  const handleSuccess = () => {
    form
      .validateFields()
      .then((values) => {
        if (listColor.length === 0) {
          message.warning("Vui lòng chọn màu sắc cho sản phẩm.");
          return;
        }
        if (listSize.length === 0) {
          message.warning("Vui lòng chọn kích cỡ cho sản phẩm.");
          return;
        }
        nav("/list-variant-product-detail", {
          state: {
            dataProduct: values,
            dataListColor: listColor,
            dataListSize: listSize,
          },
        });
      })
      .catch(() => {
        message.error("Vui lòng điền đủ thông tin vào tất cả các trường.");
      });
  };

  const handleExit = () => {
    form.resetFields();
    nav("/product-detail-management");
  };

  return (
    <>
      <Row>
        <Col span={19}>
          <div className="conten-category">
            <span
              style={{
                marginLeft: "15px",
                fontSize: "22px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Thêm mới sản phẩm
            </span>
          </div>
        </Col>
      </Row>
      <Form form={form}>
        <Row justify={"center"}>
          <Col span={15} style={{ marginRight: "3%" }}>
            <Card style={{ height: "400px" }}>
              <h2 className="conten-employee">
                <span style={{ marginLeft: "15px" }}>Thông tin sản phẩm</span>
              </h2>

              <Row justify={"center"}>
                <Col span={10} style={{ marginRight: "8%" }}>
                  <Form.Item name="codeProduct" label="Mã sản phẩm">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Tên sản phẩm"
                    name="nameProduct"
                    tooltip="Tên sản phẩm là gì?"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên sản phẩm.",
                      },
                      {
                        validator: (_, value) => {
                          if (value && value.trim() === "") {
                            return Promise.reject(
                              "Không được chỉ nhập khoảng trắng"
                            );
                          }
                          if (
                            !/^(?=.*[a-zA-Z]|[À-ỹ])[a-zA-Z\dÀ-ỹ\s\-_]*$/.test(
                              value
                            )
                          ) {
                            return Promise.reject(
                              "Phải chứa ít nhất một chữ cái và không có ký tự đặc biệt"
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <AutoComplete
                      options={renderOptions(dataProduct)}
                      placeholder="Nhập tên sản phẩm"
                      onSearch={handleSearch}
                      onSelect={(value) => {
                        setSelectedProduct(value);
                      }}
                      value={selectedProduct}
                    >
                      <Input
                        className="form-input"
                        style={{ fontWeight: "bold", textAlign: "center" }}
                        onChange={(e) => {
                          setSelectedProduct(e.target.value.trim());
                        }}
                        onKeyDown={(e) => {
                          if (e.key === " " && e.target.value === "") {
                            e.preventDefault();
                            const inputValue = e.target.value.replace(
                              /\s/g,
                              ""
                            );
                            setSelectedProduct(inputValue);
                          }
                        }}
                      />
                    </AutoComplete>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="noteProduct"
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả sản phẩm.",
                  },
                ]}
              >
                <TextArea rows={9} />
              </Form.Item>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ height: "400px" }}>
              <h2 className="conten-employee">
                <span style={{ marginLeft: "15px" }}>Thuộc tính</span>
              </h2>
              <Row>
                <Col span={19}>
                  <Form.Item
                    name="idCategory"
                    label="Thể loại"
                    tooltip="Thể loại sản phẩm là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn thể loại.",
                        whitespace: true,
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <Select defaultValue={""}>
                      <Select.Option value="">--Chọn thể loại--</Select.Option>
                      {dataCategory?.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Tooltip title="Thêm mới thể loại">
                    <Button
                      style={{
                        height: "35px",
                        margin: "0 10px 10px 10px ",
                        backgroundColor: "#3366CC",
                        color: "white",
                      }}
                      onClick={handleAddCategoryClick}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
              <Row>
                <Col span={19}>
                  <Form.Item
                    name="idBrand"
                    label="Thương hiệu"
                    tooltip="Thương hiệu sản phẩm là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn thương hiệu.",
                        whitespace: true,
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <Select defaultValue={""}>
                      <Select.Option value="">
                        --Chọn thương hiệu--
                      </Select.Option>
                      {dataBrand?.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Tooltip title="Thêm mới thương hiệu ">
                    <Button
                      style={{
                        height: "35px",
                        margin: "0 10px 10px 10px ",
                        backgroundColor: "#3366CC",
                        color: "white",
                      }}
                      onClick={handleAddBrandClick}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
              <Row>
                <Col span={19}>
                  <Form.Item
                    name="idMaterial"
                    label="Chất liệu"
                    tooltip="Chất liệu sản phẩm là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn chất liệu.",
                        whitespace: true,
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <Select defaultValue={""}>
                      <Select.Option value="">--Chọn chất liệu--</Select.Option>
                      {dataMaterial?.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Tooltip title="Thêm mới chất liệu">
                    <Button
                      style={{
                        height: "35px",
                        margin: "0 10px 10px 10px ",
                        backgroundColor: "#3366CC",
                        color: "white",
                      }}
                      onClick={handleAddMaterialClick}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
              <Row>
                <Col span={19}>
                  <Form.Item
                    name="idSole"
                    label="Đế giày"
                    tooltip="Đế giày sản phẩm là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn đế giày.",
                        whitespace: true,
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <Select defaultValue={""}>
                      <Select.Option value="">--Chọn đế giày--</Select.Option>
                      {dataSole?.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Tooltip title="Thêm mới đế giày">
                    <Button
                      style={{
                        height: "35px",
                        margin: "0 10px 10px 10px ",
                        backgroundColor: "#3366CC",
                        color: "white",
                      }}
                      onClick={handleAddSoleClick}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
              <Row>
                <Col span={19}>
                  <Form.Item
                    name="gender"
                    label="Giới tính"
                    tooltip="Giới tính sản phẩm là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn giới tính.",
                        whitespace: true,
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <Select defaultValue={""}>
                      <Select.Option value="">--Chọn giới tính--</Select.Option>
                      <Select.Option value="NAM_VA_NU">Nam và Nữ</Select.Option>
                      <Select.Option value="NAM">Nam</Select.Option>
                      <Select.Option value="NU">Nữ</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <ModalAddSole visible={openModalSole} onCancel={handleCancel} />
            <ModalAddCategory
              visible={openModalCategory}
              onCancel={handleCancel}
            />
            <ModalAddBrand visible={openModalBrand} onCancel={handleCancel} />
            <ModalAddMaterial
              visible={openModalMaterial}
              onCancel={handleCancel}
            />
          </Col>
        </Row>
        <Card style={{ marginTop: "20px" }}>
          <h2 className="conten-employee">
            <span style={{ marginLeft: "15px" }}>Màu sắc và kích cỡ</span>
          </h2>
          <Row>
            <Col span={4}>
              <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                Kích cỡ :{" "}
              </span>
            </Col>
            <Col span={15}>
              <Space
                style={{
                  width: "100%",
                }}
                direction="vertical"
              >
                <Select
                  mode="multiple"
                  allowClear
                  maxTagCount={16}
                  style={{
                    width: "100%",
                    height: "35px",
                  }}
                  placeholder="Vui lòng chọn kích cỡ sản phẩm"
                  onChange={handleChangeSize}
                  options={optionsSize}
                />
              </Space>
            </Col>
            <Col span={3}>
              <Tooltip title="Thêm mới kích cỡ">
                <Button
                  style={{
                    height: "35px",
                    margin: "0 10px 10px 10px ",
                    backgroundColor: "#3366CC",
                    color: "white",
                  }}
                  onClick={handleAddCategoryClick}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                Màu sắc :{" "}
              </span>
            </Col>
            <Col span={15}>
              <Space
                style={{
                  width: "100%",
                }}
                direction="vertical"
              >
                <Select
                  mode="multiple"
                  tagRender={tagRender}
                  style={{
                    width: "100%",
                    height: "35px",
                  }}
                  maxTagCount={6}
                  placeholder="Vui lòng chọn màu sắc sản phẩm"
                  onChange={handleChangeColor}
                  options={optionsColor}
                  optionLabelProp="label"
                />
              </Space>
            </Col>
            <Col span={3}>
              <Tooltip title="Thêm mới màu sắc">
                <Button
                  style={{
                    height: "35px",
                    margin: "0 10px 10px 10px ",
                    backgroundColor: "#3366CC",
                    color: "white",
                  }}
                  onClick={handleAddColorClick}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </Tooltip>
            </Col>
          </Row>
          <ShowModalAddColor visible={openModalColor} onCancel={handleCancel} />
        </Card>
        <Row justify={"end"} style={{ marginTop: "7px" }}>
          <Button
            onClick={() =>
              showConfirmationModal("Bạn có chắc muốn hủy ?", handleExit)
            }
            style={{
              width: "110px",
              height: "40px",
              margin: "0 10px 10px 10px ",
              backgroundColor: "white",
              color: "Black",
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={() =>
              showConfirmationModal("Bạn có chắc muốn thêm ?", handleSuccess)
            }
            style={{
              width: "110px",
              height: "40px",
              margin: "0 10px 10px 10px ",
              backgroundColor: "#3366CC",
              color: "white",
            }}
          >
            Tiếp theo
          </Button>
        </Row>
      </Form>
    </>
  );
}
