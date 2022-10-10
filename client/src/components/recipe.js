import React from "react";
import './styles/recipe.css';
import logo from '../img/cuchara.png'


const Recipe =({title,typeDiets,img,id})=>{
    
  
  
    return(
        
       <div key={id}>
     
        <div className="">
            <div className="card">
            <img src={img? img:logo} alt="" width='200px' height='250px'/>
            <p>{title}</p>
            <p>{typeDiets.map(t => <a key={t}> {t+', '}</a>)}</p>
            </div>
        </div>
        
   
       </div>


     




    )
} 

export default Recipe;