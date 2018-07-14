import React, {Component} from 'react';
//import classes from './PokedexDescription.css';
//import axios from 'axios';
import PokemonDescription from '../../components/PokemonDescription/PokemonDescription';
import PokemonVersion from '../../components/PokemonVersion/PokemonVersion';

class PokedexDescription extends Component{


    state = {
        version: "ruby"
    }

    versionChangeHandler = (version) => {
        version !== this.state.version ? this.setState({version: version}) : null; 
    }

    render(){
        return (
            <div onChange={this.handleChange}>
                <PokemonDescription activeVersion={this.state.version} pokemonId={this.props.pokemonId}/>
                <PokemonVersion onChangeVersion={this.versionChangeHandler}/>
            </div>
        )
    }
}

export default PokedexDescription;