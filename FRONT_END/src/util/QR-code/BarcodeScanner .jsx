import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useZxing } from "react-zxing";

export default function QRScannerModal({ visible, onCancel, onQRResult }) {
  const [result, setResult] = useState("");

  const RenderVideo = () => {
    const { ref } = useZxing({
      onDecodeResult(result) {
        setResult(result.getText());
        onQRResult(result.getText());
      },
      paused: !visible,
    });
    return (
      <video
        ref={ref}
        style={{ width: "100%", height: "auto", borderRadius: "10px" }}
      />
    );
  };

  return (
    <Modal
      title="Quét mã QR"
      visible={visible}
      onOk={onCancel}
      onCancel={onCancel}
      okText="Hủy"
      width={400}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <RenderVideo />
        <p>
          <span>Last result:</span>
          <span>{result}</span>
        </p>
      </div>
    </Modal>
  );
}
