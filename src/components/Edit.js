import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    const { id } = useParams();

    const contacts = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentContact = contacts.find(contact => contact.id === parseInt(id));

    useEffect(() => {
        // Update form fields when currentContact changes
        if (currentContact) {
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }
    }, [currentContact]);

    const handelSubmit = e => {
        e.preventDefault();

        // Check for existing email and number (excluding the current contact being edited)
        const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email);
        const checkNumber = contacts.find(contact => contact.id !== parseInt(id) && contact.number === parseInt(number));

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

        const data = {
            id: parseInt(id),
            name,
            email,
            number
        }

        // Dispatch action to update contact
        dispatch({ type: 'UPDATE_CONTACT', payload: data });
        toast.success("Contact updated successfully!!");
        navigate('/');
    };

    return (
        <div className='container'>
            {currentContact ? (
                <>
                    <h1 className='display-3 text-center fw-bold'><span className='headings'>Edit Contact {id}</span></h1>
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
                                    <input type='submit' value='Update Contact' className='btn btn-outline-success' />
                                    <Link to='/' className='btn btn-outline-danger ms-3'>Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <h1 className='display-3 my-5 text-center fw-bold'>Contact with id {id} does not exist!!</h1>
            )}
        </div>
    );
}

export default Edit;
