import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

export default function QualityControl() {
  const [orders, setOrders] = useState([]);
  const [orderNote, setOrderNote] = useState('');
  
  //get order details
  const getOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/order/get');
      setOrders(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  //status update
  const handleStatusUpdate = async (id, orderStatus) => {
    try {
      const order = orders.find((order) => order._id === id);
      const itemName = order.itemName;
      const itemResponse = await axios.get(
        `http://localhost:8000/api/item/get?name=${itemName}`
      );
      const item = itemResponse.data.find(
        (item) => item.itemName === itemName
      );
      const itemId = item._id;
      const newQuantity = item.quantitiy + order.quantity;
      swal("Order Completed", " ", "success")
      await axios.put(`http://localhost:8000/api/item/update/${itemId}`, { quantitiy: newQuantity, });
      await axios.put(`http://localhost:8000/api/order/update/${id}`, { orderStatus });
      const response = await axios.get("http://localhost:8000/api/order/get");
      const data = response.data;


      setOrders(data);
    } catch (error) {
      console.log(`Error updating order status: ${error.message}`);
    }
  };

  const handleStatusUpdateReject = async (id, orderStatus, orderNote) => {
    try {
      await axios.put(`http://localhost:8000/api/order/update/${id}`, { orderStatus, orderNote })
      const response = await axios.get('http://localhost:8000/api/order/get');
      const data = response.data;
      setOrders(data);
    } catch (error) {
      console.log(`Error updating order status: ${error.message}`);
    }
  };


  return (
    <div className="container dashboard">
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="mt-5">
            <h1>Quality Control</h1>

            {orders
              .filter((order) => order.orderStatus === "Quality Checking")
              .map((order) => (
                <div className="card m-1 rounded" key={order._id}>
                  <div className="card-body">
                    <h5 className="card-title bg-warning-subtle text-emphasis-warning rounded">
                      <b>Order No : #{order.orderNumber}</b>
                    </h5>
                    <p className="card-text">
                      <span className="fw-bold">Item : {order.itemName}</span>
                      <br />
                      Supplier : {order.supplier} <br />
                      Item Category : {order.category}<br />
                      Item Quantity : {order.quantity}
                      <br />
                      Item Description : {order.itemDescription} <br />
                      <i className="fas fa-phone"></i> : {order.supplierContacNo}{" "}&nbsp; &nbsp; &nbsp;<i className="fa-solid fa-envelope"></i> : {order.supplierEmail}{" "}
                    </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleStatusUpdate(order._id, "Order Completed", order.quantity)}
                      >
                        Approved
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModal${order._id}`}
                      >
                        Rejected
                      </button>
                      <div
                        className="modal fade"
                        id={`exampleModal${order._id}`}
                        tabIndex="-1"
                        aria-labelledby={`exampleModalLabel${order._id}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id={`exampleModalLabel${order._id}`}>
                                Reject Reason
                              </h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <textarea
                                  className="form-control"
                                  rows="6"
                                  placeholder="Reject Reason"
                                  name="orderNote"
                                  value={orderNote}
                                  onChange={(e) => setOrderNote(e.target.value)}
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() =>
                                  handleStatusUpdateReject(order._id, "Order Rejected", orderNote)
                                }
                              >
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

}

