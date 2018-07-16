import React, {Component} from 'react';
import classes from './PokemonEvolution.css';
import axios from 'axios';

class PokemonEvolution extends Component{

    state = {
        evolChain: null
    }

    modifyEvolChain(obj){
        let evolArray = [];
        evolArray.push(obj.chain.species.name);
        if (obj.chain.evolves_to.length > 0){
            evolArray.push(obj.chain.evolves_to[0].species.name);
        }
        if (obj.chain.evolves_to[0].evolves_to.length > 0){
            evolArray.push(obj.chain.evolves_to[0].evolves_to[0].species.name);
        }
        return evolArray;
    }

    componentWillReceiveProps(nextProps){
        if (this.props.pokemonId !== nextProps.pokemonId ){
            axios.get('https://pokeapi.co/api/v2/pokemon-species/' + nextProps.pokemonId + '/')
            .then(res => {
              axios.get(res.data.evolution_chain.url)
                  .then(evolRes => {
                      let evolArr = this.modifyEvolChain(evolRes.data);
                      this.setState({evolChain: evolArr});
                  })
                  .catch(error => console.log(error))
            })
            .catch(error => console.log(error))   
        }
    }

    componentDidMount(){
        axios.get('https://pokeapi.co/api/v2/pokemon-species/' + this.props.pokemonId + '/')
          .then(res => {
            axios.get(res.data.evolution_chain.url)
                .then(evolRes => {
                    let evolArr = this.modifyEvolChain(evolRes.data);
                    console.log(evolArr);
                    this.setState({evolChain: evolArr});
                })
                .catch(error => console.log(error))
          })
          .catch(error => console.log(error))   
    }
 
    render(){
        let evolChain = this.state.evolChain ? this.state.evolChain.map((el) => 
        (<span key={el}>{el}</span>)) : null;

        return (
           <div className={classes.Background}>
              {evolChain}
           </div>
        );
    }
}

export default PokemonEvolution;