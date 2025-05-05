import {
  Button,
  Steps,
  Form,
  Select,
  Input,
  Result,
  Spin,
  Space,
} from "antd";
import { useState, useEffect } from "react";
import {
  getCategoryList,
  getCategoryById,
  CategoryInfo,
  CategoryAttr,
} from "../../apis/CategoryApi";
import { useNavigate } from "react-router-dom";
import { ProductInfo, createProduct } from "../../apis/ProductApi";

const steps = [
  {
    title: "Product",
  },
  {
    title: "Attributes",
  },
  {
    title: "Complete",
  },
];
const items = steps.map((item) => ({ key: item.title, title: item.title }));
export default function ProductAdd() {
  const [current, setCurrent] = useState(0);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [attributes, setAttributes] = useState<CategoryAttr[]>([]);
  const [form] = Form.useForm();
  const [submitStatus, setSubmitStatus] = useState<
    "none" | "error" | "success"
  >("none");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const setStepIndex = async (index: number) => {
    if (index < 0 || index > steps.length - 1) return;
    setIsLoading(true);
    try {
      if (current === 0) {
        const values = await form.validateFields([
          "categoryId",
          "name",
          "brand",
          "description",
        ]);
        const selectedCategory = await getCategoryById(values.categoryId);
        if (selectedCategory) {
          setAttributes(selectedCategory.categoryAttrs);
        }
      }
      setCurrent(index);
    } finally {
      setIsLoading(false);
    }
  };

  const onBack = () => {
    navigate("/backend/products");
  };

  const fetchCagegory = async () => {
    const res = await getCategoryList({ page:1, pageSize:1000 });
    const categories = res.items.filter((item) => item.id && item.id > 1);
    setCategories(categories);
  };

  const handleSubmit = async () => {
    const formValues = form.getFieldsValue(true);
    const productAttrs = attributes
      .map((attr) => {
        const value = form.getFieldValue(attr.attrId.toString());
        if (value) {
          return {
            categoryAttributeId: attr.attrId,
            value,
          };
        }
        return null;
      })
      .filter(
        (item): item is { categoryAttributeId: number; value: string } =>
          item !== null
      );
    const requestData: ProductInfo = {
      categoryId: formValues.categoryId,
      name: formValues.name,
      brand: formValues.brand,
      model: formValues.model,
      description: formValues.description,
      productAttrs: productAttrs,
    };

    await createProduct(requestData);
    setSubmitStatus("success");
  };

  useEffect(() => {
    fetchCagegory();
  }, []);

  return (
    <>
      <Steps current={current} items={items} />
      <Space style={{ margin: 20 }}>
        <Button
          type="primary"
          size="small"
          onClick={() => setStepIndex(current - 1)}
          disabled={current === 0}
        >
          {isLoading ? <Spin /> : "Previous"}
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => setStepIndex(current + 1)}
          disabled={current === steps.length - 1}
        >
          Next
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => setStepIndex(steps.length - 1)}
          disabled={current === steps.length - 1}
        >
          Preview
        </Button>
        {submitStatus === "none" && current === steps.length - 1 && (
          <Button type="primary" size="small" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Space>
      {current === 0 && (
        <Form
          form={form}
          layout="vertical"
          name="product-form"
          style={{ marginTop: 20 }}
        >
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Please select a category">
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: "Please enter the brand" }]}
          >
            <Input placeholder="Brand" />
          </Form.Item>
          <Form.Item
            name="model"
            label="Model"
            rules={[{ required: true, message: "Please enter the brand" }]}
          >
            <Input placeholder="Model" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea placeholder="Description" rows={4} />
          </Form.Item>
        </Form>
      )}
      {current === 1 && attributes?.length > 0 && (
        <Form form={form} layout="vertical" name="attribute-form">
          {attributes.map((attribute) => (
            <Form.Item
              key={attribute.attrId}
              label={attribute.name}
              name={attribute.attrId.toString()}
            >
              <Input />
            </Form.Item>
          ))}
        </Form>
      )}
      {current === 2 && (
        <>
          {submitStatus === "success" && (
            <Result
              status="success"
              title="Successfully Added"
              extra={[
                <Button type="primary" onClick={onBack}>
                  Back
                </Button>,
              ]}
            />
          )}
          {submitStatus === "error" && (
            <Result
              status="error"
              title="Submission Failed"
              extra={[
                <Button type="primary" onClick={() => setStepIndex(0)}>
                  Check
                </Button>,
              ]}
            />
          )}
        </>
      )}
    </>
  );
}
