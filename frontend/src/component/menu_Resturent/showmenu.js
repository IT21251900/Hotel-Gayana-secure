import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {search}from '../CommonJS/search.js'
import jsPDF from 'jspdf';
import "jspdf-autotable";

export default function Showmenu() {
    const [menu, setmenu] = useState([])

    useEffect(() => {
      const getmenu = () => {
          axios.get("http://localhost:8000/api/menu/get/")
              .then((res) => {
                  setmenu(res.data)
              })
              .catch((err) => {
                  console.log(err)
              })
      }
      getmenu()
  }, [])


    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/menu/delete/${id}`)
            .then(() => {
                setmenu(prevVehicles=> prevVehicles.filter(menu => menu._id !== id));
                console.log('vehicle with id:', id, 'deleted');
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
        doc.text("All menu", 10, 30);
        doc.text( new Date().toLocaleString(), 10, 40, {fontSize: 10});
        // define table headers
        const headers = [["#", "menuModel", "menu Dash Number", "Category","Price","Description"]];
        // iterate over Rooms and add them to the table
        const data = menu.map((menu, index) => [index + 1, menu.menuModel, menu.menu, menu.menucat,menu.price,menu.description]);
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
        doc.save("all_vehicles.pdf");
      }
      

    return (
        <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
        <div className='m-5'>
            <h1>All Menus Here!</h1>
            <br></br>
            <button className='btn btn-success'>
          <a href='/menu/add' style={{textDecoration:'none',color:'white'}}>Add New menu</a></button>
          <br></br>
          <br></br>
          <div className="input-group flex-nowrap">
            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" id="myInput" className="form-control" onKeyUp={(search)} placeholder="Search for Vehicle Model.."/>  
            </div>
          <div className='search-wrapper'>    

          <br></br>
          <div></div>
          
          <table className="table" id="myTable">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>Menu</th>
                        <th>Menu No</th> 
                        <th>Menu Category</th>
                        <th>Price</th>
                        <th>Menu Description</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map((menu, index) => ( 
                        <tr key={menu._id}>
                            <td>{index + 1}</td>
                            <td>{menu.menu}</td> 
                            <td><center>{menu.menunumber}</center></td>
                            <td><center>{menu.menucat}</center></td>
                            <td><center>{menu.price}</center></td>
                            <td>{menu.description}</td>
                            <td>
                                <a className="btn btn-warning" href={'/menu/update/' + menu._id}>&nbsp;&nbsp;
                                    <i className="fa-solid fa-pen-to-square"></i>Edit&nbsp;&nbsp;</a>
                                 
                                &nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={() => onDelete(menu._id)}>&nbsp;&nbsp;
                                    <i className="fa-sharp fa-solid fa-trash"></i>Delete</button>

                                    

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={generatePDF} class="btn btn-primary btn-sm"><i class="fa fa-download"></i> Download PDF</button>
            </div>
            </div>
            </div>
            </div>
            </div>
    )
}