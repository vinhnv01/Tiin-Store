import { Tabs } from "antd";

export const TabsComponent = ({ activeKey, items, onChange, tabContents , onEdit}) => {
  return (
    <Tabs
      hideAdd
      onChange={onChange}
      activeKey={activeKey}
      type="editable-card"
      onEdit={onEdit}
    >
      {items.map((item) => (
        <Tabs.TabPane tab={item.label} key={item.key}>
          {tabContents[item.key]} {/* Hiển thị nội dung dựa vào key của tab */}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};
