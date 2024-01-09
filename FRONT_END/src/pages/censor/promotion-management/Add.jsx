/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
} from "antd";
import "./PromotionManagement.model.css";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch } from "../../../app/hook";
import showConfirmationModal from "../../../util/modal-confirm/ModalConfirm";

export default function AddPromotion() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const dataType = [
    { name: "Theo sản phẩm", type: "TYPE_PRODUCT" },
    { name: "Theo Chi tiết sản phẩm", type: "TYPE_PRODUCT_DETAIL" },
    { name: "Theo giá trị đơn hàng", type: "TYPE_BILL" },
  ];

  const onChangeCheckBox = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleSuccessStatusPromotin = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {});
  };
  const handleSuccess = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="conten-category">
        <h1>
          <span style={{ marginLeft: "15px" }}>Thêm đợt giảm giá</span>
        </h1>
      </div>
      <Form form={form}>
        <Row justify="end" align="middle">
          <Tooltip title="Lưu bản nháp">
            <Button
              style={{
                height: "40px",
                margin: "0 10px 10px 10px ",
                backgroundColor: "#3366CC",
                color: "white",
              }}
              onClick={() =>
                showConfirmationModal(
                  "Bạn có chắc muốn lưu bản nháp ?",
                  handleSuccessStatusPromotin
                )
              }
            >
              Lưu nháp
            </Button>
          </Tooltip>
          <Tooltip title="Lưu và kích hoạt">
            <Button
              style={{
                height: "40px",
                margin: "0 10px 10px 10px ",
                backgroundColor: "#3366CC",
                color: "white",
              }}
              onClick={() =>
                showConfirmationModal(
                  "Bạn có chắc muốn lưu và kích hoạt ?",
                  handleSuccess
                )
              }
            >
              Lưu và kích hoạt
            </Button>
          </Tooltip>
        </Row>
        <Row justify={"center"}>
          <Col span={15}>
            <Card style={{ height: "350px" }}>
              <h2 className="conten-employee">
                <span style={{ marginLeft: "15px" }}>
                  Thông tin đợt giảm giá
                </span>
              </h2>
              <Row justify={"center"}>
                <Col span={12}>
                  <Form.Item
                    name="codePromtion"
                    label="Mã chương trình."
                    tooltip="Mã chương trình là gì?"
                    labelCol={{ span: 9 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="namePromotion"
                    label="Tên chương trình."
                    tooltip="Tên chương trình là gì?"
                    labelCol={{ span: 10 }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy nhập tên chương trình.",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify={"center"}>
                <Col span={12}>
                  <Row justify={"space-between"}>
                    <Col span={17}>
                      <Form.Item
                        name="quantity"
                        label="Số lượng."
                        tooltip="Số lượng chương trình là bao nhiêu ?"
                        labelCol={{ span: 9 }}
                        wrapperCol={{ span: 20 }}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy nhập số lượng.",
                          },
                        ]}
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Checkbox onChange={onChangeCheckBox}>Không hạn</Checkbox>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="typePromtion"
                    label="Phương thức."
                    tooltip="Phương thức giảm giá là gì?"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 20 }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn phương thức.",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Select defaultValue={""}>
                      <Select.Option value="" style={{ textAlign: "center" }}>
                        {" "}
                        --Chọn phương thức--
                      </Select.Option>
                      {dataType?.map((item) => {
                        return (
                          <Select.Option
                            key={item.type}
                            value={item.type}
                            style={{ textAlign: "center" }}
                          >
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="noteProduct" label="Mô tả">
                <TextArea rows={4} />
              </Form.Item>
            </Card>
          </Col>
          <Col span={8} style={{ marginLeft: "3%" }}>
            <Card style={{ height: "350px" }}>
              {" "}
              <h2 className="conten-employee">
                <span style={{ marginLeft: "15px" }}>Thời gian áp dụng</span>
              </h2>
              <Form.Item
                name="dateStart"
                label="Từ ngày"
                tooltip="Ngày bắt đầu chương trình là ?"
                labelCol={{ span: 9 }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy chọn ngày bắt đầu.",
                  },
                ]}
              >
                <DatePicker showTime />
              </Form.Item>
              <Form.Item
                name="dateEnd"
                label="Đến ngày"
                tooltip="=Ngày kết thúc chương trình là?"
                labelCol={{ span: 9 }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy chọn ngày kết thúc.",
                  },
                ]}
              >
                <DatePicker showTime />
              </Form.Item>
            </Card>
          </Col>
        </Row>
            <Card style={{marginTop:"30px"}}></Card>
      </Form>
    </>
  );
}
