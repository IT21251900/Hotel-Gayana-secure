import React, { useState, useEffect } from "react";
import axios from "axios";
import { search } from "../CommonJS/search.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DOMPurify from "dompurify";

export default function Showmenu() {
  const [menu, setmenu] = useState([]);

  useEffect(() => {
    const getmenu = () => {
      axios
        .get("http://localhost:8000/api/menu/get/")
        .then((res) => {
          setmenu(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getmenu();
  }, []);

  const onDelete = (id) => {
    console.log("Attempting to delete item with ID:", id);

    if (!id) {
      console.error("Invalid ID");
      return;
    }

    axios
      .delete(`http://localhost:8000/api/menu/delete/${id}`)
      .then((response) => {
        console.log(response.data); // Log success response
        setmenu((prevMenu) =>
          prevMenu.filter((menuItem) => menuItem._id !== id)
        );
        console.log("Menu item with id:", id, "deleted");
      })
      .catch((err) => {
        console.error(
          "Error deleting menu item:",
          err.response ? err.response.data : err
        );
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.setFont("times", "bold");
    doc.text("Hotel Gayana", doc.internal.pageSize.getWidth() / 2, 10, {
      align: "center",
    });
    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");
    doc.text("All menu", 10, 30);
    doc.text(new Date().toLocaleString(), 10, 40, { fontSize: 10 });

    const headers = [
      [
        "#",
        "id",
        "menuModel",
        "menu Dash Number",
        "Category",
        "Price",
        "Description",
      ],
    ];

    const data = menu.map((menuItem, index) => [
      index + 1,
      menuItem._id,
      menuItem.menuModel,
      menuItem.menu,
      menuItem.menucat,
      menuItem.price,
      DOMPurify.sanitize(menuItem.description), // Sanitize description
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 50,
      didDrawPage: function (data) {
        doc.setFontSize(10);
        doc.text(
          "This is the footer",
          data.settings.margin.left,
          doc.internal.pageSize.getHeight() - 10
        );
      },
    });

    doc.save("all_vehicles.pdf");
  };

  return (
    <div className="container dashboard">
      <div className="dashboard-app">
        <div className="dashboard-content ">
          <div className="m-5">
            <h1>All Menus Here!</h1>
            <br></br>
            <button className="btn btn-success">
              <a
                href="/menu/add"
                style={{ textDecoration: "none", color: "white" }}
              >
                Add New menu
              </a>
            </button>
            <br></br>
            <br></br>
            <div className="input-group flex-nowrap">
              <span className="input-group-text">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                id="myInput"
                className="form-control"
                onKeyUp={search}
                placeholder="Search for Vehicle Model.."
              />
            </div>
            <div className="search-wrapper">
              <br></br>
              <div></div>

              <table className="table" id="myTable">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Menu</th>
                    <th>Menu No</th>
                    <th>Menu Category</th>
                    <th>Price</th>
                    <th>Menu Description</th>
                  </tr>
                </thead>
                <tbody>
                  {menu.map((menuItem, index) => (
                    <tr key={menuItem._id}>
                      <td>{index + 1}</td>
                      <td>{menuItem.menu}</td>
                      <td>
                        <center>{menuItem.menunumber}</center>
                      </td>
                      <td>
                        <center>{menuItem.menucat}</center>
                      </td>
                      <td>
                        <center>{menuItem.price}</center>
                      </td>
                      <td>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(menuItem.description),
                          }}
                        />
                      </td>
                      <td>
                        <a
                          className="btn btn-warning"
                          href={"/menu/update/" + menuItem._id}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>Edit
                        </a>
                        <button
                          className="btn btn-danger"
                          onClick={() => onDelete(menuItem._id)}
                        >
                          <i className="fa-sharp fa-solid fa-trash"></i>Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={generatePDF} class="btn btn-primary btn-sm">
                <i class="fa fa-download"></i> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
