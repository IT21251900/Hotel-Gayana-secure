import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './showtable.css';


export default function ShowOrders() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  //download pdf
  const downloadPDF = () => {
    const table = document.getElementById('filteredTable');
    const pdf = new jsPDF('p', 'pt', 'letter');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const marginTop = 72;
    const marginBottom = 72;
    const contentWidth = pageWidth - 2 * marginTop;
    const contentHeight = pageHeight - marginTop - marginBottom;
    html2canvas(table, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      pdf.text(`Filtered Orders - Order Status : ${filterStatus}`, marginTop, marginTop - 20);
      pdf.setLineWidth(1);
      pdf.rect(marginTop, marginTop, contentWidth, contentHeight, 'D');
      pdf.addImage(imgData, 'PNG', marginTop, marginTop, imgWidth, imgHeight);
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 0; i < pageCount; i++) {
        pdf.setPage(i + 1);
        pdf.setFontSize(10);
        pdf.setTextColor(128);
        pdf.text(`Page ${i + 1} of ${pageCount}`, pageWidth - 80, pageHeight - marginBottom + 20);
      }

      pdf.save('filtered_orders.pdf');
    });
  };


  //get order details 
  useEffect(() => {
    const getOrders = () => {
      axios
        .get('http://localhost:8000/api/order/get')
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getOrders();
  }, []);



  //update order status
  const handleStatusUpdate = async (id, orderStatus, supplierEmail) => {
    try {
      await axios.put(`http://localhost:8000/api/order/update/${id}`, { orderStatus })
      const response = await axios.get('http://localhost:8000/api/order/get');
      const data = await response.data;
      setOrders(data);


    } catch (error) {
      console.log(`Error updating order status: ${error.message}`);
    }
  };
  const handleRowToggle = (e) => {
    e.target.parentElement.nextSibling.classList.toggle('show');
  };

  const orderStatusOptions = [
    'All',
    'Pending Approval',
    'Quality Checking',
    'Admin Approved',
    'Admin Rejected',
    'Order Rejected',
    'Canceled Order',
    'Order Completed'
  ];

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredOrders = filterStatus === 'All'
    ? orders
    : orders.filter((order) => order.orderStatus === filterStatus);

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='mt-5'>
            <h1>Orders</h1>
            <button className='btn btn-success m-1'>
              <a href='/orders/add' style={{ textDecoration: 'none', color: 'white' }}>Create A New Order</a></button>
            <button className='btn btn-warning m-1'>
              <a href='/orders/qualitycontrol' style={{ textDecoration: 'none', color: 'white' }}>Quality Control</a></button>
            <button type="button" className="btn  btn-dark m-1" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Pending Approval</button>
            <br />
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Pending Order Approval</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body" style={{ overflowY: 'scroll', width: '800px', height: '500px' }}>
                    {orders.filter(order => order.orderStatus === 'Pending Approval').map((order) => (
                      <div className="card m-1 rounded">
                        <div className="card-body">
                          <h5 className="card-title bg-warning-subtle text-emphasis-warning rounded">
                            <b>Order No : #{order.orderNumber}&nbsp;&nbsp;&nbsp;Item : {order.itemName}</b>
                          </h5>
                          <p className="card-text">Supplier : {order.supplier} <br />Order Quantity : {order.quantity}
                            <br />Per Item Price : {order.rate} <br />Total Amount : {order.rate * order.quantity} </p>
                          <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                            <button className="btn btn-outline-success" onClick={() => handleStatusUpdate(order._id, 'Admin Approved')}>Approved</button>
                            <button className="btn btn-outline-danger" onClick={() => handleStatusUpdate(order._id, 'Admin Rejected')}> Rejected</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closebutton">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <label htmlFor="filterStatus" className="form-label">Filter by Order:</label>
                <select id="filterStatus" className={`form-select`} value={filterStatus} onChange={handleFilterChange}>
                  {orderStatusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <button onClick={downloadPDF} className='btn btn-secondary mt-4'>Download PDF</button>
              </div>
            </div>

            <br /><br />
            <table className='table' style={{ borderCollapse: 'collapse' }} id="filteredTable">
              <thead className="table-light">
                <tr>
                  <th>Order No</th>
                  <th>Item Name</th>
                  <th>Supplier Name</th>
                  <th>Quantity</th>
                  <th>Total Cost</th>
                  <th>Order Status</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <React.Fragment>
                    <tr onClick={handleRowToggle} className='accordion-toggle' key={index._id}>
                      <td>#{order.orderNumber}</td>
                      <td>{order.itemName}</td>
                      <td>{order.supplier}</td>
                      <td>{order.quantity}</td>
                      <td>{order.rate * order.quantity}</td>
                      <td>{order.orderStatus}</td>
                      <td><a className="text-decoration-none btn btn-secondary" href={'/orders/invoice/' + order._id}>
                        <i className="fa-solid fa-eye"></i></a></td>

                    </tr>
                    <tr className='collapse hiddenRow bg-white'>
                      <td colSpan='2' className="fs-6">
                        <div className='accordian-body'><b>Rate : </b>{order.rate}<br />
                          <b>Category :</b> {order.category}</div>
                      </td>
                      <td colSpan='3' className="fs-6">
                        <div >
                          <b>Order Note :</b> {order.orderNote}</div>
                        <div >
                          <b>Create Time & Date :</b> {order.createdAt}</div>


                      </td>
                      <td colSpan='2'>
                        <div>
                          <button type="button" className="btn btn-info" disabled={order.orderStatus === "Order Completed" || order.orderStatus === "Canceled Order" || order.orderStatus === "Admin Rejected" || order.orderStatus === "Order Rejected" || order.orderStatus === "Pending Approval" || order.orderStatus === "Quality Checking"} onClick={() => handleStatusUpdate(order._id, 'Send to Invoice')}>
                            <i className="fa-solid fa-paper-plane"></i>
                          </button>
                          &nbsp;
                          <button type="button" className="btn btn-success" disabled={order.orderStatus === "Order Completed" || order.orderStatus === "Canceled Order" || order.orderStatus === "Admin Rejected" || order.orderStatus === "Order Rejected" || order.orderStatus === "Pending Approval" || order.orderStatus === "Quality Checking" || order.orderStatus === "Admin Approved"} onClick={() => handleStatusUpdate(order._id, 'Receiving Order')}>
                            <i className="fa-solid fa-truck"></i>
                          </button>
                          &nbsp;
                          <button type="button" className="btn btn-warning" disabled={order.orderStatus === "Order Completed" || order.orderStatus === "Canceled Order" || order.orderStatus === "Admin Rejected" || order.orderStatus === "Order Rejected" || order.orderStatus === "Pending Approval" || order.orderStatus === "Quality Checking" || order.orderStatus === "Admin Approved"} onClick={() => handleStatusUpdate(order._id, 'Quality Checking')}>
                            <i className="fa-solid fa-user-check"></i>
                          </button>
                          &nbsp;
                          <button type="button" className="btn btn-danger" disabled={order.orderStatus === "Order Completed" || order.orderStatus === "Canceled Order" || order.orderStatus === "Admin Rejected" || order.orderStatus === "Order Rejected"} onClick={() => handleStatusUpdate(order._id, 'Canceled Order')}>
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      </td>


                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
