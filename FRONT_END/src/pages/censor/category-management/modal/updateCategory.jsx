import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";

export default function UpdateCategory({ category, visible, onCancel }) {
  const [form] = Form.useForm();

  const getOneById = () => {
    if (category !== null) {
      form.setFieldsValue({
        name: category.name,
        status: category.status,
      });
    }
  };

  useEffect(() => {
    getOneById();
  }, [category]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        form.resetFields();
        onCancel();
      })
      .catch((error) => {});
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa  thể loại"
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Cập nhật
          </Button>,
        ]}
      >
        <Form form={form}>
          {" "}
          <Row justify={"center"}>
            <Col span={24} style={{ marginRight: "20px", marginTop: "30px" }}>
              <Form.Item
                name="name"
                label="Tên thể loại"
                tooltip="Tên thể loại là gì?"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy nhập tên thể loại.",
                    whitespace: true,
                  },
                  {
                    pattern: /^[A-Za-zÀ-Ỹà-ỹ\s\-_]+$/,
                    message: "Tên thể loại chỉ được phép chứa chữ cái.",
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
                  placeholder="Vui lòng nhập tên thể loại."
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
                  <Select.Option value="">Chọn trạng thái</Select.Option>
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
