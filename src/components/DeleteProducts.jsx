import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

function DeleteProducts() {
  const { id } = useParams(); 
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const fetchUserAndTodos = async () => {
      try {
        const userResponse = await axios.delete(`https://fakestoreapi.com/users/${id}`);
        setSuccess(userResponse.data);
        navigate('/');

      } catch (error) {
        setError(`Failed to delete: ${error.message}`);

      } finally {
        // setLoading(false);
      }
    };

    if (id) {
      fetchUserAndTodos();
    }
  }, [id]);



  //const [product, deleteProduct] = useState('');
  // const [error, setError] = useState('');

  // const handleDelete = async (Id) => {
  //   try {
  //     await fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' });
  //     setPosts(posts.filter((post) => post.id !== Id)); // Update local state after successful deletion
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //     // Handle error (e.g., show an alert)
  //   }
  // };

  //const [posts, setPosts] = useState([]); // Assuming 'posts' is your state

  // const handleDelete = (id) => {
  //   setPosts(posts.filter((post) => post.id !== id));
  // };

// deleting the mofo
    // fetch('https://fakestoreapi.com/products/1', {
    //   method: 'DELETE'
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data));

    return (
      <>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
      </>
    )
  }

export default DeleteProducts;


