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
import Button from './components/UI/Button/Button';
import bulbasaur from './Bulbasaur';
import PokemonName from './components/PokemonEvolution/PokemonName/PokemonName';
import DesktopContainer from './containers/DesktopContainer/DesktopContainer';
import pokemonArr from './csv/pokemon';

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


  isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true;
    }
    else 
      return false; 
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

  upperCaseFirst(string) {
    if (string){
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
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

    const pokemonPaddedId = this.pokemonNumtoThreeDigits(nextPokemonId);
    const pokemonName = pokemonArr[nextPokemonId - 1][1];
    
    const height = Number(pokemonArr[nextPokemonId - 1][3]) / 10.0;
    const weight = Number(pokemonArr[nextPokemonId - 1][4]) / 10.0;

    this.setState({pokemonId: nextPokemonId});
    this.setState({pokemonName: pokemonName});
    this.setState({pokemonPaddedId: pokemonPaddedId});

    this.setState({loading: false});
  }


  prevPokemonHandler = (pokemonId) => {
    this.setState({loading: true});
    let prevPokemonId = pokemonId - 1;
    //previous for Bulbasaur is Blacephalon
    if (pokemonId === 1){
      prevPokemonId = 802;
    }

    const pokemonPaddedId = this.pokemonNumtoThreeDigits(prevPokemonId);
    const pokemonName = pokemonArr[prevPokemonId - 1][1];
    
    const height = Number(pokemonArr[prevPokemonId - 1][3]) / 10.0;
    const weight = Number(pokemonArr[prevPokemonId - 1][4]) / 10.0;

    this.setState({pokemonId: prevPokemonId});
    this.setState({pokemonName: pokemonName});
    this.setState({pokemonPaddedId: pokemonPaddedId});

    this.setState({loading: false});

  }


  componentWillMount(){
    
    const pokemonPaddedId = this.pokemonNumtoThreeDigits(this.state.pokemonId);
    const pokemonName = pokemonArr[this.state.pokemonId - 1][1];
    
    const height = Number(pokemonArr[this.state.pokemonId - 1][3]) / 10.0;
    const weight = Number(pokemonArr[this.state.pokemonId - 1][4]) / 10.0;

    this.setState({pokemonName: pokemonName});
    this.setState({pokemonPaddedId: pokemonPaddedId});
    this.setState({pokemonHeight: height});
    this.setState({pokemonWeight: weight});
    console.log(this.state.height);
    //this.setState({pokemonAbilities: res.data.abilities});
    this.setState({loading: false});

    
      
  }


  render() {    
     
    const isMobile = this.isMobile();

    let pokemonName = this.state.pokemonName ? <h2 style={{textAlign: 'center'}}>{this.upperCaseFirst(this.state.pokemonName) + " #" + this.state.pokemonPaddedId }</h2> : null;


    if (isMobile) {
      return (
        <div>
          <header>
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
          {pokemonName}
        </header>
        
        <PokemonProPic 
          loading={this.state.loading} 
          pokemonPaddedId={this.state.pokemonPaddedId} 
          pokemonName={this.state.pokemonName}/>
        <PokemonStats 
          pokemonName={this.upperCaseFirst(this.state.pokemonName)} 
          pokemonId={this.state.pokemonId} />
        <PokedexDescription 
          pokemonId={this.state.pokemonId}/> 
        <PokemonPhysical 
          height={this.state.pokemonHeight} 
          weight={this.state.pokemonWeight}
          abilities={this.state.pokemonAbilities}/>
        <TypeContainer 
          loading={this.state.loading} 
          pokemonId={this.state.pokemonId}
          pokemonTypes={this.state.pokemonTypes}/>
        <PokemonEvolution 
          pokemonSprite={this.state.pokemonSprite} 
          pokemonName={this.state.pokemonName}
          pokemonId={this.state.pokemonId}/>      
      </div>
      );
    } else {
      return (
        <div>
          <DesktopContainer />
        </div>
      );
    }




  }
}



export default App;
