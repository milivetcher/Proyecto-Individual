import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import './styles/Form.css';


const useForm = (initialForm, validateForm)=>{
    const [form, setForm]= useState(initialForm);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
   
    useEffect(()=> {
        dispatch(getTypes());
  
    },[])


    //-----//

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };
    const handleBlur = (e) =>{
       handleChange(e);
       setErrors(validateForm(form))

    };
    function handleSelect(e){
        setForm({
            ...form,
            typeDiets: [...form.typeDiets, e.target.value]
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
       //console.log(form);
       
        if(Object.keys(errors).length){
         console.log(errors)
         validateForm(form); 
         return -1
        } 
        
        dispatch(postRecipe(form));
        alert("¡Receta creada con éxito!");
        setForm({
            title: "",
            resume: "",
            healthScore: "",
            instructions: "",
            typeDiets: []
        })
        history.push('/home')
    };
    function handleDelete(el){
        setForm({
            ...form,
            typeDiets: form.typeDiets.filter(d=> d!= el)
        })
    }
    
    return{
        form, errors, handleBlur, handleChange, handleSubmit, handleSelect, handleDelete
    };

}

const initialForm ={
    title:"",
    resume:"",
    healthScore:"",
    instructions:"",
    typeDiets:[]
};

const validationsForm =(form)=>{
    let errors = {};

    if(!form.title.trim()){
        errors.title='El campo "Titulo" es obligatorio.'
    }
    if(!form.resume.trim()){
        errors.resume = 'El campo "Resumen" es obligatorio' 
    }
    
    if(form.healthScore>100 || form.healthScore<0){
        errors.healthScore ='La puntuacion debe ser del 1 al 100'
    }

    return errors;
}

const Form=()=>{

    const {form, errors, handleBlur, handleChange, handleSubmit, handleSelect, handleDelete}= useForm(initialForm, validationsForm)  
    const typeDiets = useSelector((state)=> state.typeDiets);

  return(
    <div className="wallpaper_">
 
    <div className="contenedora">
    <div className="formulario">
    <h1>¡Crea tu receta!</h1>
    <p>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input 
            type="text"
            name="title"
            placeholder="Escriba el titulo de su receta..."
            onBlur={(e)=>handleBlur(e)}
            onChange={(e)=>handleChange(e)}
            value={form.title}
            /><br/>
            {errors.title && <a>{errors.title}</a>}
            <a><br/>
            <input
                type="text"
                name="resume"
                placeholder="Escriba un resumen..."
                onBlur={(e)=>handleBlur(e)}
                onChange={(e)=>handleChange(e)}
                value={form.resume}
            /><br/>
            {errors.resume && <a>{errors.resume}</a>}
            </a><br/>
            <a>
            <input
                type="number"
                name="healthScore"
                placeholder="Health Score..."
                onBlur={(e)=>handleBlur(e)}
                onChange={(e)=>handleChange(e)}
                value={form.healthScore}
            /><br/>
            {errors.healthScore && <a>{errors.healthScore}</a>}
            </a><br/>
            <textarea
                name="instructions"
                type="text"
                placeholder="Escriba el paso a paso de su receta..."
                onBlur={(e)=>handleBlur(e)}
                onChange={(e)=>handleChange(e)}
                value={form.instructions}
            /><br/>
            <select onChange={(e)=>handleSelect(e)}>
                    {typeDiets.map((t)=>(
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select><br/>
            <button type="submit" value="crear" className="button-crear">Crear</button>

        </form>
        {form.typeDiets.map(el=>
               <div key={el+"x"}>
               <a>{el}</a>
               <button className="botonx" onClick={()=> handleDelete(el)}>X</button>
               </div>
            )}
        </p>
    
    </div>
    </div>
    </div>
  )
    

}

export default Form;