import axios from 'axios';


export function getRecipes(){
    return async function(dispatch){
        var json = await axios ('http://localhost:3001/recipes',{}); 
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}
//me traigo la ruta para la search bar:
export function getTitleRecipes(title,filtro){
    //console.log(title)
    return async function(dispatch){
        try{
            var json = await axios('http://localhost:3001/recipes?title='+title)
            if(filtro!=='all'){
                let recetasApi=[];
                let recetasDb=[];
                if(json.data.length>0){
                for(let i =0; i< json.data.length;i++){
                if(json.data[i].hasOwnProperty('diets')){
                    recetasApi.push(json.data[i])
                }else{
                    recetasDb.push(json.data[i])
                }
            }}
            const filtradoApi = filtro === 'all'? recetasApi :
            recetasApi.filter(r=> r.diets.find(e => e === filtro))

            const filtradoDb= filtro === 'all' ? recetasDb :
            recetasDb.filter(l=> l.types.find(y=> y.name === filtro))

                const result= filtradoApi.concat(filtradoDb)
                json.data = result
            }
            console.log(json.data)
            return dispatch({
                type: 'GET_TITLE_RECIPES',
                payload: json.data
            })
        }catch(e){
            console.log(e);
        }
    }

}

export function getTypes(){
    return async function(dispatch){
        try{
            var json = await axios('http://localhost:3001/diets') //--> el axios.get viene por defecto
            console.log(json)
        
            return dispatch({
                type: 'GET_DIETS',
                payload: json.data
            })
        }catch(e){
            console.log(e)
        }
    }
}

export function postRecipe(payload){

  console.log(payload)
  return async function(dispatch){
   const json = await axios.post('http://localhost:3001/recipe', payload);
   console.log(json);
   return json;
  }
}

export function filterByDiet(payload){
  console.log(payload)
    return{
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function orderByTitle(payload){
    return{
       type: 'ORDER_BY_TITLE',
       payload
    }
}
export function orderByHealthy(payload){
    return{
        type: 'ORDER_BY_HEALTHY',
        payload
    }
}
export function getDetail(id){
   return async function (dispatch){
    try{
        var json = await axios('http://localhost:3001/recipes/'+id);
        console.log(json.data)
        return dispatch ({
            type: 'GET_DETAIL',
            payload: json.data
        })
        
    }catch(e){
        console.log(e)
    }
   }
}