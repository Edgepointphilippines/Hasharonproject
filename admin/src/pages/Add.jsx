import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";

const Add = () => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [video, setVideo] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [bestseller, setBestseller] = useState(false);
    const [discount, setDiscount] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [token, setToken] = useState("");
    const [weight, setWeight] = useState("");

    // Fetch token from local storage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            alert("No authentication token found. Please log in again.");
        }
    }, []);

    // Fetch categories from backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/categories`);
                setCategories(response.data);
                if (response.data.length > 0) {
                    setCategory(response.data[0].name); // Set default category
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleImageChange = (file, setImage) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert("Image size should be less than 2MB");
            return;
        }
        if (!["image/jpeg", "image/png"].includes(file.type)) {
            alert("Only JPG and PNG formats are allowed");
            return;
        }
        setImage(file);
    };

    const handleVideoChange = (file) => {
        if (!file) return;
        if (file.size > 100 * 1024 * 1024) { // Limit video size to 10MB
            alert("Video size should be less than 10MB");
            return;
        }
        if (!["video/mp4", "video/avi", "video/mkv"].includes(file.type)) {
            alert("Only MP4, AVI, and MKV formats are allowed");
            return;
        }
        setVideo(file);
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPrice(value === "" ? "" : Math.max(0, parseFloat(value) || 0));
    };
    
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        setQuantity(value === "" ? "" : Math.max(0, parseInt(value, 10) || 0));
    };
    
    const handleDiscountChange = (e) => {
        const value = e.target.value;
        setDiscount(value === "" ? "" : Math.max(0, parseFloat(value) || 0));
    };
    
    const handleWeightChange = (e) => { const value = e.target.value; setWeight(value === "" ? "" : Math.max(0, parseFloat(value) || 0));};
    

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!token) {
            alert("Authentication failed. Please log in again.");
            setIsSubmitting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", Number(price));
            formData.append("quantity", Number(quantity));
            formData.append("category", category);
            formData.append("bestseller", bestseller ? "true" : "false");
            formData.append("discount", Number(discount));
            formData.append("weight", Number(weight));

            if (image1) formData.append("image1", image1); // Make sure field name matches in multer configuration
            if (image2) formData.append("image2", image2); // Same for other image fields
            if (image3) formData.append("image3", image3);
            if (image4) formData.append("image4", image4);
            if (video) formData.append("video", video);


            console.log("Form Data Entries:");
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            await axios.post(`${backendUrl}/api/product/add`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Product added successfully!");
            setName("");
            setDescription("");
            setPrice("");
            setQuantity(1);
            setDiscount("");
            setWeight("");
            setCategory(categories.length > 0 ? categories[0].name : "");
            setBestseller(false);
            setImage1(null);
            setImage2(null);
            setImage3(null);
            setImage4(null);
            setVideo(null); // Reset video state
        } catch (error) {
            console.error("Error adding product:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong. Please try again!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-start w-full gap-3">
            {/* Image Upload */}
            <div>
                <p className="mb-2">Upload Image</p>
                <div className="flex gap-2">
                    {[image1, image2, image3, image4].map((image, index) => (
                        <label key={index} htmlFor={`image${index + 1}`}>
                            <img
                                className="w-20"
                                src={image ? URL.createObjectURL(image) : assets.upload_area}
                                alt={image ? `Preview ${index + 1}` : `Upload ${index + 1}`}
                            />
                            <input
                                onChange={(e) => handleImageChange(e.target.files[0], [setImage1, setImage2, setImage3, setImage4][index])}
                                type="file"
                                id={`image${index + 1}`}
                                hidden
                            />
                        </label>
                    ))}
                </div>
            </div>

             {/* Video Upload */}
             <div className="w-full">
                <p className="mb-2">Upload Video (Optional)</p>
                <input
                    type="file"
                    onChange={(e) => handleVideoChange(e.target.files[0])}
                    accept="video/mp4,video/avi,video/mkv"
                    className="w-full px-3 py-2"
                />
                {video && (
                    <div className="mt-2">
                        <p>Video Preview:</p>
                        <video width="200" controls>
                            <source src={URL.createObjectURL(video)} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>

            {/* Product Fields */}
            <div className="w-full">
                <p className="mb-2">Product Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className="w-full px-3 py-2" type="text" required />
            </div>

            <div className="w-full">
                <p className="mb-2">Product Description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full px-3 py-2" required />
            </div>

            <div className="w-full">
                <p className="mb-2">Product Weight (kg)</p>
                <input 
                    onChange={handleWeightChange} 
                    value={weight} 
                    className="w-full px-3 py-2" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    required 
                />
            </div>


            <div className="w-full">
                <p className="mb-2">Product Price</p>
                <input onChange={handlePriceChange} value={price} className="w-full px-3 py-2" type="number" required />
            </div>

            <div className="w-full">
                <p className="mb-2">Product Quantity</p>
                <input onChange={handleQuantityChange} value={quantity} className="w-full px-3 py-2" type="number" required />
            </div>

            <div className="w-full">
                <p className="mb-2">Product Discount (%)</p>
                <input onChange={handleDiscountChange} value={discount} className="w-full px-3 py-2" type="number" min="0" />
            </div>

            {/* Category Dropdown */}
            <div className="w-full">
                <p className="mb-2">Product Category</p>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                >
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Bestseller Checkbox */}
            <div className="flex gap-2 mt-2">
                <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
                <label htmlFor="bestseller">Add to Bestseller</label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="py-3 mt-4 text-white bg-black w-28" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "ADD"}
            </button>
        </form>
    );
};

export default Add;
