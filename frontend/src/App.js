import React from 'react';
import {gapi} from 'gapi-script';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Common component
import Sidenavbar from './component/navbar/sidenavbar';
import PrivacyPolicy from './modules/auth/login/privacy-policy'
//import AdminFooter from './component/footerAdmin/footer'


// Category components
import AddCategory from './component/Category/addCategory';
import ShowCategory from './component/Category/showCategory';
import UpdateCategory from './component/Category/updateCategory';

// Item components
import AddItem from './component/Item/addItem';
import ShowItem from './component/Item/showItem';
import UpdateItem from './component/Item/updateItem';

// Order components
import ShowOrders from './component/Order/showorder';
import CreateOrder from './component/Order/createorder';
import Inovoice from './component/Order/invoice';
import Qualitycontrol from './component/Order/qualitycontrol';

// Home component
import HomeInventory from './component/Home/home';

// Admin Router
import LoginComponent from './modules/auth/login/login.component';
import ForgotPassword from './modules/auth/forgot-password/forgot.password.component';
import { AuthProvider } from './modules/auth/services/auth.service';
import ResetPassword from './modules/auth/reset-password/reset-password-component';
import Register from './component/Admin/addAdmin';
import ShowAdmin from './component/Admin/ShowAdmin';

//Room component 
import AddRoomType from './component/Room/addRoom'
import ShowRoom from './component/Room/showRoom'
import UpdateRoom from './component/Room/updateRoom'

//Reservation component 
import AddReserevation from './component/Reservation/addReservation'
import ShowReservation from './component/Reservation/showReservation'
import UpdateReservation from './component/Reservation/updateReservation'

//customer component 
import AddCustomer from './component/Customer/addCustomer'
import ShowCustomer from './component/Customer/showCustomer'
import UpdateCustomer from './component/Customer/updateCustomer'

//feedback component
import ShowFeedback from './component/Feedback/showFeedback'
import AddFeedback from './component/Feedback/addFeedback'

//support component
import ShowSupport from './component/Support/showSupport'
import AddSupport from './component/Support/addSupport'

//booking component
import AddBooking from './component/Booking/addBooking'
import ShowBooking from './component/Booking/showBooking'
import UpdateBooking from './component/Booking/updateBooking'

//category component 
import AddVehicle from './component/vehicle/addVehicle'
import ShowVehicles from './component/vehicle/showVehicle'
import UpdateVehicle from './component/vehicle/updateVehicle'

//wedding menu
import Addmenu from './component/menu/Addmenu';
import Showmenu from './component/menu/showmenu';
import Updatemenu from './component/menu/updatemenu';

//Resturent Menu
import AddmenuResturent from './component/menu_Resturent/Addmenu';
import ShowmenuResturent from './component/menu_Resturent/showmenu';
import UpdatemenuResturent from './component/menu_Resturent/updatemenu';

//invoice component
import AddInvoice from './component/Invoice/addInvoice'
import ShowInvoice from './component/Invoice/showInvoice'
import UpdateInvoice from './component/Invoice/updateInvoice'

//detail component 
import AddTax from './component/tax/addDetails'
import ShowTax from './component/tax/showDetails'
import UpdateTax from './component/tax/updateDetails'

//employee
import AddEmployee from './component/Employee/addEmployee'
import ShowEmployee from './component/Employee/showEmployee'
import UpdateEmployee from './component/Employee/updateEmployee'




