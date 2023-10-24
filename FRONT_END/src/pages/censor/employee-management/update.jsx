import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
import "./EmployeeManagement.model.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import QRScannerModal from "../../../util/QR-code/BarcodeScanner ";
import showConfirmationModal from "../../../util/modal-confirm/ModalConfirm";
import { AddressApi } from "../../../apis/address/address.api";
import { useParams } from "react-router-dom";
import moment from "moment";
import UpLoadImageUpdate from "../../../util/update-image/UpdoadImageUpdate";
export default function UpdateEmployeeManagement() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [fileImage, setFileIamge] = useState(null);
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [getOneEmployee, setOneEmployee] = useState({
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NcmW1L49mpX8yjmoevmZFQWb8OohSFXlpQ&usqp=CAU",
    fullName: "Nguyễn Văn Vinh",
    card: "012345679010",
    gender: "NAM",
    province: "Hà Nội",
    district: "Huyện Đan Phượng",
    ward: "Thọ An",
    line: "Số 10 ",
    birthday: moment(948472400000).format("YYYY-MM-DD"),
    email: "vinhnguyen010620@gmail.com",
    phoneNumber: "0123456789",
  });

  const handleFileUpload = (fileData) => {
    setFileIamge(fileData);
  };

  const [showModal, setShowModal] = useState(false);

  const handleScanButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const loadDataProvince = () => {
    AddressApi.fetchAllProvince().then((res) => {
      setListProvince(res.data.data);
    });
  };

  const handleProvinceChange = (value, valueProvince) => {
    form.setFieldsValue({ provinceId: valueProvince.valueProvince });
    AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
      (res) => {
        setListDistricts(res.data.data);
      }
    );
  };

  const handleDistrictChange = (value, valueDistrict) => {
    form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
  };

  const handleWardChange = (value, valueWard) => {
    form.setFieldsValue({ wardCode: valueWard.valueWard });
  };

  useEffect(() => {
    loadDataProvince();
  }, []);

  const handleSuccess = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(fileImage);
        console.log(values);
      })
      .catch((error) => {
        message.error("Vui lòng điền đủ thông tin vào tất cả các trường.");
      });
  };

  return (
    <div>
      <h1>
        <span style={{ marginLeft: "15px" }}>Chỉnh sửa nhân viên </span>
      </h1>
      <Form form={form} initialValues={getOneEmployee}>
        <Row gutter={16} style={{ marginTop: "30px" }}>
          <Col span={7}>
            <Card style={{ height: "100%" }}>
              <h2>Ảnh đại diện</h2>
              <Row>
                <UpLoadImageUpdate
                  onFileUpload={handleFileUpload}
                  defaultImage={getOneEmployee.image}
                />
              </Row>
            </Card>
          </Col>
          <Col span={17}>
            <Card style={{ height: "100%" }}>
              <h2>Thông tin nhân viên</h2>
              <Row
                justify="end"
                align="middle"
                style={{ marginBottom: "15px", marginTop: "10px" }}
              >
                <Col span={11}>
                  <Button
                    onClick={handleScanButtonClick}
                    style={{
                      width: "150px",
                      height: "40px",
                      margin: "0 10px 10px 10px ",
                      backgroundColor: "#3366CC",
                      color: "white",
                    }}
                  >
                    <FontAwesomeIcon icon={faQrcode} />
                    <span style={{ marginLeft: "10px" }}>QR-Căn cước</span>
                  </Button>
                  {showModal && (
                    <QRScannerModal
                      visible={showModal}
                      onCancel={handleModalClose}
                    />
                  )}
                  <Button
                    onClick={() =>
                      showConfirmationModal(
                        "Bạn có chắc muốn thêm ?",
                        handleSuccess
                      )
                    }
                    style={{
                      width: "110px",
                      height: "40px",
                      margin: "0 10px 10px 10px ",
                      backgroundColor: "#3366CC",
                      color: "white",
                    }}
                  >
                    Hoàn tất
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span={11} style={{ marginRight: "20px" }}>
                  <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    tooltip="Họ tên đầy đủ của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy nhập họ và tên.",
                        whitespace: true,
                      },
                      {
                        pattern: /^[A-Za-zÀ-Ỹà-ỹ\s]+$/,
                        message: "Họ và tên chỉ được phép chứa chữ cái.",
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 15 }}
                  >
                    <Input
                      onKeyPress={(e) => {
                        if (e.key === " " && e.target.selectionStart === 0) {
                          e.preventDefault();
                        }
                      }}
                      style={{ textAlign: "center" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="card"
                    label="Căn cước"
                    tooltip="Căn cước công dân của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy nhập căn cước công dân.",
                        whitespace: true,
                      },
                      {
                        pattern: /^\d{12}$/,
                        message: "Căn cước công dân cần phải 12 chữ số.",
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 15 }}
                  >
                    <Input style={{ textAlign: "center" }} />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    label="Giới tính"
                    tooltip="Giới tính của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn giới tính.",
                        whitespace: true,
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 15 }}
                  >
                    <Select defaultValue={""}>
                      <Select.Option value="">Chọn giới tính</Select.Option>
                      <Select.Option value="NAM">Nam</Select.Option>
                      <Select.Option value="NU">Nữ</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="province"
                    label="Tỉnh/Thành phố"
                    tooltip="Tỉnh/Thành phố của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn Tỉnh/Thành phố.",
                        whitespace: true,
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 15 }}
                  >
                    <Select defaultValue={""} onChange={handleProvinceChange}>
                      <Select.Option value="">
                        --Chọn Tỉnh/Thành phố--
                      </Select.Option>
                      {listProvince?.map((item) => {
                        return (
                          <Select.Option
                            key={item.ProvinceID}
                            value={item.ProvinceName}
                            valueProvince={item.ProvinceID}
                          >
                            {item.ProvinceName}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="ward"
                    label="Xã/Phường"
                    tooltip="Xã/Phường của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn Xã/Phường.",
                        whitespace: true,
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 15 }}
                  >
                    <Select defaultValue={""} onChange={handleWardChange}>
                      <Select.Option value="">--Chọn Xã/Phường--</Select.Option>
                      {listWard?.map((item) => {
                        return (
                          <Select.Option
                            key={item.WardCode}
                            value={item.WardName}
                            valueWard={item.WardCode}
                          >
                            {item.DistrictName}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={11} style={{ marginRight: "20px" }}>
                  <Form.Item
                    name="birthday"
                    label="Ngày sinh"
                    tooltip="Ngày sinh của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy nhập ngày sinh.",
                        whitespace: true,
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 15 }}
                  >
                    <Input type="date" style={{ textAlign: "center" }} />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    tooltip="Email của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy nhập email.",
                        whitespace: true,
                      },
                      {
                        type: "email",
                        message: "Vui lòng nhập đúng định dạng email.",
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 15 }}
                  >
                    <Input style={{ textAlign: "center" }} />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    tooltip="Số điện thoại của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy nhập số điện thoại.",
                        whitespace: true,
                      },
                      {
                        pattern: /^0\d{9}$/,
                        message: "Vui lòng nhập số điện thoại hợp lệ.",
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 15 }}
                  >
                    <Input style={{ textAlign: "center" }} />
                  </Form.Item>
                  <Form.Item
                    name="district"
                    label="Quận/Huyện"
                    tooltip="Quận/Huyện của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn Quận/Huyện.",
                        whitespace: true,
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 15 }}
                  >
                    <Select defaultValue={""} onChange={handleDistrictChange}>
                      <Select.Option value="">
                        --Chọn Quận/Huyện--
                      </Select.Option>
                      {listDistricts?.map((item) => {
                        return (
                          <Select.Option
                            key={item.DistrictID}
                            value={item.DistrictName}
                            valueDistrict={item.DistrictID}
                          >
                            {item.DistrictName}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="line"
                    label="Số nhà"
                    tooltip="Số nhà của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy nhập số nhà.",
                        whitespace: true,
                      },
                    ]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 15 }}
                  >
                    <Input style={{ textAlign: "center" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
