import { Button, Modal, Table, Tag, Tooltip } from "antd";

export const ModalProductDetail = ({ isModalOpen, handleOk, handleCancel }) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      width: 8,
    },
    {
      title: <div style={{ textAlign: "center" }}>Ảnh</div>,
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      key: "nameProduct",
    },
    {
      title: "Giá bán",
      dataIndex: "nameProduct",
      key: "nameProduct",
    },
    {
      title: "Số lượng tồn",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: 8,
      align: "center",
      render: (_, record) => (
        <>
          <Tag
            color={record.status === "DANG_SU_DUNG" ? "geekblue" : "green"}
            style={{
              borderRadius: "10px",
              padding: "5px 10px",
              fontSize: "14px",
              width: "120px",
              textAlign: "center",
            }}
          >
            {record.status === "DANG_SU_DUNG"
              ? "Đang sử dụng"
              : "Không sử dụng"}
          </Tag>
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 7,
      align: "center",
      render: (_, record) => (
        <Tooltip title="Thêm vào giỏ hàng">
          <Button type="primary" style={{ backgroundColor: "#3366CC" }}>
            chọn
          </Button>
        </Tooltip>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      stt: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      status: "DANG_SU_DUNG",
    },
    {
      key: "2",
      stt: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      status: "DANG_SU_DUNG1",
    },
  ];

  return (
    <>
      <Modal
        title="Sản phẩm "
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
        width={1000}
        height={500}
      >
        <Table columns={columns} dataSource={data} />
      </Modal>
    </>
  );
};
