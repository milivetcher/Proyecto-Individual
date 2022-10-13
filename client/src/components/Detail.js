import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import logo from "../img/cuchara.png";
import "./styles/Detail.css"


export default function Detail(props){
    //console.log(props)

    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])

    var foundRecipe = useSelector((state)=> state.detail)
    let nuevo = [];
    let intructionsApi =[];

    if(foundRecipe[0]){
        //console.log(foundRecipe[0]);
        //console.log(foundRecipe[0].hasOwnProperty('types'))
        foundRecipe[0].hasOwnProperty('types')?
        foundRecipe[0].types.map(d=>nuevo.push(d.name)):
        foundRecipe[0].diets.map(d=>nuevo.push(d));
        //console.log(nuevo)
        foundRecipe[0].hasOwnProperty('analyzedInstructions')?
        JSON.parse(foundRecipe[0].analyzedInstructions).map(d=>d.steps.map(r=>intructionsApi.push(r))):
       
        intructionsApi.push(foundRecipe[0].instructions)

    }
    
   /* let nuevo=[];
    foundRecipe[0].hasOwnProperty('types')?
    foundRecipe[0].types.map(d=>nuevo.push(d.name)):
    foundRecipe[0].diets.map(d=>nuevo.push(d));
    console.log(nuevo)*/

    return(
        <div className="body">
        <div> 
            { 
                foundRecipe.length >0 ?
                <div className="contenedor">
                <h1 className="title">{foundRecipe[0].title}</h1>

                <div className="caja-1">
                <h1>
                <img className="img-detalle" src={foundRecipe[0].image? foundRecipe[0].image : logo}/>
                </h1>
                <a>Health Score: {foundRecipe[0].healthScore}</a>
                </div>


                <div className="caja-2">
                {foundRecipe[0].summary &&
                    <div>
                        <h2>Resumen:</h2>
                        <p dangerouslySetInnerHTML={{__html:foundRecipe[0].summary}}>
                        </p>
                    </div>
                }
                {foundRecipe[0].resume &&
                    <p>Resumen:{' '+foundRecipe[0].resume}</p>  
                } 
                <h3>Instrucciones: </h3>
                <p>{foundRecipe[0].instructions? foundRecipe[0].instructions:
                intructionsApi.map(j=><p key={j.number}>{j.number + ': '+j.step}</p>)}</p>
                
                <h3>Esta receta es apta para dietas: {nuevo.map(d=> ' -'+d)}</h3>
                <h2> {foundRecipe[0].dishTypes? 'Tipo de plato: '+ foundRecipe[0].dishTypes.map(p=> ' '+ JSON.parse(p).name): '' }</h2>
                </div> 
                </div>:

                <img src="https://thumbs.gfycat.com/DeliriousSeveralAsianelephant-size_restricted.gif"></img>
               
            
            }
            <Link to='/home'>
                <button className="button-volver">Volver</button>
            </Link>
            </div>
        </div>
        
    )

}