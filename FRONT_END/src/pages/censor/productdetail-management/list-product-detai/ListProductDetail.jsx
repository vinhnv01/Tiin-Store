/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { GetSize, SetSize } from "../../../../app/reducer/Size.reducer";
import { GetColor, SetColor } from "../../../../app/reducer/Color.reducer";
import { ColorAPI } from "../../../../apis/color/color.api";
import { SizeAPI } from "../../../../apis/size/size.api";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faQrcode,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import UploadListImage from "../../../../util/update-image/UploadListImage";
import showConfirmationModal from "../../../../util/modal-confirm/ModalConfirm";
import ModalPriceAndQuantity from "./ModalPriceAndQuantity";
import QRScannerModal from "../../../../util/QR-code/BarcodeScanner ";
import { ProductDetailAPI } from "../../../../apis/product-detail/productDetail.api";
import("../ProductDetailManagement.model.css");
export default function ListProductDetail() {
  const location = useLocation();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [data, setData] = useState([]);
  const { dataProduct, dataListColor, dataListSize } = location.state || {};

  const dataSize = useAppSelector(GetSize);
  const dataColor = useAppSelector(GetColor);
  const loadData = (search) => {
    SizeAPI.fetchAll(search).then((res) => {
      dispatch(SetSize(res.data.data));
    });
    ColorAPI.fetchAll(search).then((res) => {
      dispatch(SetColor(res.data.data));
    });
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  const getListData = () => {
    const newListSize = dataSize.filter((data) =>
      dataListSize.includes(data.id)
    );
    const newListColor = dataColor.filter((data) =>
      dataListColor.includes(data.id)
    );
    if (newListColor.length > 0 && newListSize.length > 0) {
      let stt = 1;
      for (let i = 0; i < newListColor.length; i++) {
        for (let y = 0; y < newListSize.length; y++) {
          const newData = {
            key: `${dataProduct.nameProduct}-${newListSize[y].name}-${newListColor[i].name}`,
            nameProductDetail: `${dataProduct.nameProduct}[${newListSize[y].name} - ${newListColor[i].name}]`,
            quantity: 100,
            price: 1000000,
            stt: stt++,
            barcode: "aaaa",
            color: newListColor[i].name,
            size: newListSize[y].name,
          };
          setData((prevData) => [...prevData, newData]);
        }
      }
    }
  };
  useEffect(() => {
    getListData();
  }, []);

  // cập nhập số lượng
  const handleQuantityChange = (value, key) => {
    if (value <= 0) {
      value = 1;
    }
    setData((item) =>
      item.map((item) =>
        item.key === key ? { ...item, quantity: value } : item
      )
    );
  };
  // cập nhập giá tiền
  const handlePriceChange = (value, key) => {
    if (value <= 0) {
      value = 100000;
    }
    setData((item) =>
      item.map((item) => (item.key === key ? { ...item, price: value } : item))
    );
  };

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    });
    return formatter.format(value);
  };

  // xóa phiên bản sản phẩm
  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa  này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        // Lọc ra các dòng không phải dòng cần xóa
        const updatedTableData = data.filter((item) => item.key !== record.key);
        const updatedTableDataWithSTT = updatedTableData.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        setData(updatedTableDataWithSTT);
      },
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: <div style={{ textAlign: "center" }}>Tên sản phẩm</div>,
      dataIndex: "nameProductDetail",
      key: "nameProductDetail",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(value, record.key)}
        />
      ),
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: "20%",
      render: (_, record) => (
        <Input
          min={100000}
          value={formatCurrency(record.price)}
          onChange={(e) =>
            handlePriceChange(e.target.value.replace(/\D/g, ""), record.key)
          }
        />
      ),
    },
    {
      title: "Mã barcode",
      dataIndex: "barcode",
      key: "barcode",
      align: "center",
      width: "17%",
      render: (_, record) => (
        <>
          <Row>
            <Col span={19}>
              <Input
                value={
                  scannedRecordKey === record.key && scannedRecordKey !== null
                    ? qrResult
                    : record.barcode
                }
                onChange={(e) =>
                  handleBarcodeChange(e.target.value, record.key)
                }
              />
            </Col>
            <Col span={4}>
              <Tooltip title="Quét mã vạch sản phẩm.">
                <Button
                  onClick={() => handleScanButtonClick(record.key)}
                  style={{
                    height: "35px",
                    marginLeft: "10px ",
                    backgroundColor: "#3366CC",
                    color: "white",
                  }}
                >
                  <FontAwesomeIcon icon={faQrcode} />
                </Button>
              </Tooltip>
              {showModal && (
                <QRScannerModal
                  visible={showModal}
                  onCancel={handleModalClose}
                  onQRResult={handleQRResult}
                />
              )}
            </Col>
          </Row>
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xóa phiên bản">
            <Button
              onClick={() => handleDelete(record)}
              style={{
                backgroundColor: "red",
                color: "white",
                height: "35px",
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Upload ảnh</div>,
      dataIndex: "key", // Change to key
      key: "key",
      width: "30%",
      render: (_, record) => ({
        children: (
          <UploadListImage
            onFileListChange={(data) => handleUploadImages(data)}
            color={record.color}
          />
        ),
        props: {
          rowSpan: record.rowSpan,
        },
      }),
    },
  ];

  const processColorGroups = () => {
    const colorGroups = {};
    data.forEach((item) => {
      if (!colorGroups[item.color]) {
        colorGroups[item.color] = [];
      }
      colorGroups[item.color].push(item);
    });

    const processedData = [];
    Object.keys(colorGroups).forEach((color) => {
      const colorGroup = colorGroups[color];
      colorGroup.forEach((item, index) => {
        if (index === 0) {
          item.rowSpan = colorGroup.length;
        } else {
          item.rowSpan = 0;
        }
        processedData.push(item);
      });
    });

    return processedData;
  };
  const processedData = processColorGroups();

  // customer table
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      {
        key: "odd",
        text: "Chọn hàng lẻ",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Chọn hàng Chẵn",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  // cập nhập giá chung
  const [openQuantityAndPrice, setQuantityAndPrice] = useState(false);
  const handleUpdateQuantityAndPrice = (newValues) => {
    const updatedData = data.map((record) => {
      if (selectedRowKeys.includes(record.key)) {
        return {
          ...record,
          quantity: newValues.quantityCustom,
          price: newValues.priceCustom,
        };
      }
      return record;
    });

    setData(updatedData);
    setQuantityAndPrice(false);
  };

  const showModalQuantityAndPrice = () => {
    setQuantityAndPrice(true);
  };
  const handleCancelQuantityAndPrice = () => {
    setQuantityAndPrice(false);
  };

  // image
  const [listColorAndFileData, setListColorAndFileData] = useState([]);
  const handleUploadImages = (record) => {
    const newFileData = [...listColorAndFileData];
    const existingColorData = newFileData.find(
      (item) => item.color === record.color
    );
    if (existingColorData) {
      existingColorData.file = record.file;
    } else {
      newFileData.push({
        color: record.color,
        file: record.file,
      });
    }
    setListColorAndFileData(newFileData);
  };

  //QR code mã vạch
  const [qrResult, setQrResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [scannedRecordKey, setScannedRecordKey] = useState(null);

  const handleScanButtonClick = (key) => {
    setShowModal(true);
    setScannedRecordKey(key);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setQrResult("");
  };
  const handleQRResult = (result) => {
    if (result != null) {
      setShowModal(false);
    }
    setScannedRecordKey(null);
    setData((items) =>
      items.map((item) =>
        item.key === scannedRecordKey ? { ...item, barcode: result } : item
      )
    );
    setQrResult(result);
  };

  const handleBarcodeChange = (value, key) => {
    setData((item) =>
      item.map((item) =>
        item.key === key ? { ...item, barcode: value } : item
      )
    );
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Bạn có muốn rời khỏi trang? Dữ liệu chưa được lưu.";
      event.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // add product detail
  const handleSuccess = () => {
    // Kiểm tra ảnh đã được upload toàn bộ theo màu chưa ?
    const hasMissingUploads = processedData.some((record) => {
      const colorFileData =
        listColorAndFileData.find((item) => item.color === record.color)
          ?.file || [];
      return colorFileData.length === 0;
    });
    if (hasMissingUploads) {
      message.error("Bạn cần thêm ảnh cho tất cả các màu sắc");
      return;
    }

    const hasMissingBarcode = processedData.some((item) => item.barcode === "");
    if (hasMissingBarcode) {
      message.error(
        "Bạn cần nhập hoặc quét mã barcode cho tất cả phiên bản sản phẩm."
      );
      return;
    }

    const formData = new FormData();
    listColorAndFileData.forEach((item) => {
      const color = item.color;
      const fileData = item.file;
      fileData.forEach((file, index) => {
        formData.append(`${color}-${index}`, file.originFileObj);
      });
    });
    formData.append("productDetail", JSON.stringify(dataProduct));
    formData.append("listDataProductDetail", JSON.stringify(processedData));

    console.log(processedData);
    ProductDetailAPI.create(formData)
      .then((response) => {
        nav("/product-detail-management");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="conten-category">
        <h1>
          <span style={{ marginLeft: "17px" }}>Phiên bản sản phẩm</span>
        </h1>
      </div>
      <Card style={{ marginTop: "35px" }}>
        <h2 className="conten-employee">
          <FontAwesomeIcon icon={faLayerGroup} />
          <span style={{ marginLeft: "15px" }}>Danh sách</span>
        </h2>
        <Row justify={"end"}>
          <Button
            onClick={() =>
              showConfirmationModal("Bạn có chắc muốn thêm ?", handleSuccess)
            }
            style={{
              width: "110px",
              height: "40px",
              margin: "0 10px 10px 10px ",
              backgroundColor: "white",
              color: "black",
            }}
          >
            Hủy
          </Button>
          <Tooltip title=" Chỉnh số lượng và giá chung">
            <Button
              type="primary"
              htmlType="submit"
              onClick={showModalQuantityAndPrice}
              style={{
                height: "40px",
                margin: "0 10px 10px 10px ",
                backgroundColor: "#3366CC",
                color: "white",
              }}
            >
              Chỉnh số lượng và giá chung
            </Button>
          </Tooltip>
          <Button
            onClick={() =>
              showConfirmationModal("Bạn có chắc muốn thêm ?", handleSuccess)
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
        </Row>
        <Table
          columns={columns}
          rowSelection={rowSelection}
          dataSource={processedData}
          pagination={{
            pageSize: 10,
          }}
        />
      </Card>
      <ModalPriceAndQuantity
        open={openQuantityAndPrice}
        onCancel={handleCancelQuantityAndPrice}
        onUpdate={handleUpdateQuantityAndPrice}
      />
    </div>
  );
}
