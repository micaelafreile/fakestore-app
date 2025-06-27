import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to load product details");
                setLoading(false);
            });
    }, [id]);

    const deleteProduct = async () => {
        try {
            await axios.delete(`https://fakestoreapi.com/products/${id}`);
            setSuccess(`Product #${id} deleted.`);
            setShowModal(false);
            setTimeout(() => navigate('/products'), 1500);
        } catch (err) {
            setError("Delete failed.");
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="mt-4">
            <h1> Product Details</h1>
            <Card className="product-card">
                <Card.Img className="product-image" variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>${product.price}</Card.Text>
                    <Button variant="danger" onClick={() => setShowModal(true)}>Delete Product</Button>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete <strong>{product.title}</strong>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteProduct}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        </Container>
    );
}

export default ProductDetails;


// DeleteProduct.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Modal, Alert } from 'react-bootstrap';

function DeleteProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Failed to load product.");
      });
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setSuccess(`Product #${id} deleted.`);
      setShowModal(false);
      setTimeout(() => navigate('/products'), 1500);
    } catch (err) {
      setError("Delete failed.");
    }
  };

  return (
    <Container className="mt-4">
      <h1>Delete Product</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {product && (
        <>
          <p><strong>Are you sure you want to delete this product?</strong></p>
          <p>{product.title}</p>
          <Button variant="danger" onClick={() => setShowModal(true)}>Delete Product</Button>
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete <b>{product?.title}</b>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={deleteProduct}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DeleteProduct;