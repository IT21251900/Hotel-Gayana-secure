import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {search}from '../CommonJS/Feedback_search.js'
import jsPDF from 'jspdf';
import "jspdf-autotable";

export default function ShowSupport() {
    const [support, setSupport] = useState([])

    useEffect(() => {
      const getSupport = () => {
          axios.get("http://localhost:8000/api/support/get/")
              .then((res) => {
                  setSupport(res.data)
              })
              .catch((err) => {
                  console.log(err)
              })
      }
      getSupport()
  }, [])


    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/support/delete/${id}`)
            .then(() => {
                setSupport(prevCategories=> prevCategories.filter(support => support._id !== id));
                console.log('support with id:', id, 'deleted');
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
        doc.text("Support Ticket Details", 10, 30);
        doc.text( new Date().toLocaleString(), 10, 40, {fontSize: 10});
        // define table headers
        const headers = [["#", "Name", "NIC","email","category","subject","description"]];
        // define column widths as percentages
        //const columnWidths = ["1%", "1%", "10%","8%", "20%", "8%", "20%", "20%", "12%"];
        // iterate over Rooms and add them to the table
        const data = support.map((support, index) => 
            [index + 1, 
                support.customerName, 
                support.NIC,
                support.email,
                support.category,
                support.subject,
                support.description]);
        // add the table to the document
        doc.autoTable({
          head: headers,
          body: data,
          startY: 50,
          //columnWidth: columnWidths,
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
        doc.save("support_ticket_details.pdf");
      }
      

    return (
        <div className='container dashboard'>
         <div className='dashboard-app'>
          <div className='dashboard-content'>
          <br></br>

           <div className='m-2'>
            <h1>Support Ticket Details</h1>
            <br></br>
            <button className='btn btn-success'>
            <a href='/support/add' style={{textDecoration:'none',color:'white'}}>Submit a Support Ticket</a></button>

            <br></br>
            <br></br>

            <div className="input-group flex-nowrap">
              <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" id="myInput" className="form-control" onKeyUp={(search)} placeholder="Search for Customer NIC.."/>  
            </div>
          
            <div className='search-wrapper'>    
            <br></br>
          
             <table className="table" id="myTable" >
                <thead >
                    <tr>
                        <th style={{ borderBottom: '1px solid black'}}><center>#</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Name</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>NIC</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Email</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Category</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Subject</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Description</center></th>
                    </tr>
                </thead>
                <tbody>
                    {support.map((support, index) => ( 
                        <tr key={support._id}>
                            <td>{index + 1}</td>
                            <td><center>{support.customerName}</center></td>
                            <td><center>{support.NIC}</center></td>
                            <td><center>{support.email}</center></td>
                            <td><center>{support.category}</center></td>
                            <td><center>{support.subject}</center></td>
                            <td><center>{support.description}</center></td>
                            
                            <td>     
                              <button style={{width: '100px', height: '38px'}}className="btn btn-danger" onClick={() => onDelete(support._id)}>&nbsp;&nbsp;
                                    <i className="fa-sharp fa-solid fa-trash"></i>Delete
                              </button>
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