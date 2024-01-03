import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import { useEffect } from "react";
import showConfirmationModal from "../../../../util/modal-confirm/ModalConfirm";
import { BrandAPI } from "../../../../apis/brand/brand.api";
import { useAppDispatch } from "../../../../app/hook";
import { UpdateBrand } from "../../../../app/reducer/Brand.reducer";

export default function ModalUpdateBrand({ brand, visible, onCancel }) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
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

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        const data = {
          ...values,
          id: brand.id,
        };
        BrandAPI.update(data)
          .then((res) => {
            dispatch(UpdateBrand(res.data.data));
            message.success("Cập nhập thành công.");
          })
          .catch((error) => {
            console.log(error);
          });
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
        title="Chỉnh sửa thương hiệu"
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() =>
              showConfirmationModal("Bạn có chắc muốn cập nhập ?", handleOk)
            }
          >
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
