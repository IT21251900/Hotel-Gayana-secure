import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {search}from '../CommonJS/customer_search.js'
import jsPDF from 'jspdf';
import "jspdf-autotable";

export default function ShowCustomer() {
    const [customer, setCustomer] = useState([])

    useEffect(() => {
      const getCustomer = () => {
          axios.get("http://localhost:8000/api/customer/get/")
              .then((res) => {
                  setCustomer(res.data)
              })
              .catch((err) => {
                  console.log(err)
              })
      }
      getCustomer()
  }, [])


    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/customer/delete/${id}`)
            .then(() => {
                setCustomer(prevCategories=> prevCategories.filter(customer => customer._id !== id));
                console.log('customer with id:', id, 'deleted');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    const generatePDF = () => {
        // create new PDF document
        const doc = new jsPDF();
        // set font size and style
        doc.setFontSize(24);
        doc.setFont("times", "bold");
        // add content to the document
        doc.text("Hotel Gayana", doc.internal.pageSize.getWidth()/2, 10, {align: "center"});
        doc.setFontSize(13);
        doc.setFont("helvetica", "normal");
        doc.text("Customers Details", 10, 30);
        doc.text( new Date().toLocaleString(), 10, 40, {fontSize: 10});
        // define table headers
        const headers = [["#", "Booking Ref.", "Name", "NIC","DOB","Tel. No.","Email", "Address","Country"]];
        // define column widths as percentages
        const columnWidths = ["1%", "1%", "10%","8%", "20%", "8%", "20%", "20%", "12%"];
        // iterate over Rooms and add them to the table
        const data = customer.map((customer, index) => [index + 1, customer.bookingRef, customer.customerName, customer.NIC,customer.DOB,customer.telephoneNumber,customer.email,customer.address,customer.country]);
        // add the table to the document
        doc.autoTable({
          head: headers,
          body: data,
          startY: 50,
          columnWidth: columnWidths,
          didDrawPage: function(data) {
            // add footer text
            doc.setFontSize(10);
            doc.text("This is the footer", data.settings.margin.left, doc.internal.pageSize.getHeight() - 10);
          },
        // center align headers and columns
        headStyles: {
            fillColor: [44, 130, 201],
            textColor: 255,
            halign: 'center'
         },
        styles: {
           halign: 'center'
         }  
        });
        // save the document
        doc.save("customer_details.pdf");
      }
      

    return (
        <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
                    <br></br>
        <div className='m-2'>
            <h1>Customer Details</h1>
            <br></br>
            <button className='btn btn-success'>
          <a href='/customer/add' style={{textDecoration:'none',color:'white'}}>Create New Customer</a></button>

          <br></br>
          <br></br>

          <div className="input-group flex-nowrap" >
            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" id="myInput" className="form-control" onKeyUp={(search)} placeholder="Search for Customer NIC.."/>  
            </div>
          <div className='search-wrapper'>    

          <br></br>
          <div></div>
          
          <table className="table" id="myTable" style={{ width: '100%' }}>
                <thead  >
                    <tr>
                        <th style={{ width: '1%',borderBottom: '1px solid black' }}><center>#</center></th>
                        <th style={{ width: '1%',borderBottom: '1px solid black' }}><center>Booking Reference</center></th>
                        <th style={{ width: '10%',borderBottom: '1px solid black'}}><center>Name</center></th>
                        <th style={{ width: '8%',borderBottom: '1px solid black' }}><center>NIC</center></th>
                        <th style={{ width: '20%',borderBottom: '1px solid black' }}><center>Date of Birth</center></th>
                        <th style={{ width: '8%',borderBottom: '1px solid black' }}><center>Telephone Number</center></th>
                        <th style={{ width: '20%',borderBottom: '1px solid black' }}><center>Email</center></th>
                        <th style={{ width: '20%' ,borderBottom: '1px solid black'}}><center>Address</center></th>
                        <th style={{ width: '12%',borderBottom: '1px solid black' }}><center>Country</center></th>
                    </tr>
                </thead>
                <tbody>
                    {customer.map((customer, index) => ( 
                        <tr key={customer._id}>
                            <td>{index + 1}</td>
                            <td><center>{customer.bookingRef}</center></td>
                            <td><center>{customer.customerName}</center></td>
                            <td><center>{customer.NIC}</center></td>
                            <td><center>{customer.DOB}</center></td>
                            <td><center>{customer.telephoneNumber}</center></td>
                            <td><center>{customer.email}</center></td>
                            <td><center>{customer.address}</center></td>
                            <td><center>{customer.country}</center></td>
                            <td>
                                <a className="btn btn-warning" href={'/customer/update/' + customer._id} style={{width: '140%', height: '38px'}}>&nbsp;&nbsp;
                                    <i className="fa-solid fa-pen-to-square"></i>Edit&nbsp;&nbsp;</a>   
                                &nbsp;&nbsp;
                                
                                <button style={{width: '140%',height: '38px'}}className="btn btn-danger" onClick={() => onDelete(customer._id)}>&nbsp;&nbsp;
                                    <i className="fa-sharp fa-solid fa-trash"></i>Delete</button>

                            </td>
                        </tr>  
                    ))}
                </tbody>
            </table>
            <button onClick={generatePDF} className="btn btn-primary btn-sm"><i className="fa fa-download"></i> Download PDF</button>
            </div>
            </div>
            </div>
            </div>
            </div>
    )
}