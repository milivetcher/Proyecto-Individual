const e = require('express');
const { Router } = require('express');
const axios= require('axios');
const API = require('./api.json');
const { REAL } = require('sequelize');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {Recipe, Type} = require('../db');
const { Sequelize } = require('sequelize');

const apiKey= 'fe41fdaf492d4e65a222b2175ffd78b2';


const  getApiInfo = async () => {
    try{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`)
    //console.log(apiUrl);
     const apiInfo = await apiUrl.data.results.map(e =>{
         return {
             id: e.id, 
             title: e.title,
             image: e.image,
             diets: e.diets.map((d)=> {return d}), // un array con los tipos de dieta de esa receta
             spoonacularScore : e.spoonacularScore,   // puntuacion
             dishTypes: e.dishTypes.map((d)=> {return JSON.stringify({name:d})}), // tipo de plato
             summary: e.summary,            // un resumen del plato
             healthScore: e.healthScore,    // que tan saludable es
             analyzedInstructions: JSON.stringify(e.analyzedInstructions)// el paso a paso de como se hace 
            }
            
     })
    
    //console.log(apiInfo)
    
    return apiInfo;    }catch(e){
        console.log(e)
    }      
    
   
};

//getApiInfo();
const getDbInfo= async () => {
    return await Recipe.findAll({
        include:{
            model: Type,
            atributes: ['name'],
            through: {
                attributes: [],  //-->mediante los atributos
              },
        }
    })
}


const getAllrecipes = async () => {
    const apiRecipes = await getApiInfo();
    //const apiRecipes = API;
    const dbRecipes = await getDbInfo();
    let allInfo = await [...apiRecipes,...dbRecipes];
    
    //console.log(allInfo)
    return allInfo;
    

}

//getAllrecipes();

//aca van los user.create etc
//







const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async (req, res) => {

    
    const { title } = req.query;
    //const infoApi = API; //-->json
    //const infoDb = await getDbInfo();
    //const allinfo = infoApi.results.concat(infoDb);
    const allinfo= await getAllrecipes();
    //console.log(allinfo)
    if(!title){
        res.status(200).send(allinfo);

    }else{
        let foundTitle = allinfo.filter(e => e.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
        foundTitle.length ?
        res.status(200).send(foundTitle) :
        res.status(404).json({message:'Recipe not found :('})
    }


    
   
})

router.get('/diets', async (req, res) => {

    const infoApi = await getApiInfo() //--> traigo la info de la API
    
    //const infoApi = API;//--> viene en un  json
    const obj = infoApi
    console.log(obj)
    
    
    const types = infoApi.map(e => e.diets); // --> Mapeo la info
    //console.log(types);//--> a ver si mapea bien

    const arr= [];
    for(let i = 0; i < types.length; i++){  //--> guardo solo los tipos de dietas
        for(let j = 0; j<types[i].length; j++){
            arr.push(types[i][j]);
        }
    }
    const eachType = [... new Set(arr)]; //--> elimino repetidos
    console.log(eachType);

    
    eachType.forEach(e => {     //--> los guardo en el modelo (en mi db)
        Type.findOrCreate({
            where : {name: e}
        })
    })

    const allTypesDiets = await Type.findAll(); //--> los busco en mi db
    const _alltypesDiets = allTypesDiets.map(e => {return e.name})
    res.send(_alltypesDiets)
    console.log(_alltypesDiets);


      
})

router.post('/recipe', async (req, res) =>{
    let {
        title,
        resume,
        healthScore,
        instructions,
        typeDiets
    } = req.body

    //console.log(req.body)

    if(!title) res.json({message:"Debe ingresar un título."});
    if(!resume) res.json({message:"Debe ingresar un resumen"});

    let createRecipe = await Recipe.create ({
        title,
        resume,
        healthScore,
        instructions
    });
  //console.log(createRecipe)

    let typeDb = await Type.findAll({
        where: {name: typeDiets}
    });
    
    createRecipe.addType(typeDb)


    res.json({message:"¡Receta creada con éxito!"})
    //console.log(title)
})

router.get('/recipes/:id', async (req, res) =>{
    const {id} = req.params;
    //const infoApi = API; //-->json
    const infoApi = await getApiInfo();
    const infoDb = await getDbInfo();
    let allInfo = await [...infoApi,...infoDb];
    //console.log(allinfo)

    if(id){
        let foundRecipeById = allInfo.filter(e => e.id == id);
        foundRecipeById.length ?
        res.status(200).json(foundRecipeById) :
        res.status(404).json({message:"Receta no encontrada."})
        console.log(foundRecipeById)
    }


})




module.exports = router;
