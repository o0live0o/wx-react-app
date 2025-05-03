import { Table } from "antd";

const columns = [
  {
    title: "Id",
    dataIndex: "Id",
    key: "Id",
  },
  {
    title: "名称",
    dataIndex: "Name",
    key: "Name",
  },
  {
    title: "Name",
    dataIndex: "ParentId",
    key: "ParentId",
  },
];


export default function Products() {
  return (
    <div>
      <Table  columns={columns} />
    </div>
  );
}
