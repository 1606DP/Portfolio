import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, message, Input } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const projects = Array.isArray(portfolioData?.projects) ? portfolioData.projects : [];
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [type ,setType] = React.useState("add");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const tempTechnologies = values?.technologies
        ? values.technologies.split(",").map((t) => t.trim())
        : [];
      const payload = {
        ...values,
        technologies: tempTechnologies,
      };
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-project", {
          ...payload,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-project", payload);
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        form.resetFields();
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        setType("add");
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-project",{
        _id: item._id,
      });
      dispatch(HideLoading());
      if (response.data.success){
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } 
    }catch(error){
        dispatch(HideLoading());
        message.error(error.message);
      }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            setType("add");
            form.resetFields();
            setShowAddEditModal(true);
          }}
        >
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-1">
        {projects.map((project) => {
          const description1 = project.description1 || project.description || "";
          const description2 = project.description2 || "";
          return (
            <div className="shadow border p-5 border-gray-400 flex flex-col gap-5" key={project._id || project.title}>
              <h1 className="text-primary text-xl font-bold">{project.title}</h1>
              <hr />
              <img src={project.image} alt="" className="h-60 w-80" />
              <h1>Role : {project.title}</h1>
              <p>{description1}</p>
              <p>{description2}</p>
              <div className="flex justify-end gap-5 mt-5">
                <button
                  className="bg-red-500 text-white px-5 py-2"
                  onClick={() => {
                    onDelete(project);
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-primary text-white px-5 py-2"
                  onClick={() => {
                    setSelectedItemForEdit(project);
                    setShowAddEditModal(true);
                    setType("edit");
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {
        showAddEditModal && (
          <Modal
            open={showAddEditModal}
            title={selectedItemForEdit ? "Edit Project" : "Add Project"}
            footer={null}
            destroyOnClose
            onCancel={() => {
              form.resetFields();
              setShowAddEditModal(false);
              setSelectedItemForEdit(null);
              setType("add");
            }}
          >
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              initialValues={
                selectedItemForEdit
                  ? {
                      ...selectedItemForEdit,
                      technologies: selectedItemForEdit?.technologies?.join(","),
                      description1: selectedItemForEdit?.description1 || "",
                      description2: selectedItemForEdit?.description2 || "",
                    }
                  : {}
              }
            >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a project title" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter an image URL" }]}
          >
            <Input placeholder="image" />
          </Form.Item>
          <Form.Item
            name="description1"
            label="Description1"
            rules={[{ required: true, message: "Please enter description line 1" }]}
          >
            <Input.TextArea placeholder="Description1" rows={3} />
          </Form.Item>
          <Form.Item
            name="description2"
            label="Description2"
            rules={[{ required: true, message: "Please enter description line 2" }]}
          >
            <Input.TextArea placeholder="Description2" rows={3} />
          </Form.Item>
          <Form.Item
            name="link"
            label="Link"
            rules={[{ required: true, message: "Please enter a project link" }]}
          >
            <Input placeholder="Link" />
          </Form.Item>
          <Form.Item
            name="technologies"
            label="Technologies"
            rules={[{ required: true, message: "Please enter at least one technology" }]}
          >
            <Input placeholder="Technologies" />
          </Form.Item>
            <div className="flex justify-end">
            <button
              type="button"
              className="border-primary text-primary px-5 py-2 mr-2"
              onClick={() => {
                  form.resetFields();
                  setShowAddEditModal(false);
                  setSelectedItemForEdit(null);
                  setType("add");
              }}
            >
              Cancel
            </button>
            <button htmlType="submit" className="bg-primary text-white px-5 py-2">
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
        )
      }
    </div>
  );
}

export default AdminProjects;
