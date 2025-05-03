import { Table, Button } from "antd";
import { getCategoryList, CategoryInfo } from "../apis/CategoryApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




export default function Category() {
  const [data, setData] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id-col",
    },
    {
      title: "名称",
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
      render: (_: unknown, record: CategoryInfo) => (
        <Button type="link" onClick={() => handleView(record.id)}>
          查看
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoryList();
        console.log("Fetched data:", response);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const goToAddCategory = () => {
    navigate("/backend/category-add"); 
  };

  const handleView = (id: number) => {
      navigate(`/backend/category-detail/${id}`);
  };


  return (
    <div>
      <Table
        loading={loading}
        dataSource={data}
        columns={columns}
        rowKey="id"
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>分类列表</span>
            <Button
              type="primary"
              onClick={goToAddCategory}
              style={{ marginBottom: 16 }}
            >
              新增分类
            </Button>
          </div>
        )}
      />
    </div>
  );
}
