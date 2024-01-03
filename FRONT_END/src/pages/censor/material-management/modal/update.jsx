import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import { useEffect } from "react";
import showConfirmationModal from "../../../../util/modal-confirm/ModalConfirm";
import { useAppDispatch } from "../../../../app/hook";
import { MaterialAPI } from "../../../../apis/material/material.api";
import { UpdateMaterial } from "../../../../app/reducer/Material.reducer";

export default function ModalUpdateMaterial({ material, visible, onCancel }) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const getOneById = () => {
    if (material !== null) {
      form.setFieldsValue({
        name: material.name,
        status: material.status,
      });
    }
  };

  useEffect(() => {
    getOneById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [material]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        const data = {
          ...values,
          id: material.id,
        };
        MaterialAPI.update(data)
          .then((res) => {
            dispatch(UpdateMaterial(res.data.data));
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
        title="Chỉnh sửa chất liệu"
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
                label="Tên chất liệu"
                tooltip="Tên chất liệu là gì?"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy nhập tên chất liệu.",
                    whitespace: true,
                  },
                  {
                    pattern: /^[A-Za-zÀ-Ỹà-ỹ\s\-_]+$/,
                    message: "Tên chất liệu chỉ được phép chứa chữ cái.",
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
                  placeholder="Vui lòng nhập tên chất liệu."
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
