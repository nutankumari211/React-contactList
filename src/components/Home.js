import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
    const contacts = useSelector(state => state);
    const dispatch = useDispatch();

    const deleteContact = (id) => {
        // Dispatch action to delete contact
        dispatch({ type: 'DELETE_CONTACT', payload: id });
        toast.success('Contact deleted successfully!');
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12 my-5 text-end'>
                    {/* Add contact button */}
                    <span className='add-button'>Click To Add Contacts</span>
                    <Link to='/add' className='btn btn-primary btn-lg'>
                        Add Contact &nbsp;
                        <i className="fa-solid fa-arrow-right"></i>&nbsp;<i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
                <div className='col-md-10 mx-auto'>
                    <table className='table-hover table table-hover table-success'>
                        <thead className='table-light text-center'>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'><i className="fa-solid fa-at"></i>Email</th>
                                <th scope='col'><i className="fa-solid fa-phone"></i> Number</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contacts.map((contact, id) => (
                                    <tr className='row-name' key={id}>
                                        <td>{id + 1}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.number}</td>
                                        <td>
                                            {/* Edit contact button */}
                                            <Link to={`/edit/${contact.id}`} className='btn btn-info me-2'>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            {/* Delete contact button */}
                                            <button type='button' onClick={() => deleteContact(contact.id)} className="button btn btn-primary">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;
