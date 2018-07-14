import React, {Component} from 'react';
import classes from './PokedexDescription.css';
import axios from 'axios';
import PokemonDescription from '../../components/PokemonDescription/PokemonDescription';
import PokemonVersion from '../../components/PokemonVersion/PokemonVersion';

class PokedexDescription extends Component{

   
    render(){
        return (
            <div>
                <PokemonDescription pokemonId={this.props.pokemonId}/>
                <PokemonVersion />
            </div>
        )
    }
}

export default PokedexDescription;