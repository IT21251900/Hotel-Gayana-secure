import { useState, useEffect, useRef } from 'react'
import React from 'react';
import axios from 'axios'
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatDistanceToNow, format } from 'date-fns'
import './item.css'
import { search } from '../CommonJS/search.js'
import QrReader from "modern-react-qr-reader";




export default function ShowItem() {
    const [items, setItems] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [supplier, setsupplier] = useState('')
    const [supplierAddress, setsupplierAddress] = useState('')
    const [supplierEmail, setsupplierEmail] = useState('')
    const [errors, setErrors] = useState({});
    const [supplierContacNo, setsupplierContacNo] = useState('')
    const [successAlert, setSuccessAlert] = useState(false);
    const [webcamResult, setWebcamResult] = useState('');
    const [itemName, setItemName] = useState('');
    const [qrValid, setQrValid] = useState('');
    const [quantitiy, setitemQuantity] = useState('')
    const [showQrReader, setShowQrReader] = useState(false);
    const [releasedQuantitiy, setreleasedQuantitiy] = useState('')
    const [id, setItemId] = useState('')
    const formRef = useRef(null);



    //supplier add data validate
    function validateForm() {
        let formIsValid = true;
        let errors = {};

        setErrors({})

        if (!supplier) {
            formIsValid = false;
            errors["supplier"] = "Please enter Supplier Name";

        }

        if (!supplierAddress) {
            formIsValid = false;
            errors["supplierAddress"] = "Please enter  Address";
        }

        if (!supplierContacNo) {
            formIsValid = false;
            errors["supplierContacNo"] = "Please enter Contact Number";
        }
        if (!supplierEmail) {
            formIsValid = false;
            errors["supplierEmail"] = "Please enter valid Email";
        }

        setErrors(errors);
        return formIsValid;
    }


    //get all item data function using userEffect
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/item/get")
            .then((res) => {
                setItems(res.data);
                const matchedItem = res.data.find((item) => item.itemName === webcamResult);
                if (matchedItem) {
                    setItemId(matchedItem._id);
                    console.log(matchedItem._id)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [webcamResult]);

    //hadle Qr code 
    const handleStockReleaseButtonClick = () => {
        setShowQrReader(true);
    };
    const handleCloseButtonClick = () => {
        setShowQrReader(false);
        setitemQuantity(0);
        axios
            .get("http://localhost:8000/api/item/get")
            .then((res) => {

                setItems(res.data);
                const matchedItem = res.data.find((item) => item.itemName === webcamResult);
                if (matchedItem) {
                    setItemId(matchedItem._id);
                    console.log(matchedItem._id)
                }
            })

            .catch((err) => {
                console.log(err);
            });

    };

    //get all supplier data function using userEffect
    const fetchSuppliers = () => {
        fetch("http://localhost:8000/api/supplier/get")
            .then((response) => response.json())
            .then((data) => setSuppliers(data));
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    //add supplier function
    function addsupplier(e) {
        e.preventDefault()
        if (validateForm()) {
            const newSupplier = {
                supplier,
                supplierAddress,
                supplierContacNo,
                supplierEmail
            }
            axios
                .post("http://localhost:8000/api/supplier/save", newSupplier)
                .then(() => {
                    setSuccessAlert(true);
                    setTimeout(() => {
                        setSuccessAlert(false);
                        const form = document.querySelector('#dd-supplier-form');
                        if (form) {
                            form.reset();
                        }
                        const closeButton = document.querySelector('#closebutton');
                        if (closeButton) {
                            closeButton.click();
                        }
                    }, 2000);
                    const form = document.querySelector('#addSupplierForm');
                    if (form) {
                        form.reset();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    //delete item function
    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/item/delete/${id}`)
            .then(() => {
                setItems(prevItems => prevItems.filter(item => item._id !== id))
                console.log('Item with id', id, 'deleted')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //delete Supplier
    const onDeleteSupplier = (id) => {
        axios.delete(`http://localhost:8000/api/supplier/delete/${id}`)
            .then(() => {
                console.log(id)
                setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier._id !== id))
                console.log('Supplier with id', id, 'deleted')
            })
            .catch((err) => {
                console.log(id)
                console.log(err)
            })
    }

    //Qr Scaner
    const handleScan = (result) => {
        if (result) {
            setWebcamResult(result);
            const matchedItem = items.find((item) => item.itemName === result);
            if (matchedItem) {
                setItemName(matchedItem.itemName);
                setitemQuantity(matchedItem.quantitiy);
                setQrValid(true);
            } else {
                setQrValid(false);
            }
        }
    }
    const handleError = (error) => {
        console.log(error);
    }
    // eslint-disable-next-line
    const handleItemChange = (e) => {
        const selectedItem = items.find((item) => item.itemName === e.target.value);
        setitemQuantity(selectedItem.quantitiy);
    };

    //quick update stock
    function updateData(e, id) {
        e.preventDefault();
        const updateQuantity = {
            quantitiy: quantitiy - releasedQuantitiy
        };
        axios
            .put(`http://localhost:8000/api/item/updatequick/${id}`, updateQuantity)
            .then(() => {
                formRef.current.reset();
                setSuccessAlert(true)
                setTimeout(() => {
                    setSuccessAlert(false);
                }, 2000);

            })
            .catch((err) => {
                console.log(err)
            })
    }


    //genarate & downlord qrcode
    function onqr(itemName) {
        const timestamp = new Date().getTime();
        const fileName = `${itemName}-qr-code-${timestamp}.png`;

        QRCode.toCanvas(itemName, { width: 400, height: 400 }, function (error, canvas) {
            if (error) throw error;

            const ctx = canvas.getContext('2d');
            ctx.font = '24px sans-serif';
            ctx.fillText("ITEM NAME : " + itemName, 10, canvas.height - 10);


            const link = document.createElement('a');
            link.download = fileName;
            link.href = canvas.toDataURL();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }



    //genrate report for low stock and out of stock
    function downloadPDF() {
        const filteredItems = items.filter(item => item.quantitiy < 10);
        const columns = ['Item Name', 'Category', 'Quantity', 'Price', 'Supplier', 'Updated At'];
        const rows = filteredItems.map(item => [
            item.itemName,
            item.category,
            item.quantitiy,
            item.price,
            item.supplier,
            format(new Date(item.updatedAt), 'MM/dd/yyyy hh:mm:ss a')
        ]);
        const pdf = new jsPDF();
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(18);
        pdf.text('Low Stock and Out of Stock Report', 15, 20);
        pdf.setFontSize(12);
        pdf.autoTable({ head: [columns], body: rows, startY: 30 });

        const pageCount = pdf.internal.getNumberOfPages();
        pdf.setFontSize(10);
        for (let i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.text(`Disclaimer: This is a system generated report. For any queries, please contact the IT support.`, pdf.internal.pageSize.getWidth() - 200, pdf.internal.pageSize.getHeight() - 30)
            pdf.text(`Page ${i} of ${pageCount}`, pdf.internal.pageSize.getWidth() - 40, pdf.internal.pageSize.getHeight() - 10);
        }
        pdf.setPage(1);
        pdf.save('low-stock-report.pdf');
    }



    return (
        <div className='container dashboard'>
            <div className='dashboard-app'>
                <div className='dashboard-content'>
                    <div className='mt-5'>
                        <h1>All Items</h1>
                        <br />
                        <br />
                        <div>
                            <button className='btn btn-success m-1'>
                                <a href='/item/add' style={{ textDecoration: 'none', color: 'white' }}>Add New Stock Item</a></button>
                            &nbsp;&nbsp;&nbsp;
                            <button type="button" className="btn btn-success m-1" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Add Supplier</button>
                            &nbsp;&nbsp;&nbsp;
                            <button type="button" className="btn btn-info m-1" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@getbootstrap" onClick={fetchSuppliers}>Show Supplier List</button>
                            <button className="btn btn-primary m-1" onClick={downloadPDF}>
                                <i className="fa fa-download"></i> Low Stock Report Download
                            </button>
                        </div>
                        <br />
                        <div >
                            <button type="button" className="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@getbootstrap" onClick={handleStockReleaseButtonClick}>Stock Release</button>
                        </div>
                        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Stock Release</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form ref={formRef}>
                                            <div className="mb-3">
                                                <label className="form-label">Select Category Or Scan Qr Code</label>
                                                <div className="card col-sm-4 m-2 mx-auto">
                                                    <div className="card-body text-center">
                                                        {showQrReader && (
                                                            <QrReader
                                                                delay={300}
                                                                onError={handleError}
                                                                onScan={handleScan}
                                                                legacyMode={false}
                                                                facingMode={"user"} />
                                                        )}
                                                    </div>
                                                </div>
                                                <select
                                                    className="form-select"
                                                    value={itemName}
                                                    onChange={(e) => {
                                                        setItemName(e.target.value)
                                                        const selectedItem = items.find((item) => item.itemName === e.target.value);
                                                        if (selectedItem) {
                                                            setitemQuantity(selectedItem.quantitiy);
                                                            setItemId(selectedItem._id);
                                                        }
                                                    }}>
                                                    <option value="" disabled={!qrValid} onChange={(e) => !qrValid(e.target.value)}>
                                                        {!qrValid ? "Choose..." : "Because QR code is not valid, the value will be set to the Defult valid value."}
                                                    </option>
                                                    {items.map((item) => (
                                                        <option key={item._id} value={item.itemName}>{item.itemName}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="message-text" className="col-form-label">
                                                    Stock Now
                                                </label>
                                                <input className="form-control" type="number" value={quantitiy}
                                                    onChange={(e) => {
                                                        setitemQuantity(e.target.value);
                                                    }} readOnly />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="message-text" className="col-form-label" >
                                                    How many Stock are release?
                                                </label>
                                                <input className="form-control" type="number" onChange={(e) => { setreleasedQuantitiy(e.target.value) }} />
                                            </div>
                                            <div>
                                                {successAlert && (
                                                    <div className="alert alert-success" role="alert">
                                                        Supplier added successfully!
                                                    </div>
                                                )}
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    data-bs-dismiss="modal"
                                                    onClick={handleCloseButtonClick}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-warning"
                                                    onClick={(e) => updateData(e, id)}>
                                                    Update Stock
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Supplier</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseButtonClick}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={addsupplier} id='dd-supplier-form'>
                                            <div className="mb-3">
                                                <label className="form-label">Supplier Name</label>
                                                <input type="text"
                                                    className={`form-control ${errors.supplier ? 'is-invalid' : ''}`}
                                                    placeholder='Enter Supplier Name'
                                                    name='Supplier'
                                                    onChange={(e) => {
                                                        setsupplier(e.target.value);
                                                    }} />
                                                {errors.supplier && (<div className="invalid-feedback">{errors.supplier}</div>)}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Supplier Address</label>
                                                <textarea
                                                    className={`form-control ${errors.supplierAddress ? 'is-invalid' : ''}`}
                                                    rows="3"
                                                    placeholder='Enter Supplier Address'
                                                    name='Address'
                                                    onChange={(e) => {
                                                        setsupplierAddress(e.target.value);
                                                    }}>
                                                </textarea>
                                                {errors.supplierAddress && (<div className="invalid-feedback">{errors.supplierAddress}</div>)}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Supplier Contact No</label>
                                                <input type="text"
                                                    maxlength="10"
                                                    minlength="10"
                                                    className={`form-control ${errors.supplierContacNo ? 'is-invalid' : ''}`}
                                                    placeholder='Enter Supplier Contact No'
                                                    name='contactNo'
                                                    onChange={(e) => {
                                                        setsupplierContacNo(e.target.value);
                                                    }} />
                                                {errors.supplierContacNo && (<div className="invalid-feedback">{errors.supplierContacNo}</div>)}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Supplier Email </label>
                                                <input type="email"
                                                    className={`form-control ${errors.supplierEmail ? 'is-invalid' : ''}`}
                                                    placeholder='Enter Supplier Email'
                                                    name='Email'
                                                    onChange={(e) => {
                                                        setsupplierEmail(e.target.value);
                                                    }} />
                                                {errors.supplierEmail && (<div className="invalid-feedback">{errors.supplierEmail}</div>)}
                                            </div>
                                            <div>
                                                {successAlert && (
                                                    <div className="alert alert-success" role="alert">
                                                        Supplier added successfully!
                                                    </div>
                                                )}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id='closebutton'>Close</button>
                                                <button type="submit" className="btn btn-success" >Add Supplier</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Supplier List</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body" style={{ overflowY: 'scroll', width: '800px', height: '500px' }}>
                                        {suppliers.map((supplier, index) => (
                                            <div className="card m-1 rounded" key={index}>
                                                <div className="card-body">
                                                    <h5 className="card-title bg-warning-subtle text-emphasis-warning rounded">
                                                        <b>{supplier.supplier}</b>
                                                    </h5>
                                                    <h6 className="card-subtitle mb-2 text-body-secondary">Contact No : {supplier.supplierContacNo}</h6>
                                                    <p className="card-text">Address : {supplier.supplierAddress}</p>
                                                    <p className="card-text">Email : {supplier.supplierEmail}</p>
                                                    <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                                                        <button className="btn btn-outline-danger" style={{ border: 'none' }} onClick={() => onDeleteSupplier(supplier._id)}> <i className="fa fa-trash-o"></i></button>
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
                        <br />

                        <div className="input-group flex-nowrap">
                            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" id="myInput" className="form-control" onKeyUp={(search)} placeholder="Search for Stock.." />
                        </div>
                        <br />
                        <table id="myTable" className='table'>
                            <thead className="table-light">
                                <tr>
                                    <th>Index</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Supplier</th>
                                    <th>Action</th>
                                    <th>Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={8}>
                                        <h4 className='mb-3 text-center m-1'><b>Low Stock & Out of Stock</b></h4>
                                    </td>
                                </tr>

                                {items.filter(item => item.quantitiy < 10)
                                    .map((item, index) => (
                                        <tr key={item._id} className='bg-dark text-white'>
                                            <td>{index + 1}</td>
                                            <td>{item.itemName}</td>
                                            <td>{item.category}</td>
                                            <td className={item.quantitiy === 0 ? 'out-of-stock ' : 'text-warning bg-dark'}>
                                                {item.quantitiy === 0 ? 'Out of stock' : 'Low Stock'}
                                            </td>
                                            <td>{item.price}</td>
                                            <td>{item.supplier}</td>
                                            <td>
                                                <a className="btn btn-warning text-decoration-none m-1" href={'/item/update/' + item._id}>&nbsp;&nbsp;
                                                    <i className="fa-solid fa-pen-to-square"></i>&nbsp;&nbsp;Edit&nbsp;&nbsp;</a>
                                                &nbsp;&nbsp;
                                                <button className="btn btn-danger m-1" onClick={() => onDelete(item._id)}>&nbsp;&nbsp;
                                                    <i className="fa-sharp fa-solid fa-trash"></i> Delete
                                                </button>
                                                &nbsp;&nbsp;
                                                <button className="btn btn-secondary m-1" onClick={() => onqr(item.itemName)}>
                                                    <i className="fa fa-qrcode"></i>
                                                </button>

                                            </td>
                                            <td>{formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}</td>
                                        </tr>
                                    ))}
                                <tr>
                                    <td colSpan={8}>
                                        <hr className='border border-danger border-2 opacity-50' />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={8}>
                                        <h4 className='mb-3 text-center'><b>Normal Stock</b></h4>
                                    </td>
                                </tr>

                                {items.filter(item => item.quantitiy >= 10)
                                    .map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.itemName}</td>
                                            <td>{item.category}</td>
                                            <td className={item.quantitiy === 0 ? 'out-of-stock' : ''}>
                                                {item.quantitiy === 0 ? 'Out of stock' : item.quantitiy}
                                            </td>
                                            <td>{item.price}</td>
                                            <td>{item.supplier}</td>
                                            <td>
                                                <a className="text-decoration-none btn btn-warning m-1" href={'/item/update/' + item._id}>&nbsp;&nbsp;
                                                    <i className="fa-solid fa-pen-to-square"></i>&nbsp;&nbsp;Edit&nbsp;&nbsp;</a>
                                                <button className="btn btn-danger  m-1" onClick={() => onDelete(item._id)}>&nbsp;&nbsp;
                                                    <i className="fa-sharp fa-solid fa-trash"></i>Delete
                                                </button>
                                                <button className="btn btn-secondary m-1" onClick={() => onqr(item.itemName)}>
                                                    <i className="fa fa-qrcode"></i>
                                                </button>
                                            </td>
                                            <td>{formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <div
                            style={{
                                margin: 'auto',
                                width: '400px'
                            }}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
