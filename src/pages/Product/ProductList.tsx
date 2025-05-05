import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductInfo, getProducts } from "../../apis/ProductApi";
import { AuthButton } from '../../components/AuthButton';

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
            <Button
              color="primary"
              size="small"
              style={{ marginRight: 8 }}
              variant="outlined"
              onClick={() => {
                if (record.id && record.id > 0) {
                  handleView(record.id);
                }
              }}
            >
              Detail
            </Button>

            <AuthButton
              color="danger"
              size="small"
              variant="outlined"
              onClick={() => {
                if (record.id && record.id > 0) {
                  handleDelete(record.id);
                }
              }}
            >
              Delete
            </AuthButton>
          </>
        );
      },
    },
  ];

  const [data, setData] = useState<ProductInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (page = 1, pageSize = 10) => {
    try {
      const res = await getProducts({ page, pageSize });
      setData(res.items);
      setPagination({
        current: page,
        pageSize: pageSize,
        total: res.totalCount,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate("/backend/products/add");
  };

  const handleView = (id: number) => {
    navigate(`/backend/products/detail/${id}`);
  };

  const handleDelete = async (id: number) => {
    console.log("Deleting product with ID:", id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data || []}
        rowKey="id"
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => {
            fetchData(page, pageSize);
          },
        }}
        title={() => (
          <AuthButton type="primary" onClick={handleAdd}>
            Add
          </AuthButton>
        )}
      />
    </>
  );
}
