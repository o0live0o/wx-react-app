import "./product.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, ProductViewInfo } from "../../apis/ProductApi";
import { Spin, Form, Input, Button, Table } from "antd";
import { AuthButton } from '../../components/AuthButton';
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState<ProductViewInfo | null>(null);
  const [form] = Form.useForm();
  const fieldConfigs = [
    { name: "name", label: "Name", editable: false },
    { name: "brand", label: "Brand", editable: false },
    { name: "description", label: "Description", editable: true },
  ];
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];
  const fetchProduct = async () => {
    if (!id) return;
    try {
      const res = await getProductById(Number(id));
      setProduct(res);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);
  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);
  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            {!isEditing ? (
              <AuthButton type="primary" onClick={() => setIsEditing(true)}>
                Edit
              </AuthButton>
            ) : (
              <>
                <Button type="primary">Save</Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </>
            )}
          </div>
          <Form form={form} layout="vertical">
            {fieldConfigs.map((field) => (
              <Form.Item key={field.name} label={field.label} name={field.name}>
                <Input disabled={!isEditing || !field.editable} />
              </Form.Item>
            ))}
          </Form>
          <Table columns={columns} dataSource={product?.productAttrs}></Table>
        </>
      )}
    </div>
  );
}
