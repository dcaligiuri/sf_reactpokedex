import React, { Component } from 'react';
//import classes from './App.css';
import axios from 'axios';
import PokemonType from './components/PokemonType/PokemonType';
import PokemonPhysical from './components/PokemonPhysical/PokemonPhysical';
import PokemonEvolution from './components/PokemonEvolution/PokemonEvolution';
import PokemonStats from './components/PokemonStats/PokemonStats';

class App extends Component {

  state  = {
    pokemonName: null,
    pokemonId: null,
    pokemonPaddedId: null,
    pokemonTypes: null,
    pokemonWeaknesses: null,
    pokemonHeight: null,
    pokemonWeight: null,
    pokemonAbilities: null
  };

  upperCaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  pokemonNumtoThreeDigits(strNum){
    let num = Number(strNum);
    let newStr = "" + num;
    let pad = "000";
    let ans = pad.substring(0, pad.length - newStr.length) + newStr;
    return ans;
  }


  nextPokemonHandler = (pokemonId) => {
    let nextPokemonId = pokemonId + 1;
    //next for Blacephalon is Bulbasaur
    if (pokemonId === 802){
      nextPokemonId = 1;
    }
    axios.get('https://pokeapi.co/api/v2/pokemon/' + nextPokemonId + '/')
      .then(res => {
        let pokemonName = this.upperCaseFirst(res.data.name);
        let pokemonId = res.data.id;
        let pokemonPaddedId = this.pokemonNumtoThreeDigits(pokemonId);
        this.setState({pokemonName: pokemonName});
        this.setState({pokemonId: pokemonId});
        this.setState({pokemonPaddedId: pokemonPaddedId});
        this.setState({pokemonTypes: res.data.types});
        this.setState({pokemonHeight: (res.data.height / 10.0)});
        this.setState({pokemonWeight: (res.data.weight / 10.0)});
        this.setState({pokemonAbilities: res.data.abilities});
        console.log(res.data);
      })
      .catch(error => console.log(error))
      /*.then(res => {
        for (let pokemonType of this.state.pokemonTypes) {
          let typeUrl = pokemonType.type.url;
          axios.get(typeUrl)
            .then(pokemonTypeRes => {
                let typeObjArr = pokemonTypeRes.data.damage_relations.double_damage_from;
                let newArr = [];
                for (let typeObj of typeObjArr){
                  newArr.push(typeObj.name);
                }
                console.log(newArr);
              //this.setState({pokemonWeaknesses: pokemonTypeRes.data.damage_relations.double_damage_from});
             // console.log(this.state.pokemonWeaknesses);
            })
            .catch(error => console.log(error))
        }
      })
      */
      
  }


  prevPokemonHandler = (pokemonId) => {
    let prevPokemonId = pokemonId - 1;
    //previous for Bulbasaur is Blacephalon
    if (pokemonId === 1){
      prevPokemonId = 802;
    }
    axios.get('https://pokeapi.co/api/v2/pokemon/' + prevPokemonId + '/')
      .then(res => {
        let pokemonName = this.upperCaseFirst(res.data.name);
        let pokemonId = res.data.id;
        let pokemonPaddedId = this.pokemonNumtoThreeDigits(pokemonId);
        this.setState({pokemonName: pokemonName});
        this.setState({pokemonId: pokemonId});
        this.setState({pokemonPaddedId: pokemonPaddedId});
        this.setState({pokemonTypes: res.data.types});
        this.setState({pokemonHeight: (res.data.height / 10.0)});
        this.setState({pokemonWeight: (res.data.weight / 10.0)});
        this.setState({pokemonAbilities: res.data.abilities});
      })
      .catch(error => console.log(error));
  }

  componentWillMount(){

    if (this.state.pokemonId === null){
      this.state.pokemonId = 1; 
    }

    axios.get('https://pokeapi.co/api/v2/pokemon/' + this.state.pokemonId + '/')
      .then(res => {
        let pokemonName = this.upperCaseFirst(res.data.name);
        let pokemonId = res.data.id;
        let pokemonPaddedId = this.pokemonNumtoThreeDigits(pokemonId);
        this.setState({pokemonName: pokemonName});
        this.setState({pokemonId: pokemonId});
        this.setState({pokemonPaddedId: pokemonPaddedId});
        this.setState({pokemonTypes: res.data.types});
        this.setState({pokemonHeight: (res.data.height / 10.0)});
        this.setState({pokemonWeight: (res.data.weight / 10.0)});
        this.setState({pokemonAbilities: res.data.abilities});
      })
      .catch(error => console.log(error));
  }


  render() {

    let pokemonProPic = this.state.pokemonPaddedId ? <img 
                          src={"https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + this.state.pokemonPaddedId + ".png"} 
                          alt="Bulbasaur" /> : null;
                          
    let pokemonName = this.state.pokemonName ? <h1>{this.state.pokemonName + " #" + this.state.pokemonPaddedId }</h1> : null;

    let pokemonTypes = this.state.pokemonTypes ? this.state.pokemonTypes.map((item) => 
          (<PokemonType type={item.type.name} key={item.type.name}>{item.type.name}</PokemonType>)) : null;

    let pokemonPhysical = this.state.pokemonHeight ? <PokemonPhysical 
                                                        height={this.state.pokemonHeight} 
                                                        weight={this.state.pokemonWeight}
                                                        abilities={this.state.pokemonAbilities}
                                                        /> : null;
    let pokemonEvolutions = this.state.pokemonId ? <PokemonEvolution pokemonId={this.state.pokemonId}/> : null;
    

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <button onClick={() => this.prevPokemonHandler(this.state.pokemonId)}>Previous Pokemon</button>
          {pokemonName}
          <button onClick={() => this.nextPokemonHandler(this.state.pokemonId)}>Next Pokemon</button>
        </div>
        {pokemonProPic}
        <h1>Types</h1>
        <ul> 
            {pokemonTypes}
        </ul>
        {pokemonPhysical}
        {pokemonEvolutions}
        <PokemonStats />
        
      </div>
    );
  }
}



export default App;
