import { Col, Form, Input, Modal, Row, message } from "antd";

export default function AddCategory({ visible, onCancel }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {});
  };
  return (
    <>
      <Modal
        title="Thêm thể loại"
        open={visible}
        onOk={handleOk}
        onCancel={onCancel}
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
                initialValue="Đang sử dụng"
              >
                <Input readOnly style={{ textAlign: "center" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
