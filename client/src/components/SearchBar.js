import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTitleRecipes } from "../actions";
import "./styles/SearchBar.css";


export default function SearchBar (){

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");


  function HandleInputChange(e){
    e.preventDefault();
    setTitle(e.target.value)
    /*if(e.target.vaule!==''){
      let filtro = document.getElementById('filterdiet')
      filtro.value='all';
    }*/
    //dispatch(getTitleRecipes(title))
    
    //console.log(title)
  }

  function enterSubmit(e){
    if (e.keyCode == 13) {
      document.getElementById('btn').click()
    }
  }

  function HandleSumbit(e){
    
    e.preventDefault(); 
    let selectDieta = document.getElementById('filterdiet')
    let filtro = selectDieta.value;
    dispatch(getTitleRecipes(title,filtro))
  }


  
  return (
    <div className="wrap">
    <div className="search">
      <input className="searchTerm"
        type="text"
        placeholder= "buscar receta..."
        onChange={(e) => HandleInputChange(e)} id='onChange'
        onKeyDown={(e) => enterSubmit(e)}
      />
      <button className="searchButton" type="submit" onClick={(e)=> HandleSumbit(e)} id='btn'>
       Buscar
       <i className="fa fa-search"></i>
      </button>
      
    </div>
    </div>
  
  )

}
