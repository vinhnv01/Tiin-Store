import { faCircleCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Tooltip,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { TabsContent } from "./model/TabsContent";
import "./BillManagement.css";
import { TabsComponent } from "./model/TabsComponent";
import { AddressApi } from "../../apis/address/address.api";

export default function BillManagement() {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState("1");
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);

  // dịa chỉ ship
  const loadDataProvince = () => {
    AddressApi.fetchAllProvince().then((res) => {
      setListProvince(res.data.data);
    });
  };

  const handleProvinceChange = (value, valueProvince) => {
    form.setFieldsValue({ provinceId: valueProvince.valueProvince });
    AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
      (res) => {
        setListDistricts(res.data.data);
      }
    );
  };

  const handleDistrictChange = (value, valueDistrict) => {
    form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
  };

  const handleWardChange = (value, valueWard) => {
    form.setFieldsValue({ wardCode: valueWard.valueWard });
  };

  useEffect(() => {
    loadDataProvince();
  }, []);

  //end

  const [tabBill, setTabBill] = useState([
    {
      label: "Hóa đơn 1",
      key: "1",
    },
  ]);
  const newTabIndex = useRef(2);

  const getDefaultTabContent = (key) => {
    return <TabsContent />;
  };

  const [tabContents, setTabContents] = useState({
    1: getDefaultTabContent("1"),
  });

  const onChange = (key) => {
    setActiveKey(key);
  };

  const addBill = () => {
    if (tabBill.length < 5) {
      const newActiveKey = newTabIndex.current.toString();
      const newItem = {
        label: `Hóa đơn ${newTabIndex.current}`,
        key: newActiveKey,
      };

      setTabBill([...tabBill, newItem]);
      setActiveKey(newActiveKey);

      setTabContents({
        ...tabContents,
        [newActiveKey]: getDefaultTabContent(newActiveKey),
      });

      newTabIndex.current++;
    } else {
      message.warning("Bạn chỉ tạo tối đa 5 hóa đơn");
    }
  };

  const remove = (targetKey) => {
    const targetIndex = tabBill.findIndex((pane) => pane.key === targetKey);
    const newPanes = tabBill.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setTabBill(newPanes);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      addBill();
    } else {
      remove(targetKey);
    }
  };

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const handleSwitchChange = (checked) => {
    setIsSwitchOn(checked);
  };

  return (
    <div>
      <Card>
        <Row justify={"end"}>
          <Tooltip title="Tạo hóa đơn">
            <Button
              style={{
                height: "40px",
                margin: "0 10px 10px 10px ",
                backgroundColor: "#3366CC",
                color: "white",
              }}
              onClick={addBill}
            >
              <FontAwesomeIcon icon={faPlus} />
              Tạo hóa đơn
            </Button>
          </Tooltip>
        </Row>

        <TabsComponent
          activeKey={activeKey}
          items={tabBill}
          onChange={onChange}
          onEdit={onEdit}
          tabContents={tabContents}
          setTabContents={setTabContents}
        />
      </Card>

      <Form form={form}>
        <Row style={{ marginTop: "5px" }} justify={"center"}>
          <Col span={10}>
            <Card style={{ display: isSwitchOn ? "block" : "none" }}>
              <h2>Thông tin khách hàng</h2> <br />
              <Row justify={"end"}>
                <Tooltip title="Chọn tài khoản">
                  <Button
                    style={{
                      height: "40px",
                      margin: "0 10px 10px 10px ",
                      backgroundColor: "#3366CC",
                      color: "white",
                    }}
                  >
                    Chọn tài khoản
                  </Button>
                </Tooltip>
              </Row>
              <Form.Item
                name="fullName"
                label="Họ và tên"
                tooltip="Họ và tên của bạn là gì?"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy nhập họ và tên ",
                    whitespace: true,
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 15 }}
              >
                <Input style={{ textAlign: "center" }} />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                tooltip="Số điện thoại của bạn là gì?"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy nhập số điện thoại ",
                    whitespace: true,
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 15 }}
              >
                <Input style={{ textAlign: "center" }} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                tooltip="Email của bạn là gì?"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy nhập emal ",
                    whitespace: true,
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 15 }}
              >
                <Input style={{ textAlign: "center" }} />
              </Form.Item>
              <Form.Item
                name="province"
                label="Tỉnh/Thành phố"
                tooltip="Tỉnh/Thành phố của bạn là gì?"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy chọn Tỉnh/Thành phố.",
                    whitespace: true,
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 15 }}
              >
                <Select defaultValue={""} onChange={handleProvinceChange}>
                  <Select.Option value="">
                    --Chọn Tỉnh/Thành phố--
                  </Select.Option>
                  {listProvince?.map((item) => {
                    return (
                      <Select.Option
                        key={item.ProvinceID}
                        value={item.ProvinceName}
                        valueProvince={item.ProvinceID}
                      >
                        {item.ProvinceName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="district"
                label="Quận/Huyện"
                tooltip="Quận/Huyện của bạn là gì?"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy chọn Quận/Huyện.",
                    whitespace: true,
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 15 }}
              >
                <Select defaultValue={""} onChange={handleDistrictChange}>
                  <Select.Option value="">--Chọn Quận/Huyện--</Select.Option>
                  {listDistricts?.map((item) => {
                    return (
                      <Select.Option
                        key={item.DistrictID}
                        value={item.DistrictName}
                        valueDistrict={item.DistrictID}
                      >
                        {item.DistrictName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="ward"
                label="Xã/Phường"
                tooltip="Xã/Phường của bạn là gì?"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy chọn Xã/Phường.",
                    whitespace: true,
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 15 }}
              >
                <Select defaultValue={""} onChange={handleWardChange}>
                  <Select.Option value="">--Chọn Xã/Phường--</Select.Option>
                  {listWard?.map((item) => {
                    return (
                      <Select.Option
                        key={item.WardCode}
                        value={item.WardName}
                        valueWard={item.WardCode}
                      >
                        {item.DistrictName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="line"
                label="Số nhà"
                tooltip="Số nhà của bạn là gì?"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng hãy nhập số nhà.",
                    whitespace: true,
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 15 }}
              >
                <Input style={{ textAlign: "center" }} />
              </Form.Item>
            </Card>
          </Col>
          <Col span={14}>
            <Card>
              <h2>Thanh toán hóa đơn</h2>
              <Switch checked={isSwitchOn} onChange={handleSwitchChange} />
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
