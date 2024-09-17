import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { search } from '../CommonJS/Feedback_search.js';
import jsPDF from 'jspdf';
import "jspdf-autotable";

export default function ShowFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [feedbackCounts, setFeedbackCounts] = useState({
    serviceQuality: {},
    cleanliness: {},
    food: {},
    staff: {},
    overallExperience: {}
  });

  useEffect(() => {
    const getFeedback = () => {
      axios.get("http://localhost:8000/api/feedback/get/")
        .then((res) => {
          setFeedback(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getFeedback();
  }, []);

  useEffect(() => {
    calculateFeedbackCounts();
    // eslint-disable-next-line
  }, [feedback]);

  const calculateFeedbackCounts = () => {
    const counts = {
      serviceQuality: {},
      cleanliness: {},
      food: {},
      staff: {},
      overallExperience: {}
    };

    feedback.forEach((feedback) => {
      counts.serviceQuality[feedback.serviceQuality] = (counts.serviceQuality[feedback.serviceQuality] || 0) + 1;
      counts.cleanliness[feedback.cleanliness] = (counts.cleanliness[feedback.cleanliness] || 0) + 1;
      counts.food[feedback.food] = (counts.food[feedback.food] || 0) + 1;
      counts.staff[feedback.staff] = (counts.staff[feedback.staff] || 0) + 1;
      counts.overallExperience[feedback.overallExperience] = (counts.overallExperience[feedback.overallExperience] || 0) + 1;
    });

    setFeedbackCounts(counts);
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/api/feedback/delete/${id}`)
      .then(() => {
        setFeedback(prevCategories => prevCategories.filter(feedback => feedback._id !== id));
        console.log('Feedback with id:', id, 'deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generatePDF = () => {
    // create new PDF document
    const doc = new jsPDF();
    // set font size and style
    doc.setFontSize(24);
    doc.setFont("times", "bold");
    // add content to the document
    doc.text("Hotel Gayana", doc.internal.pageSize.getWidth() / 2, 10, { align: "center" });
    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");
    doc.text("Feedback Details", 10, 30);
    doc.text(new Date().toLocaleString(), 10, 40, { fontSize: 10 });
    // define table headers
    const headers = [["#", "Name", "NIC", "hearAboutHotel", "reservationMethod", "visitPurpose", "serviceQuality", "cleanliness", "food", "staff", "overallExperience", "suggestions"]];
    // define column widths as percentages
    //const columnWidths = ["1%", "1%", "10%","8%", "20%", "8%", "20%", "20%", "12%"];
    // iterate over Rooms and add them to the table
    const data = feedback.map((feedback, index) => [index + 1, feedback.customerName, feedback.NIC, feedback.hearAboutHotel, feedback.reservationMethod, feedback.visitPurpose, feedback.serviceQuality, feedback.cleanliness, feedback.food, feedback.staff, feedback.overallExperience, feedback.suggestions]);
    // add table to the document
    doc.autoTable({
      head: headers,
      body: data,
      startY: 50,
      /*styles: {
        fontSize: 10,
        cellPadding: 2,
        overflow: 'linebreak',
      },*/
      
      addPageContent: function (data) {
        doc.setFontSize(10);
        doc.text("Page " + data.pageCount, data.settings.margin.left, doc.internal.pageSize.getHeight() - 10);
      },
      // center align headers and columns
      headStyles: {
        fillColor: [44, 130, 201],
        textColor: 255,
        halign: 'center'
     },
    styles: {
       halign: 'center'
     }  
    });
    // save the document
    doc.save("feedback_report.pdf");
  };

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
        <br></br>

        <div className='m-2'>
            <h1>Feedback Details</h1>
            <br></br>
            <button className='btn btn-success'>
            <a href='/feedback/add' style={{textDecoration:'none',color:'white'}}>Add New Feedback</a></button>

            <br></br>
            <br></br>

            <div className="input-group flex-nowrap">
              <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" id="myInput" className="form-control" onKeyUp={(search)} placeholder="Search for Customer NIC.."/>  
            </div>
          
            <div className='search-wrapper'>    
            <br></br>

          <table className="table" id="myTable" >
                <thead >
                    <tr>
                        <th style={{ borderBottom: '1px solid black'}}><center>#</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Name</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>NIC</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Source of Referral</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Reservation Method</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Visit Purpose</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Service Quality</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Cleanliness</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Food</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Staff</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Overall Experience</center></th>
                        <th style={{ borderBottom: '1px solid black'}}><center>Suggestions/ Recommendations</center></th>
                    </tr>
                </thead>
                <tbody>
                    {feedback.map((feedback, index) => ( 
                        <tr key={feedback._id}>
                            <td>{index + 1}</td>
                            <td><center>{feedback.customerName}</center></td>
                            <td><center>{feedback.NIC}</center></td>
                            <td><center>{feedback.hearAboutHotel}</center></td>
                            <td><center>{feedback.reservationMethod}</center></td>
                            <td><center>{feedback.visitPurpose}</center></td>
                            <td><center>{feedback.serviceQuality}</center></td>
                            <td><center>{feedback.cleanliness}</center></td>
                            <td><center>{feedback.food}</center></td>
                            <td><center>{feedback.staff}</center></td>
                            <td><center>{feedback.overallExperience}</center></td>
                            <td><center>{feedback.suggestions}</center></td>
                            
                            <td>     
                              <button style={{width: '100px', height: '38px'}}className="btn btn-danger" onClick={() => onDelete(feedback._id)}>&nbsp;&nbsp;
                                    <i className="fa-sharp fa-solid fa-trash"></i>Delete
                              </button>
                            </td>
                        </tr>  
                    ))}
                </tbody>
             </table>
          <br/>
          <button onClick={generatePDF} className="btn btn-primary btn-sm">
            <i className="fa fa-download"></i> Download PDF
          </button>

          <br/><br/><br/>

          <h2 style={{color:'black'}}> Feedback Counts  </h2>


          <div className="feedback-counts" style={{ marginTop: '20px', display: 'flex' }}>

          
  <div
    className="feedback-box"
    style={{
       
      backgroundColor: 'rgba(68, 62, 162, 0.1',
      boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.1)',
      border: '1px solid #373193',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '10px',
      flex: '1',
      marginRight: '10px',
      color:'black'
    }}

    onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(68, 62, 162, 0.7)';
        e.target.style.color = 'white';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(68, 62, 162, 0.1)';
        e.target.style.color = 'black'
      }}
    
  >
    <h3><center>Service Quality</center></h3>
    <ul style={{ listStyleType: 'none', paddingLeft: 20 ,fontSize:18}}>
      {Object.entries(feedbackCounts.serviceQuality).map(([key, value]) => (
        <li key={key}>{key}: {value}</li>
      ))}
    </ul>
  </div>

  <div
    className="feedback-box"
    style={{
      backgroundColor: 'rgba(68, 62, 162, 0.1',
      boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.1)',
      border: '1px solid #373193',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '10px',
      flex: '1',
      marginRight: '10px',
      color:'black'
    }}
    onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(68, 62, 162, 0.7)';
        e.target.style.color = 'white';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(68, 62, 162, 0.1)';
        e.target.style.color = 'black'
      }}
  >
    <h3><center>Cleanliness</center></h3>
    <ul style={{ listStyleType: 'none', paddingLeft: 20 ,fontSize:18 }}>
      {Object.entries(feedbackCounts.cleanliness).map(([key, value]) => (
        <li key={key}>{key}: {value}</li>
      ))}
    </ul>
  </div>


{/*Food*/}
  <div
    className="feedback-box"
    style={{
      backgroundColor: 'rgba(68, 62, 162, 0.1',
      boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.1)',
      border: '1px solid #373193',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '10px',
      flex: '1',
      marginRight: '10px',
      color:'black'
    }}
    onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(68, 62, 162, 0.7)';
        e.target.style.color = 'white';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(68, 62, 162, 0.1)';
        e.target.style.color = 'black'
      }}
    
  >
    <h3><center>Food</center></h3>
    <ul style={{ listStyleType: 'none', paddingLeft: 20 ,fontSize:18 }}>
      {Object.entries(feedbackCounts.food).map(([key, value]) => (
        <li key={key}>{key}: {value}</li>
      ))}
    </ul>
  </div>



  <div
    className="feedback-box"
    style={{
      backgroundColor: 'rgba(68, 62, 162, 0.1',
      boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.1)',
      border: '1px solid #373193',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '10px',
      flex: '1',
      marginRight: '10px',
      color:'black'
    }}
    onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(68, 62, 162, 0.7)';
        e.target.style.color = 'white';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(68, 62, 162, 0.1)';
        e.target.style.color = 'black'
      }}
  >
    <h3><center>Staff</center></h3>
    <ul style={{ listStyleType: 'none', paddingLeft: 20 ,fontSize:18 }}>
      {Object.entries(feedbackCounts.staff).map(([key, value]) => (
        <li key={key}>{key}: {value}</li>
      ))}
    </ul>
  </div>

  <div
    className="feedback-box"
    style={{
      backgroundColor: 'rgba(68, 62, 162, 0.1',
      boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.1)',
      border: '1px solid #373193',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '10px',
      flex: '1',
      color:'black'
    }}
    onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(68, 62, 162, 0.7)';
        e.target.style.color = 'white';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(68, 62, 162, 0.1)';
        e.target.style.color = 'black'
      }}
  >
    <h3><center>Overall Experience</center></h3>
    <ul style={{ listStyleType: 'none', paddingLeft: 20 ,fontSize:18 }}>
      {Object.entries(feedbackCounts.overallExperience).map(([key, value]) => (
        <li key={key}>{key}: {value}</li>
      ))}
    </ul>
  </div>
</div>



            </div>
           </div>
          </div>
         </div>
        </div>
    )
}
