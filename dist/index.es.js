import e, { useState as t } from "react";
import {
  Row as a,
  Col as n,
  Tabs as r,
  Table as o,
  Upload as l,
  Button as s,
} from "antd";
import * as c from "papaparse";
import "antd/dist/antd.css";
const { TabPane: m } = r,
  i = ({ dataTransformed: t }) =>
    e.createElement(
      a,
      null,
      e.createElement(
        n,
        { span: 24 },
        e.createElement(
          r,
          { defaultActiveKey: "1", centered: !0 },
          t.map(({ name: t, data: a, colomns: n }, r) =>
            e.createElement(
              m,
              { key: r + 1, tab: t },
              e.createElement(o, { dataSource: a, columns: n })
            )
          )
        )
      )
    ),
  p = () => {
    const [r, o] = t([]),
      m = (e) => {
        const { data: t } = c.parse(e, { header: !0 });
        return [t, p(t[0])];
      },
      p = (e) => {
        let t = [];
        for (const [a] of Object.entries(e)) t.push(a);
        return t.map((e) => ({ title: e.toUpperCase(), dataIndex: e, key: e }));
      },
      d = (e) => {
        const t = new FileReader();
        return new Promise((a, n) => {
          (t.onerror = () => {
            t.abort(), n(new DOMException("Problem parsing input file."));
          }),
            (t.onload = () => {
              a(t.result);
            }),
            t.readAsText(e);
        });
      };
    return e.createElement(
      a,
      { gutter: [48, 0] },
      e.createElement(
        n,
        { span: 24 },
        e.createElement(
          l,
          {
            accept: ".txt, .csv",
            onChange: async (e) => {
              let t = [];
              const { fileList: a } = e;
              for (let e of a) {
                const { originFileObj: a, name: n } = e;
                if (n.endsWith(".csv")) {
                  const e = await d(a),
                    [r, o] = m(e);
                  t.push({ name: n, data: r, colomns: o });
                }
              }
              o(t);
            },
            multiple: !0,
            action: !1,
            showUploadList: !1,
          },
          e.createElement(s, null, "Choose File")
        )
      ),
      r.length &&
        e.createElement(
          n,
          { span: 24 },
          e.createElement(i, { dataTransformed: r })
        )
    );
  },
  d = () => e.createElement("div", null, e.createElement(p, null));
export { d as MultipleCsvViewer };
