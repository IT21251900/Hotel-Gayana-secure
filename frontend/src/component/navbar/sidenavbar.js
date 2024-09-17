import React from "react";
import './sidenavbar.css'

function Sidenavbar() {


    return (
        <div className='container dashboard'>
            <div className="dashboard-nav ">
                <header>
                    <a href="/" className="brand-logo"><i className="fas fa-anchor"></i> <span>Gayana Hotel <br />DashBorad</span></a>
                </header>
                <nav className="dashboard-nav-list">
                    <a href="/" className="dashboard-nav-item"><i className="fas fa-home"></i>Home </a>
                    <div className='dashboard-nav-dropdown'>
                        <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                            <i className="fa-solid fa-bed"></i> reservation & booking </a>
                        <div className='dashboard-nav-dropdown-menu'>
                            <a href="/Reservation/" className="dashboard-nav-dropdown-item"> Reservation</a>
                            <a href="/Room/" className="dashboard-nav-dropdown-item"> Room</a>
                        </div>
                    </div>
                    <div className='dashboard-nav-dropdown'>
                        <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                            <i class="fa-solid fa-children"></i>Wedding & banquet hall </a>
                        <div className='dashboard-nav-dropdown-menu'>
                            <a href="/menu/" className="dashboard-nav-dropdown-item"> Add Menu and Dessert</a>
                            <a href="/menu/" className="dashboard-nav-dropdown-item"> Wedding details</a>

                        </div>
                    </div>
                    <div className='dashboard-nav-dropdown'>
                        <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                            <i class="fa-solid fa-car"></i>Transport Management </a>
                        <div className='dashboard-nav-dropdown-menu'>
                            <a href="/vehicle/" className="dashboard-nav-dropdown-item"> Vehicles</a>
                            <a href="/Booking/" className="dashboard-nav-dropdown-item"> Booking</a>
                        </div>
                    </div>

                    <div className='dashboard-nav-dropdown'><a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                        <i class="fa-solid fa-file-invoice-dollar"></i> Billing & Invoice </a>
                        <div className='dashboard-nav-dropdown-menu'>
                            <a href="/tax/" className="dashboard-nav-dropdown-item"> Tax</a>
                            <a href="/Invoice/" className="dashboard-nav-dropdown-item"> Invoice</a>
                        </div>
                    </div>
                    <div className='dashboard-nav-dropdown'>
                        <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                            <i className="fa-solid fa-warehouse"></i> Inventory & Supply </a>
                        <div className='dashboard-nav-dropdown-menu'>
                            <a href="/inventory/" className="dashboard-nav-dropdown-item">Home</a>
                            <a href="/orders/" className="dashboard-nav-dropdown-item">Orders</a>
                            <a href="/item/" className="dashboard-nav-dropdown-item">Items</a>
                            <a href="/category/" className="dashboard-nav-dropdown-item"> Category</a>
                        </div>
                    </div>
                    <div className='dashboard-nav-dropdown'>
                        <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                            <i className="fa-solid fa-handshake"></i> Customer Relationship </a>
                        <div className='dashboard-nav-dropdown-menu'>
                            <a href="/customer/" className="dashboard-nav-dropdown-item"> Customer</a>
                            <a href="/feedback/" className="dashboard-nav-dropdown-item"> Feedback</a>
                            <a href="/support/" className="dashboard-nav-dropdown-item"> Support</a>
                        </div>
                    </div>
                    <a href="/Employee/" className="dashboard-nav-item"><i className="fas fa-user"></i> Employee Management </a>
                    <div className='dashboard-nav-dropdown'>
                        <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                            <i class="fa-solid fa-utensils"></i> Resturent Mangement </a>
                        <div className='dashboard-nav-dropdown-menu'>
                            <a href="/menuResturent/" className="dashboard-nav-dropdown-item"> Resturent Menu</a>

                        </div>
                    </div>
                    <a href="/adminHome/" className="dashboard-nav-item"><i className="fas fa-user"></i> Admin Details</a>
                    <div className="nav-item-divider"></div>
                    <a href="/admin" className="dashboard-nav-item"><i className="fas fa-sign-out-alt"></i> Logout </a>
                </nav>
            </div>
            <div className='dashboard-app'>
                <header className='dashboard-toolbar fixed-top'><a href="#!" className="menu-toggle"><i className="fas fa-bars"></i></a></header>

            </div>
        </div>

    );
}

export default Sidenavbar;
