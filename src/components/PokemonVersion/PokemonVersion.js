import React, {Component} from 'react';
//import classes from './PokemonVersion.css';
//import axios from 'axios';
import PokeBallIcon from './PokeballIcon/PokeballIcon';

class PokemonVersion extends Component{


    VersionChangeHandler = event => {
        this.props.onChangeVersion(event);   
    }

    render(){

        return (
           <div style={{float: 'left'}}>
              Versions:
              <a onClick={() => this.VersionChangeHandler("ruby")} ><PokeBallIcon fill='#dd2d51'/></a>
              <a onClick={() => this.VersionChangeHandler("saph")} ><PokeBallIcon fill='#0072b0'/></a>
           </div>
        );
    }

}



export default PokemonVersion;