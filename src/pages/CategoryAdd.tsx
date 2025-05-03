import { Form, Input, Select, Button, message, Steps } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategoryList, addCategory, CategoryInfo, CategoryAttr } from "../apis/CategoryApi";
const { Step } = Steps;

export default function CategoryAdd() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [dynamicAttributes, setDynamicAttributes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoryList();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const nextStep = async () => {
    if (currentStep === 0) {
      try {
        await form.validateFields(["parentId", "name"]);
        setCurrentStep(1);
      } catch (error) {
        console.error("Step 1 validation error:", error);
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onCancel = () => {
    navigate("/backend/category");
  };

  const addAttribute = () => {
    setDynamicAttributes([...dynamicAttributes, ""]);
  };

  const updateAttribute = (index: number, name: string) => {
    const newAttributes = [...dynamicAttributes];
    newAttributes[index] = name;
    setDynamicAttributes(newAttributes);
  };

  const onFinish = async () => {
    try {
      const { parentId, name } = await form.validateFields([
        "parentId",
        "name",
      ]);
      const data: CategoryInfo = {
        parentId,
        name,
        categoryAttrs: dynamicAttributes.map((name) => ({
          name,
        })) as CategoryAttr[],
      };
      await addCategory(data);
      message.success("分类添加成功");
      navigate("/backend/category");
    } catch (error) {
      console.error("添加分类失败:", error);
      message.error("分类添加失败，请重试");
    }
  };

  const validateAttributes = () => {
    if (dynamicAttributes.some((attr) => !attr.trim())) {
      message.error("属性名称不能为空，请检查并补全");
      return false;
    }
    return true;
  };

  const goToPreview = async () => {
    if (currentStep === 0) {
      try {
        await form.validateFields(["parentId", "name"]);
        setCurrentStep(2);
      } catch (error) {
        console.error("Step 1 validation error:", error);
      }
    } else if (currentStep === 1) {
      if (validateAttributes()) {
        setCurrentStep(2);
      }
    }
  };

  return (
    <div>
      <Steps current={currentStep}>
        <Step title="节点" />
        <Step title="属性" />
        <Step title="创建" />
      </Steps>
      <Form form={form} name="addCategory" layout="vertical">
        {currentStep === 0 && (
          <>
            <Form.Item
              name="parentId"
              label="选择根节点"
              rules={[{ required: true, message: "请选择根节点" }]}
            >
              <Select placeholder="请选择根节点">
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="name"
              label="新节点名称"
              rules={[{ required: true, message: "请输入新节点名称!" }]}
            >
              <Input placeholder="新节点名称" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={nextStep}>
                下一步
              </Button>
              <Button
                type="primary"
                onClick={goToPreview}
                style={{ marginLeft: 8 }}
              >
                创建
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={onCancel}>
                取消
              </Button>
            </Form.Item>
          </>
        )}
        {currentStep === 1 && (
          <>
            {dynamicAttributes.map((attr, index) => (
              <div key={index} style={{ marginBottom: 16 }}>
                <Input
                  placeholder="属性名称"
                  value={attr}
                  onChange={(e) => updateAttribute(index, e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            ))}
            <Button type="dashed" onClick={addAttribute}>
              添加属性
            </Button>
            <Form.Item style={{ marginTop: 16 }}>
              <Button onClick={prevStep}>上一步</Button>
              <Button
                type="primary"
                onClick={goToPreview}
                style={{ marginLeft: 8 }}
              >
                创建
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={onCancel}>
                取消
              </Button>
            </Form.Item>
          </>
        )}
        {currentStep === 2 && (
          <>
            <Form.Item label="选择根节点">
              <Input value={form.getFieldValue("parentId")} disabled />
            </Form.Item>
            <Form.Item label="新节点名称">
              <Input value={form.getFieldValue("name")} disabled />
            </Form.Item>
            <Form.Item label="属性">
              {dynamicAttributes.map((attr, index) => (
                <div key={index} style={{ marginBottom: 8 }}>
                  <span>
                    {attr}
                  </span>
                </div>
              ))}
            </Form.Item>
            <Form.Item>
              <Button onClick={prevStep}>上一步</Button>
              <Button
                type="primary"
                onClick={onFinish}
                style={{ marginLeft: 8 }}
              >
                确认创建
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={onCancel}>
                取消
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
}
