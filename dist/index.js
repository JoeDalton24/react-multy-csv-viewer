"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var e = require("react"),
  t = require("antd"),
  a = require("papaparse");
function r(e) {
  return e && "object" == typeof e && "default" in e ? e : { default: e };
}
function n(e) {
  if (e && e.__esModule) return e;
  var t = Object.create(null);
  return (
    e &&
      Object.keys(e).forEach(function (a) {
        if ("default" !== a) {
          var r = Object.getOwnPropertyDescriptor(e, a);
          Object.defineProperty(
            t,
            a,
            r.get
              ? r
              : {
                  enumerable: !0,
                  get: function () {
                    return e[a];
                  },
                }
          );
        }
      }),
    (t.default = e),
    Object.freeze(t)
  );
}
require("antd/dist/antd.css");
var l = r(e),
  o = n(a);
const { TabPane: u } = t.Tabs,
  c = ({ dataTransformed: e }) =>
    l.default.createElement(
      t.Row,
      null,
      l.default.createElement(
        t.Col,
        { span: 24 },
        l.default.createElement(
          t.Tabs,
          { defaultActiveKey: "1", centered: !0 },
          e.map(({ name: e, data: a, colomns: r }, n) =>
            l.default.createElement(
              u,
              { key: n + 1, tab: e },
              l.default.createElement(t.Table, { dataSource: a, columns: r })
            )
          )
        )
      )
    ),
  s = () => {
    const [a, r] = e.useState([]),
      n = (e) => {
        const { data: t } = o.parse(e, { header: !0 });
        return [t, u(t[0])];
      },
      u = (e) => {
        let t = [];
        for (const [a] of Object.entries(e)) t.push(a);
        return t.map((e) => ({ title: e.toUpperCase(), dataIndex: e, key: e }));
      },
      s = (e) => {
        const t = new FileReader();
        return new Promise((a, r) => {
          (t.onerror = () => {
            t.abort(), r(new DOMException("Problem parsing input file."));
          }),
            (t.onload = () => {
              a(t.result);
            }),
            t.readAsText(e);
        });
      };
    return l.default.createElement(
      t.Row,
      { gutter: [48, 0] },
      l.default.createElement(
        t.Col,
        { span: 24 },
        l.default.createElement(
          t.Upload,
          {
            accept: ".txt, .csv",
            onChange: async (e) => {
              let t = [];
              const { fileList: a } = e;
              for (let e of a) {
                const { originFileObj: a, name: r } = e;
                if (r.endsWith(".csv")) {
                  const e = await s(a),
                    [l, o] = n(e);
                  t.push({ name: r, data: l, colomns: o });
                }
              }
              r(t);
            },
            multiple: !0,
            action: !1,
            showUploadList: !1,
          },
          l.default.createElement(t.Button, null, "Choose File")
        )
      ),
      a.length &&
        l.default.createElement(
          t.Col,
          { span: 24 },
          l.default.createElement(c, { dataTransformed: a })
        )
    );
  };
exports.MultipleCsvViewer = () =>
  l.default.createElement("div", null, l.default.createElement(s, null));
