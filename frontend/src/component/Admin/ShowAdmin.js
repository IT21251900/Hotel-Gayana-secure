import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function ShowAdmin() {
    const [admins, setAdmin] = useState([])

    useEffect(() => {
        const getAdmins = () => {
            axios.get("http://localhost:8000/api/admin/get")
                .then((res) => {
                    setAdmin(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getAdmins()
    }, [])

    const onDelete = (id) => {
        axios
          .delete(`http://localhost:8000/api/admin/delete/${id}`)
          .then(() => {
            setAdmin(prevAdmins => prevAdmins.filter(admin => admin._id !== id));
            //console.log('Admin with id:', id, 'deleted');
          })
          .catch((err) => {
            console.log(err);
          });
      };
      

       
   

    return (
        <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
        <div className="mt-5">
            <h1>Show Admin Details</h1>
            <button className='btn btn-success'>
          <a href='/admin/register/' style={{textDecoration:'none',color:'white'}}>Add New Admin</a></button>
          <br/>
          <br/>
            <br/>
          <br/>
            <table className="table" id="myTable">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>Name </th>
                        <th>Email Address</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admins, index) => (
                        <tr key={admins._id}>
                            <td>{index + 1}</td>
                            <td>{admins.adminName}</td>
                            <td>{admins.adminEmail}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => onDelete(admins._id)}>&nbsp;&nbsp;
                                    <i className="fa-sharp fa-solid fa-trash"></i>&nbsp;Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
            </div>
            </div>
    )
}
