import { Button, Table, Modal, Form, Input } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCategoryById,
  CategoryInfo,
  CategoryAttr,
  deleteCategoryAttr,
  addCategoryAttr
} from "../../apis/CategoryApi";

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<CategoryInfo| null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      const response = await getCategoryById(Number(id));
      console.log("Fetched data:", response);
      setCategory(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategoryData();
  }, [id]);
  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (id) {
        await addCategoryAttr(Number(id),  values.attrName);
        await fetchCategoryData();
        setIsModalVisible(false);
    }
  };

  const handleDelete = async (id: number,attrId: number) => {
    console.log("Deleting category with ID:", id, "and attrId:", attrId);
    try {
      await deleteCategoryAttr(id, attrId)
      await fetchCategoryData();

    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const columns = [
    {
      title: "Attribute",
      dataIndex: "name",
      key: "name-col",
    },
    {
      title: "Action",
      key: "action-col",
      render: (_: unknown, record: CategoryAttr) => (
        <Button
          type="link"
          onClick={() => {
            console.log("Deleting category with ID:", id, "and attrId:", record.attrId);
            if (record.attrId && record.attrId > 0) {
              handleDelete(Number(id), record.attrId);
            }
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Table
        loading={loading}
        dataSource={category?.categoryAttrs}
        columns={columns}
        rowKey="attrId"
        title={() => (
          <div>
            <Button
              type="primary"
              onClick={showModal}
              style={{ marginBottom: 16 }}
            >
              Add
            </Button>
          </div>
        )}
      />
      <Modal
        title="新增属性"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            Confirm
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="attrName"
            label="Attribute"
            rules={[{ required: true, message: "Please input attribute" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}