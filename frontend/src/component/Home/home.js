import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import './home.css'
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend)

export default function Home() {
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0)
  const [suppliersCount, setSuppliersCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [orderStatusCounts, setOrderStatusCounts] = useState(null);

  //barchart
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Stock Now",
        data: [],
        backgroundColor: "rgba(25, 90, 13, 0.5)",
      },
    ],
  });


  const options = {
    indexAxis: "x",
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Low Level Stocks",
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Item Name",
        },
        ticks: {
          beginAtZero: true,
        },
      },
      y: {
        title: {
          display: true,
          text: "Stock Now",
        },
      },
    },
  };

  //fetch low stock item data
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/item/get")
      .then((res) => {
        const filteredData = res.data.filter((item) => item.quantitiy <= 10);
        const labels = filteredData.map((item) => item.itemName);
        const data = filteredData.map((item) => item.quantitiy);
        setData({
          labels: labels,
          datasets: [
            {
              label: "Stock Now",
              data: data,
              backgroundColor: "rgba(25, 90, 13, 0.5)",
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //fetch card wight data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersPromise = axios.get('http://localhost:8000/api/order/get');
        const suppliersPromise = fetch('http://localhost:8000/api/supplier/get').then((response) =>
          response.json()
        );
        const categoriesPromise = axios.get('http://localhost:8000/api/category/get/');
        const itemsPromise = axios.get('http://localhost:8000/api/item/get');

        const [ordersRes, suppliersRes, categoriesRes, itemsRes] = await Promise.all([
          ordersPromise,
          suppliersPromise,
          categoriesPromise,
          itemsPromise,
        ]);

        const orders = ordersRes.data;
        const completedOrders = orders.filter((order) => order.orderStatus === 'Order Completed');
        const completedOrdersCount = completedOrders.length;
        setCompletedOrdersCount(completedOrdersCount);

        const suppliersCount = suppliersRes.length;
        setSuppliersCount(suppliersCount);

        const categoryCount = categoriesRes.data.length;
        setCategoryCount(categoryCount);

        const itemCount = itemsRes.data.length;
        setItemCount(itemCount);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //Doughnut Chart
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/order/get');
        const orders = response.data;

        const statusCounts = {
          'Order Completed': 0,
          'Order Rejected': 0,
          'Canceled Order': 0,
          'Admin Rejected': 0,
        };

        orders.forEach((order) => {
          const status = order.orderStatus;
          if (statusCounts.hasOwnProperty(status)) {
            statusCounts[status]++;
          }
        });

        setOrderStatusCounts(statusCounts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderData();
  }, []);

  const renderDonutChart = () => {
    if (!orderStatusCounts) {
      return null;
    }

    const data = {
      labels: Object.keys(orderStatusCounts),
      datasets: [
        {
          label: 'Order Status',
          data: Object.values(orderStatusCounts),
          backgroundColor: [
            '#36A2EB', // Order Completed color
            '#4BC0C0', // Order Rejected color
            '#FF6384', // Canceled Order color
            '#FFCE56', // Admin Rejected color
          ],
        },
      ],
    };

    const options = {
      plugins: {
        title: {
          display: true,
          text: "Orders Status",
          font: {
            weight: "bold",
          },
        },
      },
    };

    return <Doughnut data={data} options={options} />;
  };

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='m-5' style={{ overflowX: 'scroll' }}>
            <div className="main-content ">
              <div className="header bg-gradient-primary pb-2 pt-2 pt-md-3">
                <div className="cotainer-fluid">
                  <div className="header-body">
                    <div className="row">
                      <div className="col-xl-3 col-lg-6">
                        <div className="card card-stats mb-4 mb-xl-0 rounded-2">
                          <div className="card-body">
                            <div className="row">
                              <div className="col">
                                <h5 className="card-title text-uppercase text-muted mb-0">Completed<br /> Orders</h5>
                                <span className="h2 font-weight-bold mb-0">{completedOrdersCount}</span>
                              </div>
                              <div className="col-auto">
                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">

                                  <i className="fa-regular fa-circle-check"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6">
                        <div className="card card-stats mb-4 mb-xl-0 rounded-2">
                          <div className="card-body">
                            <div className="row">
                              <div className="col">
                                <h5 className="card-title text-uppercase text-muted mb-0">Total <br />Suppliers</h5>
                                <span className="h2 font-weight-bold mb-0">{suppliersCount}</span>
                              </div>
                              <div className="col-auto">
                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                  <i className="fa-solid fa-truck"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6">
                        <div className="card card-stats mb-4 mb-xl-0 rounded-2">
                          <div className="card-body">
                            <div className="row">
                              <div className="col">
                                <h5 className="card-title text-uppercase text-muted mb-0">Total <br />Categories</h5>
                                <span className="h2 font-weight-bold mb-0">{categoryCount}</span>
                              </div>
                              <div className="col-auto">
                                <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                                  <i className="fa-solid fa-gears"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6">
                        <div className="card card-stats mb-4 mb-xl-0 rounded-2">
                          <div className="card-body">
                            <div className="row">
                              <div className="col">
                                <h5 className="card-title text-uppercase text-muted mb-0">Total <br />Items</h5>
                                <span className="h2 font-weight-bold mb-0">{itemCount}</span>
                              </div>
                              <div className="col-auto">
                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                  <i className="fa-solid fa-list"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container text-center">
            <br /><br /><br /><br />
            <div className="row">
              <div className="col">
                <Bar data={data} options={options} style={{ height: "90%", width: "100%" }} />
                <div className="col-lg-7 col-md-6 mb-4 mb-md-0">

                  <br /><br />
                  <h5 className="text-uppercase h4 fw-bold">Quick Access</h5>
                  <ul className="list-unstyled mb-0 text-start">
                    <li>
                      <a href="/orders/" className="text-dark h5" style={{ textDecoration: 'none' }}>- Orders List <i className="fa-solid fa-arrow-right"></i></a>
                    </li>
                    <li>
                      <a href="/item/" className="text-dark h5" style={{ textDecoration: 'none' }}>- Item List <i className="fa-solid fa-arrow-right"></i></a>
                    </li>
                    <li>
                      <a href="/orders/add" className="text-dark h5" style={{ textDecoration: 'none' }}>- Create New Order <i className="fa-solid fa-arrow-right"></i></a>
                    </li>
                    <li>
                      <a href="/category/" className="text-dark h5" style={{ textDecoration: 'none' }}>- Category List <i className="fa-solid fa-arrow-right"></i></a>
                    </li>
                  </ul>
                </div>

              </div>
              <div className="col">
                {renderDonutChart()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
