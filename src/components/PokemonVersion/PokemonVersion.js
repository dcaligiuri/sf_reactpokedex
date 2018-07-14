import React, {Component} from 'react';
import classes from './PokemonVersion.css';
import axios from 'axios';
import PokeBallIcon from './PokeballIcon/PokeballIcon';

class PokemonVersion extends Component{

   
    render(){

        return (
           <div>
              Versions:
              <PokeBallIcon fill='#dd2d51'/>
              <PokeBallIcon fill='#0072b0'/>
           </div>
        );
    }

}

export default PokemonVersion;