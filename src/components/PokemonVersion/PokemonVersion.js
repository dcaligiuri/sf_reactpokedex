import React, {Component} from 'react';
import classes from './PokemonVersion.css';
//import axios from 'axios';
import PokeBallIcon from './PokeballIcon/PokeballIcon';

class PokemonVersion extends Component{


    VersionChangeHandler = event => {
        this.props.onChangeVersion(event);   
    }

    render(){

        return (
           <div>
              <h4>Versions:</h4>
                <a style={{float: 'left'}} onClick={() => this.VersionChangeHandler("omega-ruby")} ><PokeBallIcon fill='#dd2d51'/></a>
                <a style={{float: 'left'}} onClick={() => this.VersionChangeHandler("alpha-sapphire")} ><PokeBallIcon fill='#0072b0'/></a>
           </div>
        );
    }

}



export default PokemonVersion;