import React, { useState } from "react";
import { Row, Col, Upload, Button } from "antd";
import * as Papa from "papaparse";
import "antd/dist/antd.css";

import { DisplayData } from "../tabs";

export const UploadFile = () => {
  const [fileTransformed, setFileTransformed] = useState([]);
  const handleUploadFile = async (file) => {
    let fileTransformed = [];
    const { fileList } = file;
    for (let file of fileList) {
      const { originFileObj, name } = file;
      const csvString = await readUploadedFileAsText(originFileObj);
      const [data, colomns] = transformCsvToArray(csvString);

      fileTransformed.push({ name, data, colomns });
    }
    //console.log(fileTransformed);
    setFileTransformed(fileTransformed);
  };

  const transformCsvToArray = (csvString) => {
    const { data } = Papa.parse(csvString, {
      header: true,
    });
    const colomns = makeColomn(data[0]);
    return [data, colomns];
  };

  const makeColomn = (object) => {
    let colonmsField = [];
    for (const [key] of Object.entries(object)) {
      colonmsField.push(key);
    }

    const colomns = colonmsField.map((colomn) => {
      return {
        title: colomn.toUpperCase(),
        dataIndex: colomn,
        key: colomn,
      };
    });

    return colomns;
  };

  const readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };

  return (
    <Row gutter={[48, 0]}>
      <Col span={24}>
        <Upload
          accept=".txt, .csv"
          onChange={handleUploadFile}
          multiple={true}
          action={false}
          //showUploadList={{ showRemoveIcon: false }}
          showUploadList={false}
        >
          <Button>Choose File</Button>
        </Upload>
      </Col>
      {fileTransformed.length && (
        <Col span={24}>
          <DisplayData dataTransformed={fileTransformed} />
        </Col>
      )}
    </Row>
  );
};

//export default UploadFile;
