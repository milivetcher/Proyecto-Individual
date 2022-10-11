
const initialState = {
    recipes : [],
    allrecipes:[],
    typeDiets: [],
    detail: []
}


 

function rootReducer (state = initialState, action ){
    
    switch(action.type){
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allrecipes: action.payload
            }
        case 'FILTER_BY_DIET':
            console.log(action.payload)
            

            const allrecipes = state.allrecipes;
            //console.log(allrecipes)
            
            let recetasApi=[];
            let recetasDb=[];
            if(allrecipes.length>0){
            for(let i =0; i< allrecipes.length;i++){
             if(allrecipes[i].hasOwnProperty('diets')){
                recetasApi.push(allrecipes[i])
             }else{
                recetasDb.push(allrecipes[i])
             }
           }}
           const filtradoApi = action.payload === 'all'? recetasApi :
           recetasApi.filter(r=> r.diets.find(e => e.name === action.payload))

           const filtradoDb= action.payload === 'all' ? recetasDb :
           recetasDb.filter(l=> l.types.find(y=> y.name === action.payload))

            const result= filtradoApi.concat(filtradoDb)
            console.log(result)

            /*const statusFiltered = action.payload === 'all' ? allrecipes : 
            allrecipes.filter(t => t.diets.find(e =>  e  === action.payload ))   
            console.log(action.payload);*/

            return{

                ...state,
                recipes: result
            }

        case 'ORDER_BY_TITLE':
            let arrayOrdenadoAlf = action.payload === 'asc' ?
            state.recipes.sort(function(a,b){
                if(a.title > b.title){
                    return 1;
                }
                if(b.title>a.title){
                    return -1;
                }
                return 0;
            }):
            state.recipes.sort(function(a,b){
                if( a.title > b.title){
                    return -1;
                }
                if(b.title > a.title){
                    return 1;
                }
                return 0
            })
            return{
                ...state,
                recipes: arrayOrdenadoAlf
            }
        case 'ORDER_BY_HEALTHY':
            console.log(action.payload)
            let arrayOrdenadoHealthy = action.payload  === 'mostHealthFirst' ?
            state.recipes.sort(function(a,b){
                if(a.healthScore>b.healthScore){
                    return -1;
                }
                if(b.healthScore > a.healthScore){
                    return 1;
                }
                return 0;
            }):
            state.recipes.sort(function(a,b){
                if(a.healthScore<b.healthScore){
                    return -1;
                }
                if(b.healthScore<a.healthScore){
                    return 1;
                }
                return 0;
            })
            console.log(arrayOrdenadoHealthy)
            return{
                ...state,
                recipes: arrayOrdenadoHealthy
            } 
        case 'GET_TITLE_RECIPES':
            console.log(action.payload)
            return{
                ...state,
                recipes: action.payload
            }
        case 'POST_RECIPE':
            return{
                ...state
            }
        case 'GET_DIETS':
            console.log(action.payload)
            return{
                ...state,
                typeDiets: action.payload

            }
        case 'GET_DETAIL':
            console.log(action.payload)
            return{
                ...state,
                detail: action.payload
            }
        default: 
        return state;
    }


}



export default rootReducer;