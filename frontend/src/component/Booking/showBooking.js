import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {search1}from '../CommonJS/search.js'
import jsPDF from 'jspdf';
import "jspdf-autotable";

export default function ShowBooking() {
    const [Booking, setBooking] = useState([])

    useEffect(() => {
        const getBooking = () => {
            axios.get("http://localhost:8000/api/Booking/get/")
                .then((res) => {
                    setBooking(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getBooking()
    }, [])

    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/Booking/delete/${id}`)
            .then(() => {
                setBooking(prevBooking => prevBooking.filter(Booking => Booking._id !== id));

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
        doc.text("All Bookings", 10, 30);
        doc.text(new Date().toLocaleString(), 10, 40, {fontSize: 10});
        // define table headers
        const headers = [["#", "Date", "Customer Name", "Customer ID", "Vehicle Type", "Days stay"]];
        // iterate over Reservations and add them to the table
        const data = Booking.map((Booking, index) => [index + 1, Booking.date, Booking.CusName, Booking.cus_id, Booking.vehicleType, Booking.NoDays]);
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
        
        doc.save("all_Bookings.pdf");
      }
      
      const handleStatusUpdate = async (id, Status) => {
        try {
        
          await axios.put(`http://localhost:8000/api/Booking/update/${id}`, { Status });
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
            <h1>All Bookings</h1>
            <button className='btn btn-success'>
          <a href='/Booking/add' style={{textDecoration:'none',color:'white'}}>Create New Booking</a></button>
          <div>.</div>
          <div className="input-group flex-nowrap">
            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" id="myInput" className="form-control" onKeyUp={(search1)} placeholder="Search for Booking.."/>
            
            </div>
            <br></br>
            <table className="table" id='myTable'>
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Customer Name</th>
                        <th>Customer ID</th>
                        <th>Vehicle Type</th>
                        <th>Days </th>
                        <th>Status</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {Booking.map((Booking, index) => (
                        <tr key={Booking._id}>
                            <td>{index + 1}</td>
                            <td>{Booking.date}</td>
                            <td>{Booking.CusName}</td>
                            <td>{Booking.cus_id}</td>
                            <td>{Booking.vehicleType}</td>
                            <td>{Booking.NoDays}</td>
                            <td>{Booking.Status}</td>
                            
                            <td>
                                <a className="btn btn-warning" href={'/Booking/update/' + Booking._id}>&nbsp;&nbsp;
                                    <i className="fa-solid fa-pen-to-square"></i>Edit&nbsp;&nbsp;</a>
                                &nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={() => onDelete(Booking._id)}>&nbsp;&nbsp;
                                    <i className="fa-sharp fa-solid fa-trash"></i>Delete</button>
                                     &nbsp;&nbsp;
                                <button className="btn btn-outline-success"
                                onClick={() => handleStatusUpdate(Booking._id, "Confirmed")}> confirm</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <button onClick={generatePDF} className="btn btn-primary btn-sm">
  <i className="fa fa-download"></i> Download PDF
</button>

            </div>
            </div>
            </div>
            </div>
    )
}
