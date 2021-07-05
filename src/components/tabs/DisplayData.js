import React from "react";
import { Row, Col, Table, Tabs } from "antd";
import "antd/dist/antd.css";

const { TabPane } = Tabs;

export const DisplayData = ({ dataTransformed }) => {
  return (
    <Row>
      <Col span={24}>
        <Tabs defaultActiveKey="1" centered>
          {dataTransformed.map(({ name, data, colomns }, index) => {
            return (
              <TabPane key={index + 1} tab={name}>
                <Table dataSource={data} columns={colomns} />
              </TabPane>
            );
          })}
        </Tabs>
      </Col>
    </Row>
  );
};
