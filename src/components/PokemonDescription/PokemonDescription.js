import React, {Component} from 'react';
import axios from 'axios';
import classes from './PokemonDescription.css';

class PokemonDescription extends Component{

    state  = {
        description: null
    };

    componentWillReceiveProps(nextProps){
        if (this.props.pokemonId !== nextProps.pokemonId || this.props.activeVersion !== nextProps.activeVersion){
            axios.get('https://pokeapi.co/api/v2/pokemon-species/' + nextProps.pokemonId + '/')
                .then(res => {
                    //later add des switch from saph + ruby
                    this.setState({description: res.data.flavor_text_entries[1].flavor_text});
                })
                .catch(error => console.log(error));
        }
    }

    componentWillMount(){
        axios.get('https://pokeapi.co/api/v2/pokemon-species/' + this.props.pokemonId + '/')
            .then(res => {
                //console.log(res.data.flavor_text_entries);
                this.setState({description: res.data.flavor_text_entries[1].flavor_text});
            })
            .catch(error => console.log(error));
    }

    render(){
        return (
           <div className={classes.PokemonDes}>
              <p>{this.state.description}</p>
              {this.props.activeVersion}
           </div>
        );
    }

}

export default PokemonDescription;