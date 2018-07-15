import React, {Component} from 'react';
import PokemonType from '../../components/PokemonType/PokemonType';

class TypeContainer extends Component{

   
    render(){
        let pokemonTypes = this.props.pokemonTypes ? this.props.pokemonTypes.map((item) => 
        (<PokemonType type={item.type.name} key={item.type.name}>{item.type.name}</PokemonType>)) : null;

        return (
            <div>
                <h1>Types</h1>
                {pokemonTypes}
            </div>
        )
    }
}

export default TypeContainer;