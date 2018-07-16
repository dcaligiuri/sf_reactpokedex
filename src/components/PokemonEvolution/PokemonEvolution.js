import React, {Component} from 'react';
import classes from './PokemonEvolution.css';
import axios from 'axios';

class PokemonEvolution extends Component{

    state = {
        evolChain: null
    }

    getIdFromSpeciesUrl(str){
        var items = str.split("/");
        return items[items.length - 2 ];
    }

    modifyEvolChain(obj){
        //FURTHER ADDITIONS -> HANDLE EEVEE + HITMON STYLE MULTI EVOLUTIONS

        let evolObj = {};
        //push orig pokemon to array.
        let evolId = this.getIdFromSpeciesUrl(obj.chain.species.url);
        evolObj[evolId] = obj.chain.species.name;

        //if you evolve, push next pokemon to array.
        if (obj.chain.evolves_to.length > 0){
            let evolId2 = this.getIdFromSpeciesUrl(obj.chain.evolves_to[0].species.url);
            evolObj[evolId2] = obj.chain.evolves_to[0].species.name;
        }
        //if you never evolve, return array with orig pokemon
        else{
            return evolObj;
        }
        
        //add third evoled form
        if (obj.chain.evolves_to[0].evolves_to.length > 0){
            let evolId3 = this.getIdFromSpeciesUrl(obj.chain.evolves_to[0].evolves_to[0].species.url);
            evolObj[evolId3] = obj.chain.evolves_to[0].evolves_to[0].species.name;
        }
        console.log(evolObj);
        return evolObj;
    }

    componentWillReceiveProps(nextProps){
        if (this.props.pokemonId !== nextProps.pokemonId ){
            axios.get('https://pokeapi.co/api/v2/pokemon-species/' + nextProps.pokemonId + '/')
            .then(res => {
              axios.get(res.data.evolution_chain.url)
                  .then(evolRes => {
                    let evolObj = this.modifyEvolChain(evolRes.data);
                    this.setState({evolChain: evolObj});
                  })
                  .catch(error => console.log(error))
            })
            .catch(error => console.log(error))   
        }
    }


    /*
    for (let evoledPokemonName of evolArr){
                        //current img is cached
                        if (this.props.pokemonName !== evoledPokemonName){
                            axios.get('https://pokeapi.co/api/v2/pokemon/' + evoledPokemonName + '/')
                                .then(getSpriteRes => {
                                    console.log(getSpriteRes.data.sprites.front_default);
                                })
                                .catch(error => console.log(error))
                        }
                        
                    }
                    */


    

    componentDidMount(){
        axios.get('https://pokeapi.co/api/v2/pokemon-species/' + this.props.pokemonId + '/')
          .then(res => {
            axios.get(res.data.evolution_chain.url)
                .then(evolRes => {
                    let evolObj = this.modifyEvolChain(evolRes.data);
                    this.setState({evolObj: evolObj});
                })
                .catch(error => console.log(error))
          })
          .catch(error => console.log(error))   
    }
 
    render(){

        //map and return obj

        let evolChain = this.state.evolChain ? this.state.evolChain.values.map((el) => 
        (<p key={el}>{el}</p>)) : null;


        return (
           <div className={classes.Background}>
              {evolChain}
              <img src={this.props.pokemonSprite}/>
           </div>
        );
    }
}

export default PokemonEvolution;