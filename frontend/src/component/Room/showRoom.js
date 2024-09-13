import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { search } from '../CommonJS/search.js'
import jsPDF from 'jspdf';
import "jspdf-autotable";



export default function ShowRoom() {
    const [Rooms, setRooms] = useState([])

    useEffect(() => {
        const getRooms = () => {
            axios.get("http://localhost:8000/api/Room/get/")
                .then((res) => {
                    setRooms(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getRooms()
    }, [])

    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/Room/delete/${id}`)
            .then(() => {
                setRooms(prevCategories => prevCategories.filter(Room => Room._id !== id));
                console.log('Room with id:', id, 'deleted');
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
        doc.text("All Rooms", 10, 30);
        doc.text(new Date().toLocaleString(), 10, 40, { fontSize: 10 });
        // define table headers
        const headers = [["#", "Room Type", "Price", "Description"]];
        // iterate over Rooms and add them to the table
        const data = Rooms.map((Room, index) => [index + 1, Room.RoomType, Room.price, Room.description]);
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

        doc.save("all_rooms.pdf");
    }





    return (
        <div className='container dashboard'>
            <div className='dashboard-app'>
                <div className='dashboard-content'>
                    <div className='container m-5'>
                        <h1>All Rooms</h1>
                        <button className='btn btn-success'>
                            <a href='/Room/add' style={{ textDecoration: 'none', color: 'white' }}>Create New Room</a></button>
                        <br></br>
                        <div>.</div>
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" id="myInput" className="form-control" onKeyUp={(search)} placeholder="Search for Rooms.." />

                        </div>
                        <br></br>
                        <table className="table" id='myTable'>
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Room Type</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Rooms.map((Room, index) => (
                                    <tr key={Room._id}>
                                        <td>{index + 1}</td>
                                        <td>{Room.RoomType}</td>
                                        <td>{Room.price}</td>
                                        <td>{Room.description}</td>

                                        <td>
                                            <a className="btn btn-warning" href={'/Room/update/' + Room._id}>&nbsp;&nbsp;
                                                <i className="fa-solid fa-pen-to-square"></i>Edit&nbsp;&nbsp;</a>
                                            &nbsp;&nbsp;
                                            <button className="btn btn-danger" onClick={() => onDelete(Room._id)}>&nbsp;&nbsp;
                                                <i className="fa-sharp fa-solid fa-trash"></i>Delete</button>
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
