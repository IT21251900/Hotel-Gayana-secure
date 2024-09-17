import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { search } from '../CommonJS/search.js'

export default function ShowCategory() {
    const [categories, setCategories] = useState([])

    //Show Category
    useEffect(() => {
        const getCategories = () => {
            axios.get("http://localhost:8000/api/category/get/")
                .then((res) => {
                    setCategories(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getCategories()
    }, [])

    //Category Delete
    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/category/delete/${id}`)
            .then(() => {
                setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
                //console.log('Category with id:', id, 'deleted');
            })
            .catch((err) => {
                console.log(err);
            });
    }




    return (
        <div className='container dashboard'>
            <div className='dashboard-app'>
                <div className='dashboard-content'>
                    <div className='m-5'>
                        <h1>All Categories</h1>
                        <button className='btn btn-success'>
                            <a href='/category/add' style={{ textDecoration: 'none', color: 'white' }}>Create New Category</a></button>
                        <br />
                        <br />
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" id="myInput" className="form-control" onKeyUp={(search)} placeholder="Search for Category.." />

                        </div>
                        <br />
                        <br />
                        <table className="table" id="myTable">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    <th>Location Storage</th>
                                    <th>Location Rack</th>
                                    <th>Category Note</th>
                                    <th>Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category._id}>
                                        <td>{index + 1}</td>
                                        <td>{category.categoryname}</td>
                                        <td>{category.locationStorage}</td>
                                        <td>{category.locationRack}</td>
                                        <td>{category.categoryNote}</td>
                                        <td>
                                            <a className="btn btn-warning text-decoration-none" href={'/category/update/' + category._id}>&nbsp;&nbsp;
                                                <i className="fa-solid fa-pen-to-square"></i>&nbsp;&nbsp;Edit&nbsp;</a>
                                            &nbsp;&nbsp;
                                            <button className="btn btn-danger" onClick={() => onDelete(category._id)}>&nbsp;&nbsp;
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
