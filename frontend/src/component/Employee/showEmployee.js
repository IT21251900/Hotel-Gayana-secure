import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {search1}from '../CommonJS/search.js'
import jsPDF from 'jspdf';
import "jspdf-autotable";

export default function ShowEmployee() {
    const [Employee, setEmployee] = useState([])

    useEffect(() => {
        const getEmployee = () => {
            axios.get("http://localhost:8000/api/Employee/get/")
                .then((res) => {
                    setEmployee(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getEmployee()
    }, [])

    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/Employee/delete/${id}`)
            .then(() => {
                setEmployee(prevEmployee => prevEmployee.filter(Employee => Employee._id !== id));

                console.log('Reservation with id:', id, 'deleted');
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
        doc.text("All Employees", 10, 30);
        doc.text(new Date().toLocaleString(), 10, 40, {fontSize: 10});
        // define table headers
        const headers = [["#", "First name", "Last Name", "Date of Birth", "Address", "Employee Telephone", "Employee Email"]];
        // iterate over Reservations and add them to the table
        const data = Employee.map((Employee, index) => [index + 1, Employee.firstName, Employee.lastName, Employee.DOB,Employee.address, Employee.telephone, Employee.email]);
        // add the table to the document
        doc.autoTable({
          head: headers,
          body: data,
          startY: 50,

          didDrawPage: function(data) {
            // add footer text
            doc.setFontSize(10);
            doc.text("This is the footer", data.settings.margin.left, doc.internal.pageSize.getHeight() - 10);
          }
        });
        // save the document
        
        doc.save("all_Employees.pdf");
      }
      
      const handleStatusUpdate = async (id, Status) => {
        try {
        
          await axios.put(`http://localhost:8000/api/Employee/update/${id}`, { Status });
          window.location.reload();
         
        } catch (error) {
          console.log(`Error updating order status: ${error.message}`);
        }
    };
      
    return (
        <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
        <div className='m-5'>
            <h1>All Employees</h1>
            <button className='btn btn-success'>
          <a href='/Employee/add' style={{textDecoration:'none',color:'white'}}>Create Employee</a></button>
          <div>.</div>
          <div className="input-group flex-nowrap">
            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" id="myInput" className="form-control" onKeyUp={(search1)} placeholder="Search Employees.."/>
            
            </div>
            <br></br>
            <table className="table" id='myTable'>
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Employee Telephone</th>
                        <th>Employee Email</th>
                    </tr>
                </thead>
                <tbody>
                    {Employee.map((Employee, index) => (
                        <tr key={Employee._id}>
                            <td>{index + 1}</td>
                            <td>{Employee.firstName}</td>
                            <td>{Employee.lastName}</td>
                            <td>{Employee.DOB}</td>
                            <td>{Employee.address}</td>
                            <td>{Employee.telephone}</td>
                            <td>{Employee.email}</td>
                            
                            <td>
                                <a className="btn btn-warning" href={'/Employee/update/' + Employee._id}>&nbsp;&nbsp;
                                    <i className="fa-solid fa-pen-to-square"></i>Edit&nbsp;&nbsp;</a>
                                &nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={() => onDelete(Employee._id)}>&nbsp;&nbsp;
                                    <i className="fa-sharp fa-solid fa-trash"></i>Delete</button>
                                     &nbsp;&nbsp;
                                <button className="btn btn-outline-success"
                                onClick={() => handleStatusUpdate(Employee._id, "Confirmed")}> confirm</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <button onClick={generatePDF} class="btn btn-primary btn-sm">
  <i class="fa fa-download"></i> Download PDF
</button>

            </div>
            </div>
            </div>
            </div>
    )
}
