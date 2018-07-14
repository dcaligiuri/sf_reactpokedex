import React, {Component} from 'react';
import classes from './PokemonDescription.css';
import axios from 'axios';

class PokemonDescription extends Component{

    state  = {
        description: null
    };

    componentWillReceiveProps(nextProps){
        if (this.props.pokemonId !== nextProps.pokemonId){
            axios.get('https://pokeapi.co/api/v2/pokemon-species/' + nextProps.pokemonId + '/')
                .then(res => {
                    this.setState({description: res.data.flavor_text_entries[1].flavor_text});
                })
                .catch(error => console.log(error));
        }
    }

    componentWillMount(){
        axios.get('https://pokeapi.co/api/v2/pokemon-species/' + this.props.pokemonId + '/')
            .then(res => {
                this.setState({description: res.data.flavor_text_entries[1].flavor_text});
            })
            .catch(error => console.log(error));
    }

    render(){

        this.state.description ? this.state.description : null;

        return (
           <div>
              {this.state.description}
           </div>
        );
    }

}

export default PokemonDescription;