import { Table, Button, message } from "antd";
import {
  getCategoryList,
  CategoryInfo,
  deleteCategoryById,
} from "../../apis/CategoryApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthButton } from '../../components/AuthButton';
export default function Category() {
  const [data, setData] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
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
      title: "ParentId",
      dataIndex: "parentId",
      key: "parentId-col",
    },
    {
      title: "Action",
      key: "action-col",
      render: (_: unknown, record: CategoryInfo) => {
        if (record.id === 1) {
          return null;
        }
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                if (record.id && record.id > 0) {
                  handleView(record.id);
                }
              }}
            >
              View
            </Button>
            <AuthButton
              type="link"
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
  const fetchData = async (page = 1, pageSize = 10) => {
    try {
      const response = await getCategoryList({ page, pageSize });
      console.log("Fetched data:", response);
      setData(response.items);
      setPagination({
        current: page,
        pageSize: pageSize,
        total: response.totalCount,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goToAddCategory = () => {
    navigate("/backend/category-add");
  };

  const handleView = (id: number) => {
    navigate(`/backend/category-detail/${id}`);
  };

  const handleDelete = async (id: number) => {
    await deleteCategoryById(id);
    message.success("Deleted successfully");
  };

  return (
    <div>
      <Table
        loading={loading}
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => {
            fetchData(page, pageSize);
          },
        }}
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Category</span>
            <AuthButton
              type="primary"
              onClick={goToAddCategory}
              style={{ marginBottom: 16 }}
            >
              Add
            </AuthButton>
          </div>
        )}
      />
    </div>
  );
}
