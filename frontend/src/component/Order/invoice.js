import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import jsPDF from 'jspdf';


export default function Invoice() {
    const { id } = useParams();
    const [orderNumber, setorderNumber] = useState('');
    const [itemName, setitemName] = useState('');
    const [itemDescription, setitemDescription] = useState('');
    const [category, setcategory] = useState('');
    const [supplier, setsupplier] = useState('');
    const [supplierContacNo, setsupplierContacNo] = useState('');
    const [supplierAddress, setsupplierAddress] = useState('');
    const [supplierEmail, setsupplierEmail] = useState('');
    const [rate, setrate] = useState('');
    const [quantity, setquantity] = useState('');
    const [orderNote, setorderNote] = useState('');
    const [orderStatus, setorderStatus] = useState('');
    const [createAt, setcreateAt] = useState('');


    //send Mail 
    function sendEmail() {
        const invoiceHtml = generateInvoiceHtml()

        const emailPayload = {
            to: supplierEmail,
            subject: `Invoice for Order #${orderNumber}`,
            html: invoiceHtml,
        };

        axios.post('http://localhost:8000/api/send-email', emailPayload)
            .then(response => {
                console.log('Email sent successfully:', response);
                swal("Email Send Successfully ", " ", "success")
            })
            .catch(error => {
                console.error('Failed to send email:', error);
            });
    };
    //create Mail Body
    function generateInvoiceHtml() {

        const html = `
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px;">
        <div style="border-style: solid;padding:35px">
            <h1 style="font-size: 24px; margin-bottom: 20px;">Invoice >> ID:#${orderNumber}</h1>
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="margin: 0;"><strong>Hotel Gayana</strong></h2>
                <p style="margin: 0;">Address: 44, Vijaya Road, Tangalle 82200 Sri Lanka</p>
                <p style="margin: 0;">Phone: 077 180 8056</p>
                <p style="margin: 0;">Email: gayana.gh@gmail.com</p>
                <hr>
            </div>
            <div style="margin-bottom: 60px;">
                <div style="float: right; margin-bottom: 20px;">
                    <ul>
                        <li>
                            <p style="margin: 0;"><strong>Order Number : </strong>#${orderNumber}</p>
                        </li>
                        <li>
                            <p style="margin: 0;"><strong>Create Date : </strong> ${createAt}</p>
                        </li>
                        <li>
                            <p style="margin: 0;"><strong>Status : </strong><span style="color:green"> ${orderStatus}</span</p>
                        </li>
                    </ul>
                </div>
                <div style="margin-bottom: 20px;">
                    <p style="margin: 0;"><strong>Supplier Information:</strong></p>
                    <p style="margin: 0;">Supplier Name: ${supplier}</p>
                    <p style="margin: 0;">${supplierAddress}</p>
                    <p style="margin: 0;">Contact No: ${supplierContacNo}</p>
                    <p style="margin: 0;">Email: ${supplierEmail}</p>
                </div>
            </div>
            <hr>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Item :</th>
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">${itemName}</th>
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Per Item Cost :</th>
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">${rate}</th>
                </tr>
                <tr>
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Category :</th>
                    <td style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">${category}</td>
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Quantity :</th>
                    <td style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">${quantity}</td>
                </tr>
    
            </table>
            <div style="margin-bottom: 20px;">
                <p style="margin: 0;"><strong>Item Description:</strong>${itemDescription}</p>
            </div>
            <hr>
            <div style="margin-bottom: 60px;">
                <div style="float: right; margin-bottom: 20px;">
                    <table>
                        <tr>
                            <td>SubTotal</td>
                            <td>Rs.${rate * quantity}</td>
                        </tr>
                        <tr>
                            <td>Others</td>
                            <td>--</td>
                        </tr>
                        <tr>
                            <td>Total Amount</td>
                            <td><strong>
                                    <h3>Rs.${rate * quantity}</h3>
                                </strong></td>
                        </tr>
                    </table>
    
                </div>
                <div>
                    <p style="margin: 0;">Order Note : ${orderNote}</p>
                </div>
            </div>
              <br/>
            <p>Disclaimer : This is a system generated Invoice. For any queries please contact the IT support.</p>
            <div>
    </body>
    `;

        return html;
    }



    //Get invoice data by id
    useEffect(() => {
        const getInvoice = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/order/get/${id}`);
                const order = response.data
                setorderNumber(order.orderNumber)
                setitemName(order.itemName)
                setitemDescription(order.itemDescription)
                setcategory(order.category)
                setsupplier(order.supplier)
                setsupplierAddress(order.supplierAddress)
                setsupplierContacNo(order.supplierContacNo)
                setsupplierEmail(order.supplierEmail)
                setrate(order.rate)
                setquantity(order.quantity)
                setorderNote(order.orderNote)
                setorderStatus(order.orderStatus)
                setcreateAt(order.createdAt)

            } catch (error) {
                console.log(error);
            }
        };

        getInvoice();
    }, [id]);

    // download invoice
    function download() {
        const invoice = document.getElementById('invoice');
        html2canvas(invoice, { scale: 2 }).then(canvas => {
            const pdf = new jsPDF('p', 'mm', 'a4', true, 'portrait');
            const imgData = canvas.toDataURL('image/jpeg');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const marginLeft = 28.35;
            const marginTop = 28.35;
            pdf.setLineWidth(1);
            pdf.rect(marginLeft, marginTop, imgWidth - (2 * marginLeft), imgHeight - (2 * marginTop), 'D');
            pdf.addImage(imgData, 'JPEG', marginLeft, marginTop, imgWidth - (2 * marginLeft), imgHeight - (2 * marginTop));
            const pageCount = pdf.internal.getNumberOfPages();
            for (let i = 0; i < pageCount; i++) {
                pdf.setPage(i + 1);
                pdf.setFontSize(10);
                pdf.setTextColor(128);
                pdf.text(`Page ${i + 1} of ${pageCount}`, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 10);
            }

            pdf.save("orderID #" + orderNumber + ' invoice.pdf');
        });
    }


    return (
        <div className='container dashboard'>
            <div className='dashboard-app'>
                <div className='dashboard-content'>
                    <div className="container-fluid print-container" style={{ width: "21cm", height: "29.7cm" }}>
                        <div className="mt-5">
                            <br />
                            <button onClick={download} className="btn btn-secondary m-1">Download Invoice</button>
                            <button onClick={sendEmail} className="btn btn-secondary">Send Email</button>
                            <br />
                            <br />
                        </div>
                        <div id="invoice">
                            <div className="card">
                                <div className="card-body">
                                    <div className="container mb-5 mt-3">
                                        <div className="row d-flex align-items-baseline">
                                            <div className="col-xl-9">
                                                <p style={{ color: '#7e8d9f', fontSize: '20px' }}>Invoice &gt;&gt; <strong>ID: #{orderNumber}</strong></p>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div className="col-md-12">
                                                <div className="text-center">
                                                    <h2 className="pt-2 fw-bold">Hotel Gayana</h2>
                                                    <p>Address : 44, Vijaya Road, Tangalle 82200 Sri Lanka<br />
                                                        <i className="fas fa-phone"></i> 077 180 8056 <br />
                                                        <i className="fa-solid fa-envelope"></i> gayana.gh@gmail.com

                                                    </p>
                                                    <hr />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-7">
                                                    <ul className="list-unstyled">
                                                        <li className="text-muted small">To: <span style={{ color: "#8f8061" }}>{supplier}</span></li>
                                                        <li className="text-muted small">{supplierAddress.split(',').map((line, index) => (
                                                            <React.Fragment key={index}>
                                                                {line}
                                                                {index !== supplierAddress.split(',').length - 1 && <br />}
                                                            </React.Fragment>
                                                        ))}</li>
                                                        <li className="text-muted small"><i className="fas fa-phone"></i> {supplierContacNo}</li>
                                                        <li className="text-muted small"><i className="fa-solid fa-envelope"></i> {supplierEmail}</li>
                                                    </ul>
                                                </div>
                                                <div className="col-xl-5">
                                                    <p className="text-muted fw-bold">Invoice</p>
                                                    <ul className="list-unstyled">
                                                        <li className="text-muted"><i className="fas fa-circle" style={{ color: "#8f8061" }}></i> <span
                                                            className="fw-bold">Order Number : </span>#{orderNumber}</li>
                                                        <li className="text-muted"><i className="fas fa-circle" style={{ color: "#8f8061" }}></i> <span
                                                            className="fw-bold">Creation Date : </span>{createAt}</li>
                                                        <li className="text-muted"><i className="fas fa-circle" style={{ color: "#8f8061" }}></i> <span
                                                            className="me-1 fw-bold">Status:</span><span className="badge bg-warning text-black fw-bold">
                                                                {orderStatus}</span></li>
                                                    </ul>
                                                </div>
                                                <hr />
                                            </div>
                                            <div className="row my-2 mx-1 justify-content-center">
                                                <div className="col-md-3 mb-4 mb-md-0">
                                                    <p className="mb-1">
                                                        <span className="fw-bold">Item Name : </span><br />
                                                        <span className="fw-bold">Category &nbsp;&nbsp;&nbsp;: </span>
                                                    </p>
                                                </div>
                                                <div className="col-md-4 mb-1 mb-md-0">
                                                    <p className="mb-1 me-2">{itemName}</p>
                                                    <p className="mb-1 me-2"> {category}</p>
                                                </div>
                                                <div className="col-md-5 mb-4 mb-md-0">
                                                    <p className="mb-1">
                                                        <span className="fw-bold ">Per Item Cost : </span><span className="mb-1 me-2">Rs. {rate}</span>
                                                    </p>
                                                    <p className="mb-1">
                                                        <span className="fw-bold ">Total Quantity : </span><span className="mb-1 me-2">{quantity}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <span className=" me-2">Item Description : {itemDescription} </span>
                                            <hr />
                                            <div className="row">
                                                <div className="col-xl-7">
                                                    <span className="fw-bold ">Order Note : </span><span className="mb-1 me-2">{orderNote}</span>
                                                </div>
                                                <div className="col-xl-5">
                                                    <ul className="list-unstyled">
                                                        <li className="text-muted ms-3"><span className="text-black me-4">SubTotal</span>Rs. {rate * quantity}</li>
                                                        <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Others</span> &nbsp;&nbsp;&nbsp;--</li>
                                                    </ul>
                                                    <p className="text-black float-start"><span className="text-black me-3 fw-bold"> Total Amount</span><span
                                                        style={{ fontSize: '25px' }}>Rs. {rate * quantity}</span></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <p className="small">Disclaimer: This is a system generated Invoice. For any queries, please contact the IT support.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

