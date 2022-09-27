import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PaginaPrincipal from './components/pagina_principal';

import Inicio from './components/inicio.js';


function App() {

  return (
    
    
    <BrowserRouter>
    <Switch>
     <div className='App'>
    <Route exact path="/">
    
    <Inicio/>
    
    </Route>
    <Route exact path='/paginaprincipal' component={PaginaPrincipal}/>
    </div>
    </Switch>
    </BrowserRouter>
    

  );
}

export default App;
