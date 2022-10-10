import React from "react";
import Recipe from "./recipe";


const Recipes = ({recipes}) => {
    if(!recipes) return -1;

    return (
        <div>
        {recipes&&recipes.map(el=>(
            <Recipe
            id= {el.id}
            img= {el.img}
            name={el.name}
            type={el.type}
            onClose = {()=>alert(el.name)}
            />
        ))}
     </div>
    )
}

export default Recipes;