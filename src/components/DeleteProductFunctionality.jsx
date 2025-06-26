import axios from "axios";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function FindDeletePost() {
    const { id } = useParams();
    const [postId, setPostId] = useState('');
    const [post, setPost] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle input change
    const handlePostIdChange = (event) => {
        setPostId(event.target.value);
    };

 // Form validation
 const validateForm = () => {
    if (postId.trim() === '') {
        setError('Post ID is required');
        return false;
    }
    setError('');
    return true;
};

 // Handle form submission
 const findPost = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
        return; // If validation fails, exit
    }

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)

        if (!response.ok) {
            setPost('');
            throw new Error('Failed to find post');
        }

        const data = await response.json();
        setPost(data);
        setPostId(data.id); // we set this so we can later delete the post if we want

    } catch (error) {
        setError(error.message);
    }
};


















    export default FindDeletePost;