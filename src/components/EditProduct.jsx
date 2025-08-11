import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

function EditProduct() {
  const { productId } = useParams(); // get ID from URL
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current product data
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${productId}`)
      .then(res => {
        const { title, price, description, category } = res.data;
        setFormData({ title, price, description, category });
      })
      .catch(err => {
        console.error("Error fetching product: ", err);
        setError("Failed to load product.");
      });
  }, [productId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit to PUT updated data
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`https://fakestoreapi.com/products/${productId}`, formData)
      .then(() => {
        setSubmitted(true);
        setError(null);
      })
      .catch(err => {
        console.error("Error updating product: ", err);
        setError("Failed to update product.");
      });
  };

  return (
    <Container className="mt-4">
      <h2>Edit Product 🛠️</h2>
      {submitted && <Alert variant="success">Yaaas! Product updated successfully! 💅</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </Form.Group>

        <Button type="submit" variant="primary">Update Product </Button>
      </Form>
    </Container>
  );
}

export default EditProduct;
