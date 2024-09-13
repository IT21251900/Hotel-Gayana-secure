import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { search1 } from '../CommonJS/search.js'
import jsPDF from 'jspdf';
import "jspdf-autotable";
// import { confirmReservation } from '../CommonJS/confirm.js';




export default function ShowReservation() {
    const [Reservations, setReservations] = useState([])

    useEffect(() => {
        const getReservations = () => {
            axios.get("http://localhost:8000/api/Reservation/get/")
                .then((res) => {
                    setReservations(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getReservations()
    }, [])

    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/Reservation/delete/${id}`)
            .then(() => {
                setReservations(prevReservations => prevReservations.filter(Reservation => Reservation._id !== id));

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
        doc.text("Hotel Gayana", doc.internal.pageSize.getWidth() / 2, 10, { align: "center" });
        doc.setFontSize(13);
        doc.setFont("helvetica", "normal");
        doc.text("All Reservations", 10, 30);
        doc.text(new Date().toLocaleString(), 10, 40, { fontSize: 10 });
        // define table headers
        const headers = [["#", "Date", "Customer Name", "No of people", "Room Type", "Days stay", "Total", "Status"]];
        // iterate over Reservations and add them to the table
        const data = Reservations.map((Reservation, index) => [index + 1, Reservation.date, Reservation.CusName, Reservation.NoPeople, Reservation.RoomType, Reservation.NoDays, Reservation.Total, Reservation.Status]);
        // add the table to the document
        doc.autoTable({
            head: headers,
            body: data,
            startY: 50,

            didDrawPage: function (data) {
                // add footer text
                doc.setFontSize(10);
                doc.text("This is the footer", data.settings.margin.left, doc.internal.pageSize.getHeight() - 10);
            }
        });
        // save the document

        doc.save("all_Reservations.pdf");
    }

    const handleStatusUpdate = async (id, Status) => {
        try {

            await axios.put(`http://localhost:8000/api/Reservation/update/${id}`, { Status });
            window.location.reload();

        } catch (error) {
            console.log(`Error updating order status: ${error.message}`);
        }
    };




    return (
        <div className='container dashboard'>
            <div className='dashboard-app'>
                <div className='dashboard-content'>
                    <div className='container m-5'>
                        <h1>All Reservations</h1>
                        <button className='btn btn-success'>
                            <a href='/Reservation/add' style={{ textDecoration: 'none', color: 'white' }}>Create New Reservation</a></button>
                        <div>.</div>
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" id="myInput" className="form-control" onKeyUp={(search1)} placeholder="Search for Reservations.." />

                        </div>
                        <br></br>
                        <table className="table" id='myTable'>
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Customer Name</th>
                                    <th>Email</th>
                                    <th>No of people</th>
                                    <th>Room Type</th>
                                    <th>Days stay</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Reservations.map((Reservation, index) => (
                                    <tr key={Reservation._id}>
                                        <td>{index + 1}</td>
                                        <td>{Reservation.date}</td>
                                        <td>{Reservation.CusName}</td>
                                        <td>{Reservation.Email}</td>
                                        <td>{Reservation.NoPeople}</td>
                                        <td>{Reservation.RoomType}</td>
                                        <td>{Reservation.NoDays}</td>
                                        <td>{Reservation.Total}</td>
                                        <td>{Reservation.Status}</td>

                                        <td>
                                            <a className="btn btn-danger" href={'/Reservation/update/' + Reservation._id}>&nbsp;&nbsp;
                                                <i className="fa-solid fa-pen-to-square"></i>Edit&nbsp;&nbsp;</a>
                                            &nbsp;&nbsp;
                                            <button className="btn btn-danger" onClick={() => onDelete(Reservation._id)}>&nbsp;&nbsp;
                                                <i className="fa-sharp fa-solid fa-trash"></i>Delete</button>
                                            &nbsp;&nbsp;

                                            {/* <button className="btn btn-info" onClick={(event) => confirmReservation(event)}>&nbsp;&nbsp;
                                    <i className="fa-sharp fa-solid"></i>Confirm</button> */}

                                            <button className="btn btn-outline-success"
                                                onClick={() => handleStatusUpdate(Reservation._id, "Confirmed")}
                                            >
                                                confirm
                                            </button>


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
