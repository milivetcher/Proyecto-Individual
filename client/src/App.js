import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home.js';
import Landing_page from './components/landing_page.js';
//import { RecipeCreate } from './components/RecipeCreate';
import Detail from './components/Detail';
import Form from './components/formprueba';




function App() {
 
  return (
    
    
    <BrowserRouter>
   <div className='App'>
    <Switch>
      <Route exact path='/' component={Landing_page}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/recipe' component={Form}/>
      <Route  path='/home/:id' component={Detail}/>
    </Switch>
   </div>
    </BrowserRouter>
    

  );
}

export default App;
