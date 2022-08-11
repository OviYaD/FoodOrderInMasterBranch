import "./Report.css";
import { useState, useEffect, useRef, LegacyRef } from "react";
export var email: any;
export var feedback: any;
function Report() {
  email = useRef(null);
  feedback = useRef(null);
  const handleSubmit = (event: any): void => {
    event.preventDefault();
    if (feedback?.current?.value == "good") console.log("good customer");
    // update customer status good in firebase using gmail
    else console.log("block customer"); // update customer status block in firebase using gmail
  };
  return (
    <>
      <div className="report-box">
        <h2>REPORT USER</h2>
        <form action="/ReportSuccess" onSubmit={handleSubmit}>
          <div className="user-box">
            <input type="Text" ref={email} name="email" required></input>
            <label>CUSTOMER EMAIL</label>
          </div>
          <div className="user-box">
            <input type="Text" ref={feedback} name="feedback" required></input>
            <label>REVIEW</label>
          </div>
          <a href="/ReportSuccess">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            REPORT
          </a>
        </form>
      </div>
    </>
  );
}
export default Report;
