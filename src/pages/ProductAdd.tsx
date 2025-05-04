import { Button, Steps, Form, Select, Input, Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  getCategoryList,
  getCategoryById,
  CategoryInfo,
  CategoryAttr,
} from "../apis/CategoryApi";

import { CreateProductRequest, createProduct } from "../apis/ProductApi";

const steps = [
  {
    title: "Product",
  },
  {
    title: "Attributes",
  },
  {
    title: "Image",
  },
  {
    title: "Complete",
  },
];
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const items = steps.map((item) => ({ key: item.title, title: item.title }));
export default function ProductAdd() {
  const [current, setCurrent] = useState(0);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [attributes, setAttributes] = useState<CategoryAttr[]>([]);
  const [productImage, setProductImage] = useState<UploadFile | null>(null);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const next = async () => {
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
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const complete = () => {
    setCurrent(steps.length - 1);
  };

  const fetchCagegory = async () => {
    const res = await getCategoryList();
    const categories = res.filter((item) => item.id && item.id > 1);
    setCategories(categories);
  };

  const handleSubmit = async () => {
    const formValues = form.getFieldsValue(true);
    const productAttrs = attributes.map((attr) => ({
      categoryAttributeId: attr.attrId,
      value: form.getFieldValue(attr.attrId.toString()),
    }));
    const requestData: CreateProductRequest = {
      categoryId: formValues.categoryId,
      name: formValues.name,
      brand: formValues.brand,
      model: formValues.model,
      description: formValues.description,
      productAttrs: productAttrs,
    };
    await createProduct(requestData);
  }

  useEffect(() => {
    fetchCagegory();
  }, []);

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleUpload: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setProductImage(newFileList[0] || null);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Steps current={current} items={items} />
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
            <Form.Item key={attribute.attrId} label={attribute.name} name={attribute.attrId.toString()}>
              <Input />
            </Form.Item>
          ))}
        </Form>
      )}
      {current === 2 && (
        <Form form={form} layout="vertical" name="image-form">
          <Form.Item label="Product Images">
            <Upload
              fileList={productImage ? [productImage] : []}
              onPreview={handlePreview}
              onChange={handleUpload}
              beforeUpload={() => false}
            >
              {uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>
        </Form>
      )}
      {current === 3 && <div>Complete</div>}
      <>
        {current > 0 && (
          <Button type="primary" onClick={prev}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current !== steps.length - 1 && (
          <Button type="primary" onClick={complete}>
            Preview
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </>
    </>
  );
}
