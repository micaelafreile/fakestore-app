import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmModal from './ConfirmModal';

function DeleteProducts() {
  const { id } = useParams(); 
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
    
  useEffect(() => {
    if (id) {
      setShowModal(true);
    }
  }, [id]);

  const deleteProducts = async () => {
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

  const handleModalClose = (userConfirmed) => {
    setShowModal(false);
    if (userConfirmed) {
      deleteProducts();
    } else {
      navigate(`/products/${id}`)
    }
  };
  
  return (
    <>
      <ConfirmModal
        show={showModal}
        onClose={handleModalClose}
        message="Are you sure you want to delete this item?"
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </>
  )
}

export default DeleteProducts;


