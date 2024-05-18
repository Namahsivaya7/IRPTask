import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [original_price, setOriginal_price] = useState("");
  const [selling_price, setSelling_price] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  // const [photo,setPhoto]=useState("");
  const [photos, setPhotos] = useState([]);

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("somrthing went wronmg in getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //create product
  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("original_price", original_price);
      productData.append("selling_price", selling_price);
      productData.append("discount", discount);
      productData.append("category", category);

      photos?.forEach((photo, index) => {
        productData.append(`photos[${index}]`, photo);
      });

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      console.log(data.data);

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product created successfully");
        // Reset form fields after successful creation
        setName("");
        setDescription("");
        setOriginal_price("");
        setSelling_price("");
        setDiscount("");
        setCategory("");
        setPhotos([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
    }
  };
  console.log(photos);
  return (
    <Layout title={"Dashboard-Create Product"}>
      <div className="container-fluid p-3" id="adminCreateProduct">
        <div className="row" style={{ marginTop: 50 }}>
          <div className="col-md-3" style={{zIndex:1}}>
            <AdminMenu />
          </div>
          <div className="col-md-6">
            <h1>create product</h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="select a catrgory"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                {/* <label  className='btn btn-outline-secondary col-md-12'>
                            {photo ? photo.name:"upload photo"}
                            <input type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])}hidden/>
                        </label> */}
                <label className="btn btn-outline-secondary col-md-12">
                  {photos.length > 0
                    ? `${photos.length} photos selected`
                    : "Upload Photos"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    // onChange={handlePhotoChange}
                    onChange={(e) => setPhotos([...e.target.files])}
                    multiple
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photos.length > 0 && (
                  <div className="text-center">
                    {photos.map((photo, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(photo)}
                        alt={`product-${index}`}
                        height={"200px"}
                        className="img img-responsive mr-2"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                 
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="write product desciption"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={original_price}
                  placeholder="enter original price"
                  className="form-control"
                  onChange={(e) => setOriginal_price(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={selling_price}
                  placeholder="enter selling price"
                  className="form-control"
                  onChange={(e) => setSelling_price(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={discount}
                  placeholder="enter discount value"
                  className="form-control"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  create product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CreateProduct;
