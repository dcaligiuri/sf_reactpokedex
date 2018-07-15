import React, { Component } from 'react';
import axios from 'axios';
import PokemonPhysical from './components/PokemonPhysical/PokemonPhysical';
import PokemonEvolution from './components/PokemonEvolution/PokemonEvolution';
import PokemonStats from './components/PokemonStats/PokemonStats';
import PokedexDescription from './containers/PokedexDescription/PokedexDescription';
import PokemonGenders from './components/PokemonGenders/PokemonGenders';
import TypeContainer from './containers/TypeContainer/TypeContainer';
import PokemonProPic from './components/PokemonProPic/PokemonProPic';

class App extends Component {

  state  = {
    pokemonName: null,
    pokemonId: 1,
    pokemonPaddedId: null,
    pokemonTypes: null,
    pokemonWeaknesses: null,
    pokemonHeight: null,
    pokemonWeight: null,
    pokemonAbilities: null,
    pokemonStats: null
  };

  upperCaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getPrevId(currPokeId){
    if (currPokeId === 1)
      return "#" + this.pokemonNumtoThreeDigits("802");
    else 
      return "#" + this.pokemonNumtoThreeDigits(--currPokeId);
  }

  getNextId(currPokeId) {
    if (currPokeId === 802)
      return "#" + this.pokemonNumtoThreeDigits("1");
    else
      return "#" + this.pokemonNumtoThreeDigits(++currPokeId); 
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
        let pokemonId = res.data.id;
        let pokemonPaddedId = this.pokemonNumtoThreeDigits(pokemonId);
        this.setState({pokemonName: res.data.name});
        this.setState({pokemonId: pokemonId});
        this.setState({pokemonPaddedId: pokemonPaddedId});
        this.setState({pokemonTypes: res.data.types});
        this.setState({pokemonHeight: (res.data.height / 10.0)});
        this.setState({pokemonWeight: (res.data.weight / 10.0)});
        this.setState({pokemonAbilities: res.data.abilities});
        this.setState({pokemonStats: res.data.stats});
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
        let pokemonId = res.data.id;
        let pokemonPaddedId = this.pokemonNumtoThreeDigits(pokemonId);
        this.setState({pokemonName: res.data.name});
        this.setState({pokemonId: pokemonId});
        this.setState({pokemonPaddedId: pokemonPaddedId});
        this.setState({pokemonTypes: res.data.types});
        this.setState({pokemonHeight: (res.data.height / 10.0)});
        this.setState({pokemonWeight: (res.data.weight / 10.0)});
        this.setState({pokemonAbilities: res.data.abilities});
        this.setState({pokemonStats: res.data.stats});
      })
      .catch(error => console.log(error));
  }

  componentWillMount(){


    axios.get('https://pokeapi.co/api/v2/pokemon/' + this.state.pokemonId + '/')
      .then(res => {
        let pokemonId = res.data.id;
        let pokemonPaddedId = this.pokemonNumtoThreeDigits(pokemonId);
        this.setState({pokemonName: res.data.name});
        this.setState({pokemonId: pokemonId});
        this.setState({pokemonPaddedId: pokemonPaddedId});
        this.setState({pokemonTypes: res.data.types});
        this.setState({pokemonHeight: (res.data.height / 10.0)});
        this.setState({pokemonWeight: (res.data.weight / 10.0)});
        this.setState({pokemonAbilities: res.data.abilities});
        this.setState({pokemonStats: res.data.stats});
      })
      .catch(error => console.log(error));
  }


  render() {     
    let pokemonName = this.state.pokemonName ? <h2 style={{textAlign: 'center'}}>{this.upperCaseFirst(this.state.pokemonName) + " #" + this.state.pokemonPaddedId }</h2> : null;

    let pokemonStats = this.state.pokemonStats ? <PokemonStats pokemonName={this.upperCaseFirst(this.state.pokemonName)} pokemonId={this.state.pokemonId} pokemonStats={this.state.pokemonStats}/> : null;

    return (
      <div className="App">
        <header className="App-Header">
          <button onClick={() => this.prevPokemonHandler(this.state.pokemonId)}>{this.getPrevId(this.state.pokemonId)}</button>
          <button onClick={() => this.nextPokemonHandler(this.state.pokemonId)}>{this.getNextId(this.state.pokemonId)}</button>
          {pokemonName}
        </header>
        
        <PokemonProPic pokemonPaddedId={this.state.pokemonPaddedId} pokemonName={this.state.pokemonName}/>
        {pokemonStats}
        <PokedexDescription pokemonId={this.state.pokemonId}/> 
        <PokemonPhysical 
          height={this.state.pokemonHeight} 
          weight={this.state.pokemonWeight}
          abilities={this.state.pokemonAbilities}/>
        <TypeContainer pokemonTypes={this.state.pokemonTypes}/>
        <PokemonEvolution pokemonId={this.state.pokemonId}/>
        {/*}
       
        <PokemonGenders pokemonName={this.state.pokemonName}/>
        
    {*/}
        
      </div>
    );
  }
}



export default App;
