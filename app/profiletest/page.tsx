"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const Page = () => {
  const { user } = useUser();
  const [customer, setCustomer] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [formData, setFormData] = useState<any>({}); // Store editable form data

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    const userId = user?.id || storedUserId;

    if (userId) {
      const fetchCustomer = async () => {
        try {
          const { data } = await axios.post("/api/api_open", {
            sn: "customer_get",
            id: userId,
          });

          if (data.status === "success") {
            setCustomer(data.result);
            setFormData(data.result); // Initialize form data with customer data
          } else {
            setError("Failed to fetch customer data");
          }
        } catch (err) {
          setError("Error fetching data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchCustomer();
    } else {
      setError("User ID not found.");
      setLoading(false);
    }
  }, [user?.id]);

  // Handle input changes in edit mode
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      const { data } = await axios.post("/api/api_open", {
        sn: "customer_edit_profile",
        ...formData,
      });

      if (data.status === "success") {
        setCustomer(formData); // Update displayed data with new values
        setIsEditing(false); // Exit edit mode
      } else {
        setError("Failed to update customer data");
      }
    } catch (err) {
      setError("Error updating data");
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Customer Details</h1>
      {error && <p className="text-red-500">{error}</p>}
      {customer ? (
        <div className="mt-4 p-4 border rounded shadow">
          <div className="flex justify-end mb-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            ) : (
              <div>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <p>
            <strong>ID:</strong> {customer.id}
          </p>

          <p>
            <strong>Организацын нэр:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="org_name"
                value={formData.org_name || ""}
                onChange={handleInputChange}
                className="border p-1 rounded"
              />
            ) : (
              customer.org_name
            )}
          </p>

          <p>
            <strong>Нэр:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name || ""}
                onChange={handleInputChange}
                className="border p-1 rounded"
              />
            ) : (
              customer.customer_name
            )}
          </p>

          <p>
            <strong>Имэйл:</strong>{" "}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                className="border p-1 rounded"
              />
            ) : (
              customer.email
            )}
          </p>

          <p>
            <strong>Утас:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleInputChange}
                className="border p-1 rounded"
              />
            ) : (
              customer.phone
            )}
          </p>

          <p>
            <strong>Үүсгэсэн огноо:</strong>{" "}
            {new Date(customer.created_at).toLocaleDateString()}
          </p>
        </div>
      ) : (
        !error && <p>No customer data found.</p>
      )}
    </div>
  );
};

export default Page;
