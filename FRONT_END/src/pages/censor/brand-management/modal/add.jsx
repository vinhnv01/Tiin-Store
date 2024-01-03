import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { useAppDispatch } from "../../../../app/hook";
import showConfirmationModal from "../../../../util/modal-confirm/ModalConfirm";
import { BrandAPI } from "../../../../apis/brand/brand.api";
import { CreateBrand } from "../../../../app/reducer/Brand.reducer";

export default function ModalAddBrand({ visible, onCancel }) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const category = {
          ...values,
          status: "DANG_SU_DUNG",
        };
        BrandAPI.create(category)
          .then((res) => {
            dispatch(CreateBrand(res.data.data));
            message.success("Thêm thành công");
            form.resetFields();
            onCancel();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {});
  };

  return (
    <>
      <Modal
        title="Thêm thương hiệu"
        open={visible}
        onOk={handleOk}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() =>
              showConfirmationModal("Bạn có chắc muốn thêm ?", handleOk)
            }
          >
            Thêm
          </Button>,
        ]}
      >
        <Form form={form}>
          {" "}
          <Row justify={"center"}>
            <Col span={24} style={{ marginRight: "20px", marginTop: "30px" }}>
              <Form.Item
                name="name"
                label="Tên thương hiệu"
                tooltip="Tên thương hiệu là gì?"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy nhập tên thương hiệu.",
                    whitespace: true,
                  },
                  {
                    pattern: /^[A-Za-zÀ-Ỹà-ỹ\s\-_]+$/,
                    message: "Tên thương hiệu chỉ được phép chứa chữ cái.",
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
                  placeholder="Vui lòng nhập tên thương hiệu."
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
