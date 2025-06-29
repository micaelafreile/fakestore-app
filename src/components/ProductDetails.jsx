import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    {/* 
        Upon any detected changes in the state of 'id', make an HTTP GET request to FakeStoreAPI 
        to retrieve the product details for that particular product id.
        Then, save the result in the 'product' variable. 
    */}
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

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        
        <Container>
            <h1> Product Details</h1>
            <Card className="product-card">
                <Card.Img className="product-image" variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>${product.price}</Card.Text>
                </Card.Body>
                {/* <Button variant="primary" type="submit">
                    Add to Cart
                </Button> */}
            <Link className="custom-button" to={`/products/cart${product}`}>Add to cart</Link>
                 <Button variant="danger" href={`/delete/${product.id}`}>Delete</Button>
            </Card>
    
        </Container>
    )
}

export default ProductDetails;