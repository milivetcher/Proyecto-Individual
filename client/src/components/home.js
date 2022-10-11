import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterByDiet, orderByTitle, orderByHealthy, getTitleRecipes } from "../actions";
import Recipe from "./recipe.js";
import Paginado from "./paginado";
import SearchBar from "./SearchBar.js";
import './styles/recipe.css';
import "./styles/home.css";



const Home = ()=>{

  const dispatch = useDispatch();
  const allrecipes = useSelector((state) => state.recipes);


  const [currentPage, setCurrentPage] = useState(1); //--> porque empieza en pag 1 siempre
  const [recipesPorPage, setRecipesPorPage] = useState(9);
  const indexLastRecipe = currentPage * recipesPorPage;
  const indexFirstRecipe = indexLastRecipe - recipesPorPage;
  const currentRecipes  = allrecipes.slice(indexFirstRecipe, indexLastRecipe);
  const [orden, setOrden] = useState('');
  
  const paginado = (pageNumber)=>{
    setCurrentPage(pageNumber)
  }


  useEffect (()=>{
    dispatch(getRecipes())
  },[dispatch]) 

  function handleClick(e){
    //console.log(e)
     e.preventDefault();
     dispatch(getRecipes())
  }

  function handleFilterStatus(e){
    //console.log(e)
    //dispatch(filterByDiet(e.target.value))
    let selectDieta = document.getElementById('filterdiet')
    let filtro = selectDieta.value;
    let title = document.getElementById('onChange').value
    dispatch(getTitleRecipes(title,filtro))
  }
  function handleOrderAlf(e){
    e.preventDefault();
    dispatch(orderByTitle(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);

  }
  function handleOrderHealth(e){
    e.preventDefault();
    //console.log(e.target.value);
    dispatch(orderByHealthy(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);

  }
  
    return (

      <div className="fondo">
      <Link to='/'>
        <div>
          <button className="button">Inicio</button><br/>
        </div>
      </Link>
      <Link to= '/recipe'>
        <div>
        <button className="button-crear-receta">Crear Receta</button>
        </div>
      </Link>
       <h2><br/>
      <button onClick={ e => {handleClick(e)}} className="botton-volver-a-cargar">
        Volver a cargar recetas
      </button>
       </h2><br/>
       <center>
       <h1>
      <SearchBar/>
      </h1>
      </center>
      <div className="principal">
        <select onChange={e=> handleOrderAlf(e)} className="select">
          <option value = 'asc'>A-Z</option>
          <option value='desc'>Z-A</option>
        </select>
        <select onChange={e => handleOrderHealth(e)} className="select">
        <option value='mostHealthFirst'>Mas saludable primero</option>
        <option value='leasttHealthFirst'>Menos saludable primero</option>
        </select>
        <select onChange={e => handleFilterStatus(e)} className="select" id="filterdiet">
          <option value='all'>Todas</option>
          <option value='vegan'>Vegan</option>
          <option value='gluten free'>Gluten Free</option>
          <option value='primal'>Primal</option>
          <option value='whole 30'>Whole 30</option>
          <option value='paleolithic'>Paleolithic</option>
          <option value='pescatarian'>Pescatarian</option>
          <option value='lacto ovo vegetarian'>Lacto Ovo Vegetarian</option>
          <option value='dairy free'>Dairy Free</option>
        </select>
       
        <Paginado
        recipesPorPage={recipesPorPage}
        allrecipes={allrecipes.length}
        paginado={paginado}
        />
         <div className="container">
        {
      
          currentRecipes?.map(e => {
            //console.log(e)
          
           let nuevo=[];
           e.hasOwnProperty('types')?
           e.types.map(d=>nuevo.push(d.name)):
           e.diets.map(d=>nuevo.push(d));
           //console.log(nuevo)

            return(
              <Link to={'/home/' + e.id} key={e.id} className="sin_decoracion">
              <Recipe 
              title={e.title}
              typeDiets={nuevo} 
              img={e.image} 
              key={e.id}
              /> 
              </Link>
            )
            
          })
        }
        </div>

      </div>      
    </div>
    )


}
    





export default Home;