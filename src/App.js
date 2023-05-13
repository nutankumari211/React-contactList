import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch contacts from an API and update the state
    const fetchData = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/");
      const json = await response.json();
      const data = json.map((contact) => ({
        id: contact.id,
        name: contact.name,
        number: contact.phone,
        email: contact.email,
      }));
      dispatch({ type: "FETCH_CONTACTS", payload: data });
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default App;
