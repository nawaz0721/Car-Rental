import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Button, Modal, Table, Input, Select, Upload, Popconfirm, Tooltip, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { AppRoutes } from "../src/constant/constant";

const { Content } = Layout;
const { Option } = Select;

const AddCar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState(null);
  const [carName, setCarName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get(AppRoutes.manageCar);
      setCars(response.data);
    } catch (error) {
      message.error("Failed to fetch cars");
    }
  };

  const resetForm = () => {
    setCarId(null);
    setCarName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setSelectedFile(null);
    setPreviewImage(null);
  };

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const handleFileChange = ({ file }) => {
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
    return false;
  };
  console.log(selectedFile);


  const handleSaveCar = async () => {
    if (!carName || !price || !category || !description || (!carId && !selectedFile)) {
      message.warning("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", carName);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (carId) {
        await axios.put(`${AppRoutes.manageCar}/${carId}`, formData, config);
        message.success("Car updated successfully");
      } else {
        await axios.post(AppRoutes.manageCar, formData, config);
        message.success("Car added successfully");
      }
      fetchCars();
      handleCloseModal();
    } catch (error) {
      console.error("Error Saving Car:", error);
      message.error("Failed to save car");
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`${AppRoutes.manageCar}/${id}`);
      message.success("Car deleted successfully");
      fetchCars();
    } catch (error) {
      message.error("Failed to delete car");
    }
  };

  const handleEditCar = (car) => {
    setCarId(car._id);
    setCarName(car.name);
    setPrice(car.price);
    setCategory(car.category);
    setDescription(car.description);
    setPreviewImage(car.image);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "Car Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="car" width={50} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-4">
          <Button type="link" onClick={() => handleEditCar(record)}>
            <Tooltip title="Edit Car">
              <FaEdit />
            </Tooltip>
          </Button>
          <Popconfirm
            title="Are you sure to delete this car?"
            onConfirm={() => handleDeleteCar(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              <Tooltip title="Delete Car">
                <FaRegTrashAlt />
              </Tooltip>
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Content className="p-6 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Manage Cars</h1>
          <Button type="primary" onClick={handleOpenModal}>Add Car</Button>
        </div>
        <Table dataSource={cars} columns={columns} rowKey="_id" pagination={{ pageSize: 5 }} />
      </Content>
      <Modal title={carId ? "Edit Car" : "Add New Car"} open={isModalVisible} onCancel={handleCloseModal} onOk={handleSaveCar}>
        <Input placeholder="Car Name" value={carName} onChange={(e) => setCarName(e.target.value)} className="mb-3" />
        <Input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="mb-3" />
        <Select placeholder="Select Category" className="w-full mb-3" value={category} onChange={setCategory}>
          <Option value="SUV">SUV</Option>
          <Option value="Sedan">Sedan</Option>
          <Option value="Truck">Truck</Option>
        </Select>
        <Input.TextArea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="mb-3" />

        {previewImage && (
          <div className="mb-3">
            <p>Current Image:</p>
            <img src={previewImage} alt="preview" width={100} />
          </div>
        )}

        <Upload beforeUpload={(file) => handleFileChange({ file })} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload Car Image</Button>
        </Upload>
      </Modal>
    </Layout>
  );
};

export default AddCar;