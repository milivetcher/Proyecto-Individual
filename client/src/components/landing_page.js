import React from "react";
import { Link } from "react-router-dom";
import "./styles/landing_page.css";

const Landing_page = ()=>(
    <div>
    <div className="wallpaper" >
     <Link to="/home">
     <button className="home-button">Ingresar</button>
     </Link>
     </div>
   </div>
)

export default Landing_page;