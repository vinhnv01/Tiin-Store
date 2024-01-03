import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useEffect } from "react";

export default function ModalDetailBrand({ brand, visible, onCancel }) {
  const [form] = Form.useForm();
  const getOneById = () => {
    if (brand !== null) {
      form.setFieldsValue({
        name: brand.name,
        status: brand.status,
      });
    }
  };

  useEffect(() => {
    getOneById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa đế giày"
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
        ]}
      >
        <Form form={form}>
          {" "}
          <Row justify={"center"}>
            <Col span={24} style={{ marginRight: "20px", marginTop: "30px" }}>
              <Form.Item
                name="name"
                label="Tên đế giày"
                tooltip="Tên đế giày là gì?"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy nhập tên đế giày.",
                    whitespace: true,
                  },
                  {
                    pattern: /^[A-Za-zÀ-Ỹà-ỹ\s\-_]+$/,
                    message: "Tên đế giày chỉ được phép chứa chữ cái.",
                  },
                ]}
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
              >
                <Input
                  readOnly
                  onKeyPress={(e) => {
                    if (e.key === " " && e.target.selectionStart === 0) {
                      e.preventDefault();
                    }
                  }}
                  style={{ textAlign: "center" }}
                  placeholder="Vui lòng nhập tên đế giày."
                />
              </Form.Item>
              <Form.Item
                name="status"
                label="Trạng thái"
                tooltip="Trạng thái là gì?"
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
              >
                <Select defaultValue={""} style={{ textAlign: "center" }}>
                  <Select.Option value="DANG_SU_DUNG">
                    Đang sử dung
                  </Select.Option>
                  <Select.Option value="KHONG_SU_DUNG">
                    Ngừng sử dụng
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
