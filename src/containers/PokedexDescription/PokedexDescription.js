import React, {Component} from 'react';
//import classes from './PokedexDescription.css';
//import axios from 'axios';
import PokemonDescription from '../../components/PokemonDescription/PokemonDescription';
import PokemonVersion from '../../components/PokemonVersion/PokemonVersion';

class PokedexDescription extends Component{


    state = {
        version: 'omega-ruby'
    }


    versionChangeHandler = (version) => {
        if (version !== this.state.version){
            this.setState({version: version});
            return;
        }
        else 
            return; 
    }

    render(){
        return (
            <div onChange={this.handleChange}>
                <PokemonDescription pokemonId={this.props.pokemonId}/>
            </div>
        )
    }
}

export default PokedexDescription;