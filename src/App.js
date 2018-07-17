import React, { Component } from 'react';
import axios from 'axios';
import PokemonPhysical from './components/PokemonPhysical/PokemonPhysical';
import PokemonEvolution from './components/PokemonEvolution/PokemonEvolution';
import PokemonStats from './components/PokemonStats/PokemonStats';
import PokedexDescription from './containers/PokedexDescription/PokedexDescription';
//import PokemonGenders from './components/PokemonGenders/PokemonGenders';
import TypeContainer from './containers/TypeContainer/TypeContainer';
import PokemonProPic from './components/PokemonProPic/PokemonProPic';
import classes from './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import PokemonVersion from './components/PokemonVersion/PokemonVersion';

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
    pokemonStats: null,
    pokemonSprite: null,
    loading: true
  };

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
    this.setState({loading: true});
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
        this.setState({pokemonSprite: res.data.sprites.front_default});
        this.setState({loading: false});
      })
      .catch(error => console.log(error))
  }


  prevPokemonHandler = (pokemonId) => {
    this.setState({loading: true});
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
        this.setState({pokemonSprite: res.data.sprites.front_default});
        this.setState({loading: false});
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
        this.setState({pokemonSprite: res.data.sprites.front_default});
        this.setState({loading: false});
      })
      .catch(error => {
          console.log(error);
      });
  }


  render() {     
    let pokemonName = this.state.pokemonName ? <h2 style={{textAlign: 'center'}}>{this.upperCaseFirst(this.state.pokemonName) + " #" + this.state.pokemonPaddedId }</h2> : null;

    let pokemonStats = this.state.pokemonStats ? <PokemonStats pokemonName={this.upperCaseFirst(this.state.pokemonName)} pokemonId={this.state.pokemonId} pokemonStats={this.state.pokemonStats}/> : null;

    return (
      <div className="App">
        <header className="App-Header">
          <button 
            className={classes.Btn} 
            onClick={() => this.prevPokemonHandler(this.state.pokemonId)}>
            <h3 className={classes.BtnLeft}>
              {this.getPrevId(this.state.pokemonId)}
            </h3>
            <h3 className={classes.Chevron} style={{float: 'left'}}><FontAwesomeIcon icon={faChevronCircleLeft} /></h3>
          </button>
          <button 
            className={classes.Btn} 
            onClick={() => this.nextPokemonHandler(this.state.pokemonId)}>
            <h3 className={classes.BtnRight}>
              {this.getNextId(this.state.pokemonId)}
            </h3>
            <h3 className={classes.Chevron} style={{float: 'right'}}><FontAwesomeIcon icon={faChevronCircleRight} /></h3>
          </button>

          {/*}
          <Button type="prev" pokemonId={this.state.pokemonId}/>
          <Button type="next" pokemonId={this.state.pokemonId}/>
          {*/}

          {pokemonName}
        </header>
        
        <PokemonProPic 
          loading={this.state.loading} 
          pokemonPaddedId={this.state.pokemonPaddedId} 
          pokemonName={this.state.pokemonName}/>
        {pokemonStats}
        <PokedexDescription 
          pokemonId={this.state.pokemonId}/> 
        <PokemonPhysical 
          height={this.state.pokemonHeight} 
          weight={this.state.pokemonWeight}
          abilities={this.state.pokemonAbilities}/>
        <TypeContainer 
          loading={this.state.loading} 
          pokemonTypes={this.state.pokemonTypes}/>
        <PokemonEvolution 
          pokemonSprite={this.state.pokemonSprite} 
          pokemonName={this.state.pokemonName}
          pokemonId={this.state.pokemonId}/>
        {/*}
          <PokemonGenders pokemonName={this.state.pokemonName}/>
        {*/}
        
      </div>
    );
  }
}



export default App;
