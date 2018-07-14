import React, {Component} from 'react';
//import classes from './PokemonGenders.css';
import axios from 'axios';

class PokemonGenders extends Component{


    state = {
        anyFemales: null,
        anyMales: null,
        anyGenderless: null
    }

    componentWillMount(){
        console.log(this.props.pokemonName);
        if (localStorage.getItem("ALL_POKEMON_GENDERS")){
            const genders = localStorage.getItem("ALL_POKEMON_GENDERS");
            const gendersJSON = JSON.parse(genders);
            console.log(this.props.pokemonName);
            //const pokemon = gendersJSON.find(el => el.pokemon_species.name === this.props.pokemonName)
            //console.log(pokemon);
        }
        else {
            axios.get('https://pokeapi.co/api/v2/gender/1/')
            .then(res => {
              localStorage.setItem("ALL_POKEMON_GENDERS", JSON.stringify(res.data.pokemon_species_details));
            })
        }
    }


 
    render(){
        this.state.anyFemales ? this.state.anyFemales : null;
            return (
               <div>
                  {this.state.anyFemales}
               </div>
            );
    }
}

export default PokemonGenders;