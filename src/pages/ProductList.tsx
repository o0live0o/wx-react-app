import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductInfo, getProducts } from "../apis/ProductApi";


export default function ProductList() {
  const navigate = useNavigate();
  
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id-col",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name-col",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand-col",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category-col",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description-col",
    },
    {
      title: "Action",
      key: "action-col",
      render: (_: unknown, record: ProductInfo) => {
        return (
          <>
            <button>View {record.id}</button>
            <button>Delete</button>
          </>
        );
      },
    },
  ];

  const [data, setData] = useState<ProductInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await getProducts()
    setData(res);
    setLoading(false)
  }

  const addHandler = () => {
    navigate("/backend/products/add");
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="id"
        title={() => (
          <Button type="primary" onClick={addHandler}>
            Add
          </Button>
        )}
      />
    </>
  );
}
