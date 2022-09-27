import React from "react";
import { Link } from "react-router-dom";
import "./styles/inicio.css";

const Inicio = ()=>(
    <div>
     <Link to="/paginaprincipal">
     <div className="wallpaper" >
     <button className="home-button">Pag Principal</button>
     </div>
     </Link>
   </div>
)

export default Inicio;