export const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/admin' exact element={<LoginComponent />} />
        <Route path='/forgot-password' exact element={< ForgotPassword/>} />

        <Route path='auth/reset-password/:id' exact element={< ResetPassword/>} />

        {/* Admin Route */}
        <Route path='/admin/register/' exact element={<div><Register /><Sidenavbar /></div>} />
        <Route path='/adminHome/' exact element={<div><ShowAdmin /><Sidenavbar /></div>} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Homeinventory Route */}
        <Route path='/inventory/' exact element={<div><HomeInventory /><Sidenavbar /></div>} />

        {/* Category Route */}
        <Route path='/category/' exact element={<div><ShowCategory /><Sidenavbar /></div>} />
        <Route path='/category/add' element={<div><AddCategory /><Sidenavbar /></div>} />
        <Route path='/category/update/:id' element={<div><UpdateCategory /><Sidenavbar /></div>} />

        {/* Item Route */}
        <Route path='/item/' exact element={<div><ShowItem /><Sidenavbar /></div>} />
        <Route path='/item/add' element={<div><AddItem /><Sidenavbar /></div>} />
        <Route path='/item/update/:id' element={<div><UpdateItem /><Sidenavbar /></div>} />

        {/* Order Route */}
        <Route path='/orders/' exact element={<div><ShowOrders /><Sidenavbar /></div>} />
        <Route path='/orders/add' exact element={<div><CreateOrder /><Sidenavbar /></div>} />
        <Route path='/orders/invoice/:id' exact element={<div><Inovoice /><Sidenavbar /></div>} />
        <Route path='/orders/qualitycontrol' exact element={<div><Qualitycontrol /><Sidenavbar /></div>} />

        {/* Room Route */}
        <Route path='/Room/' exact element={<div><ShowRoom /><Sidenavbar /></div>} />
        <Route path="/Room/add" element={<div><AddRoomType /><Sidenavbar /></div>} />
        <Route path="/Room/update/:id" element={<div><UpdateRoom /><Sidenavbar /></div>} />

        {/* Reservation Route */}
        <Route path='/Reservation/' exact element={<div><ShowReservation /><Sidenavbar /></div>} />
        <Route path="/Reservation/add" element={<div><AddReserevation /><Sidenavbar /></div>} />
        <Route path="/Reservation/update/:id" element={<div><UpdateReservation /><Sidenavbar /></div>} />

        {/* Customer Route */}
        <Route path='/customer/' exact element={<div><ShowCustomer /><Sidenavbar /></div>} />
        <Route path="/customer/add" element={<div><AddCustomer /><Sidenavbar /></div>} />
        <Route path="/customer/update/:id" element={<div><UpdateCustomer /><Sidenavbar /></div>} />

        {/* Feedback Route */}
        <Route path="/feedback/" exact element={<div><ShowFeedback /><Sidenavbar /></div>} />
        <Route path="/feedback/add" exact element={<div><AddFeedback /><Sidenavbar /></div>} />

        {/* Support Route */}
        <Route path="/support/" exact element={<div><ShowSupport /><Sidenavbar /></div>} />
        <Route path="/support/add" exact element={<div><AddSupport /><Sidenavbar /></div>} />

        {/* Vehicle Route */}
        <Route path='/vehicle/' exact element={<div><ShowVehicles /><Sidenavbar /></div>} />
        <Route path="/vehicle/add" element={<div><AddVehicle /><Sidenavbar /></div>} />
        <Route path="/vehicle/update/:id" element={<div><UpdateVehicle /><Sidenavbar /></div>} />

        {/* Booking Route */}
        <Route path='/Booking/' exact element={<div><ShowBooking /><Sidenavbar /></div>} />
        <Route path="/Booking/add" element={<div><AddBooking /><Sidenavbar /></div>} />
        <Route path="/Booking/update/:id" element={<div><UpdateBooking /><Sidenavbar /></div>} />

        {/* Wedding Menu */}
        <Route path='/menu/' element={<div><Showmenu /><Sidenavbar /></div>} />
        <Route path="/menu/add" element={<div><Addmenu /><Sidenavbar /></div>} />
        <Route path="/menu/update/:id" element={<div><Updatemenu /><Sidenavbar /></div>} />

        {/* Resturent Menu */}
        <Route path='/menuResturent/' element={<div><ShowmenuResturent /><Sidenavbar /></div>} />
        <Route path="/menuResturent/add" element={<div><AddmenuResturent /><Sidenavbar /></div>} />
        <Route path="/menuResturent/update/:id" element={<div><UpdatemenuResturent /><Sidenavbar /></div>} />

        {/* texRoute */}
        <Route path='/tax/' exact element={<div><ShowTax /> <Sidenavbar /></div>} />
        <Route path="/tax/add" element={<div><AddTax /> <Sidenavbar /></div>} />
        <Route path="/tax/update/:id" element={<div><UpdateTax /> <Sidenavbar /></div>} />

        {/* InvoiceRoute */}
        <Route path='/Invoice/' exact element={<div><ShowInvoice /> <Sidenavbar /></div>} />
        <Route path="/Invoice/add" element={<div><AddInvoice /> <Sidenavbar /></div>} />
        <Route path="/Invoice/update/:id" element={<div><UpdateInvoice /> <Sidenavbar /></div>} />

        {/* Employee Route */}
        <Route path='/Employee/' exact element={<div><ShowEmployee /><Sidenavbar /></div>} />
        <Route path="/Employee/add" element={<div><AddEmployee /><Sidenavbar /></div>} />
        <Route path="/Employee/update/:id" element={<div><UpdateEmployee /><Sidenavbar /></div>} />

        

      </Routes>
      </AuthProvider>
    </Router>

    
  );
};

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId:
      "151745723501-5i3oinfp88ubll6f6rf3h4uj4ou7qmdr.apps.googleusercontent.com",
    plugin_name: "chat",
  });
});

export default App;
