import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { search1 } from '../CommonJS/search.js';
import jsPDF from 'jspdf';
import "jspdf-autotable";

export default function ShowInvoice() {
  const [Invoice, setInvoice] = useState([]);

  useEffect(() => {
    const getInvoice = () => {
      axios.get("http://localhost:8000/api/Invoice/get/")
        .then((res) => {
          setInvoice(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getInvoice();
  }, []);

  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/api/Invoice/delete/${id}`)
      .then(() => {
        setInvoice(prevInvoice => prevInvoice.filter(Invoice => Invoice._id !== id));
        console.log('Reservation with id:', id, 'deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    doc.text("All Invoices", 10, 30);
    doc.text(new Date().toLocaleString(), 10, 40, { fontSize: 10 });
    // define table headers
    const headers = [
      ["#", "Name", "Invoice No", "Due Date", "Running Total", "Tax code", "Sub Total"]
    ];
    // iterate over Invoices and add them to the table
    // eslint-disable-next-line
    let runningTotal = 0;
    const data = Invoice.map((Invoice, index) => {
      runningTotal += Invoice.Running_Total;
      // eslint-disable-next-line
      const Sub_Total = Invoice.Running_Total + Invoice.Tax_code;
      return [
        index + 1,
        Invoice.Name,
        Invoice.Invoice_No,
        Invoice.Due_Date,
        Invoice.Running_Total,
        Invoice.Tax_code,
        Invoice.Sub_Total
      ];
    });
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
    doc.save("all_Invoices.pdf");
  };

  const handleStatusUpdate = async (id, Status) => {
    try {
      await axios.put(`http://localhost:8000/api/Invoice/update/${id}`, { Status });
      window.location.reload();
    } catch (error) {
      console.log(`Error updating order status: ${error.message}`);
    }
  };

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='m-2'>
            <h1>Invoice Details</h1><br /><br />
            <button className='btn btn-success'>
              <a href='/Invoice/add' style={{ textDecoration: 'none', color: 'white' }}>Create New Invoice</a>
            </button>
            <div>.</div>
            <div className="input-group flex-nowrap">
              <span className="input-group-text">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input type="text" id="myInput" className="form-control" onKeyUp={search1} placeholder="Search for Invoice_No.." />
            </div>
            <br />
            <table className="table" id='myTable'>
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Invoice No</th>
                  <th>Due Date</th>
                  <th>Running Total</th>
                  <th>Tax code</th>
                  <th>Sub Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Invoice.map((Invoice, index) => (
                  <tr key={Invoice._id}>
                    <td>{index + 1}</td>
                    <td>{Invoice.Name}</td>
                    <td>{Invoice.Invoice_No}</td>
                    <td>{Invoice.Due_Date}</td>
                    <td>{Invoice.Running_Total}</td>
                    <td>{Invoice.Tax_code}</td>
                    <td>{Invoice.Sub_Total}</td>
                    <td>{Invoice.Status}</td>
                    <td>
                      <div className="d-flex">
                        <a className="btn btn-warning me-1" href={'/Invoice/update/' + Invoice._id}>
                          <i className="fa-solid fa-pen-to-square"></i> Edit
                        </a>
                        <button className="btn btn-danger me-1" onClick={() => onDelete(Invoice._id)}>
                          <i className="fa-sharp fa-solid fa-trash"></i> Delete
                        </button>
                        <button className="btn btn-outline-success" onClick={() => handleStatusUpdate(Invoice._id, "Confirmed")}>
                          Confirm
                        </button>
                      </div>
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
  );
}
