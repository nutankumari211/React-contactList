import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Add = () => {
    // State variables for name, email, and number
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    // Get contacts from the Redux store
    const contacts = useSelector(state => state);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handelSubmit = e => {
        e.preventDefault();

        // Check if email already exists
        const checkEmail = contacts.find(contact => contact.email === email && email);
        // Check if number already exists
        const checkNumber = contacts.find(contact => contact.number === parseInt(number) && number);

        // Validate input fields
        if (!email || !number || !name) {
            return toast.warning("Please fill in all fields!");
        }

        // Check for existing email
        if (checkEmail) {
            return toast.error("This email already exists!");
        }

        // Check for existing number
        if (checkNumber) {
            return toast.error("This number already exists!");
        }

        // Create new contact object
        const data = {
            id: contacts[contacts.length - 1].id + 1,
            name,
            email,
            number
        }

        // Dispatch action to add contact
        dispatch({ type: 'ADD_CONTACT', payload: data });
        toast.success("Contact added successfully!!");
        navigate('/');
    };

    return (
        <div className='container'>
            <h1 className='display-3 text-center fw-bold'><span className='headings'>Add Contact</span></h1>
            <div className='row'>
                <div className='col-md-6 shadow mx-auto p-5'>
                    <form className='text-center' onSubmit={handelSubmit}>
                        <div className='form-group mb-3'>
                            <input type='text' placeholder='Name' className='form-control'
                                value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <input type='email' placeholder='Email' className='form-control'
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <input type='number' placeholder='Phone Number' className='form-control'
                                value={number} onChange={e => setNumber(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <input type='submit' value='Add Contact' className='btn btn-outline-success' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Add;
