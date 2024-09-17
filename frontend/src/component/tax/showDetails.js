import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { search } from '../CommonJS/search.js';
import "jspdf-autotable";

export default function ShowTax() {
  const [tax, setTax] = useState([]);

  useEffect(() => {
    const getTax = () => {
      axios.get("http://localhost:8000/api/tax/get/")
        .then((res) => {
          setTax(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTax();
  }, []);

  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/api/tax/delete/${id}`)
      .then(() => {
        setTax((prevTax) => prevTax.filter((tax) => tax._id !== id));
        console.log('tax with id:', id, 'deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='m-5'>
            <h1>Tax Details </h1>
            <br />
            <button className='btn btn-success'>
              <a href='/tax/add' style={{ textDecoration: 'none', color: 'white' }}>Add Additional Taxes</a>
            </button>
            <br />
            <br />
            <div className="input-group flex-nowrap">
              <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" id="myInput" className="form-control" onKeyUp={search} placeholder="Search for Name.." />
            </div>
            <div className='search-wrapper'>
              <br />
              <div></div>
              <table className="table" id="myTable">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Tax Code</th>
                    <th>Tax Rate Type</th>
                    <th>Rate Amount</th>
                    <th>Available for Invoicing</th>
                  </tr>
                </thead>
                <tbody>
                  {tax.map((tax, index) => (
                    <tr key={tax._id}>
                      <td>{index + 1}</td>
                      <td>{tax.Name}</td>
                      <td><center>{tax.Tax_code}</center></td>
                      <td><center>{tax.Tax_Rate_Type}</center></td>
                      <td><center>{tax.Rate_Amount}</center></td>
                      <td>{tax.Available_for_Invoicing}</td>
                      <td>
                        <a className="btn btn-warning" href={'/tax/update/' + tax._id}>&nbsp;&nbsp;
                          <i className="fa-solid fa-pen-to-square"></i>Edit&nbsp;&nbsp;</a>

                        &nbsp;&nbsp;
                        <button className="btn btn-danger" onClick={() => onDelete(tax._id)}>&nbsp;&nbsp;
                          <i className="fa-sharp fa-solid fa-trash"></i>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
