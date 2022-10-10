import React from "react";
import "./styles/paginado.css";

const Paginado = ({recipesPorPage, allrecipes, paginado}) =>{
    const pageNumbers = [];
    for(let i = 1; i <=Math.ceil(allrecipes/recipesPorPage); i++){
        pageNumbers.push(i);
    }
    return (
            
           <nav className="nav">
                {pageNumbers?.map(number =>(
                
                    <button onClick={()=> paginado(number)} className="paginado" key={number}>{number}</button>
           
                ))}
            </nav>

    
    )

}

export default Paginado;