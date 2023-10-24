import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "antd";
import { useState } from "react";
import { ModalProductDetail } from "./ModalProductDetail";

export const TabsContent = () => {
  const [listProductDetails, setListProductDetails] = useState([]);
  const [openModalProductDetail, setOpenModalProductDetail] = useState(false);

  const handleAddProduct = () => {
    setOpenModalProductDetail(true);
  };

  const handleModalProductDetailOk = () => {
    setOpenModalProductDetail(false);
  };

  const handleModalProductDetailCancel = () => {
    setOpenModalProductDetail(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>
          <Tooltip title="Danh sách hóa đơn">
            <Button
              type="primary"
              htmlType="submit"
              className="btn-creat-bill-list"
              style={{ marginLeft: "20px", backgroundColor: "#3366CC" }}
            >
              <span
                style={{
                  marginLeft: "5px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Danh sách
              </span>
            </Button>
          </Tooltip>
        </div>
        <div
          style={{
            marginLeft: "auto",
          }}
        >
          <Tooltip title="Danh sách hóa đơn">
            <Button
              type="primary"
              htmlType="submit"
              className="btn-creat-bill-list"
              style={{ backgroundColor: "#3366CC" }}
            >
              <FontAwesomeIcon icon={faQrcode} size="xl" />
              <span
                style={{
                  marginLeft: "5px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                QR code sản phẩm
              </span>
            </Button>
          </Tooltip>
          <Tooltip title="Danh sách hóa đơn">
            <Button
              type="primary"
              htmlType="submit"
              className="btn-creat-bill-list"
              style={{
                marginLeft: "15px",
                marginRight: "20px",
                backgroundColor: "#3366CC",
              }}
              onClick={handleAddProduct}
            >
              <span
                style={{
                  marginLeft: "5px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Thêm sản phẩm
              </span>
            </Button>
          </Tooltip>
          <ModalProductDetail
            isModalOpen={openModalProductDetail}
            handleOk={handleModalProductDetailOk}
            handleCancel={handleModalProductDetailCancel}
          />
        </div>
      </div>
      {listProductDetails.length === 0 ? (
        <div className="body-bill" style={{ position: "relative" }}>
          <p className="text-bill-null">Không có sản phẩm nào trong giỏ hàng</p>
        </div>
      ) : (
        <div>Khác</div>
      )}
    </div>
  );
};
