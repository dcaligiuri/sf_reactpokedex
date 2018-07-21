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
import Button from './components/UI/Button/Button';
import PokemonName from './components/PokemonEvolution/PokemonName/PokemonName';
import pokemonArr from './csv/pokemon';
import pokemonSpeciesArr from './csv/pokemonSpecies';
import { Grid, Row, Col } from 'react-bootstrap';

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
    pokemonGenderRate: null,
    nextPokemonName: null,
    prevPokemonName: null,
    loading: true
  };


  isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true;
    }
    else 
      return false; 
  }


  getPrevIdNumber(currPokeId){
    if (currPokeId === 1)
      return 802;
    else 
      return --currPokeId;
  }


  getNextIdNumber(currPokeId){
    if (currPokeId === 802)
      return 1;
    else
      return ++currPokeId;
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

  getGenderRate(pokemonId){
    for (let pokemon of pokemonSpeciesArr){
      if (pokemon[0] == pokemonId){
        return pokemon[8];
      }
    }
  }

  nextPokemonHandler = (pokemonId) => {
    this.setState({loading: true});
    let nextPokemonId = pokemonId + 1;
    //next for Blacephalon is Bulbasaur
    if (pokemonId === 802){
      nextPokemonId = 1;
  }

    const pokemonPaddedId = this.pokemonNumtoThreeDigits(nextPokemonId);
    const pokemonName = pokemonArr[nextPokemonId - 1].identifier;
    const pokemonHeight = Number(pokemonArr[nextPokemonId - 1].height) / 10.0;
    const pokemonWeight = Number(pokemonArr[nextPokemonId - 1].weight) / 10.0;
    const pokemonGenderRate = this.getGenderRate(nextPokemonId);


    const newPrevPokemonId = this.getPrevIdNumber(nextPokemonId);
    const newNextPokemonId = this.getNextIdNumber(nextPokemonId);
    const newPrevPokemonName = pokemonArr[newPrevPokemonId - 1].identifier;
    const newNextPokemonName = pokemonArr[newNextPokemonId - 1].identifier;


    this.setState({pokemonId: nextPokemonId});
    this.setState({pokemonName: pokemonName});
    this.setState({pokemonPaddedId: pokemonPaddedId});
    this.setState({pokemonHeight: pokemonHeight});
    this.setState({pokemonWeight: pokemonWeight});
    this.setState({pokemonGenderRate: pokemonGenderRate});
    this.setState({nextPokemonName: newNextPokemonName});
    this.setState({prevPokemonName: newPrevPokemonName});
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
    const pokemonName = pokemonArr[prevPokemonId - 1].identifier;
    const pokemonHeight = Number(pokemonArr[prevPokemonId - 1].height) / 10.0;
    const pokemonWeight = Number(pokemonArr[prevPokemonId - 1].weight) / 10.0;
    const pokemonGenderRate = this.getGenderRate(prevPokemonId);

    const newPrevPokemonId = this.getPrevIdNumber(prevPokemonId);
    const newNextPokemonId = this.getNextIdNumber(prevPokemonId);
    const newPrevPokemonName = pokemonArr[newPrevPokemonId - 1].identifier;
    const newNextPokemonName = pokemonArr[newNextPokemonId - 1].identifier;

  
    this.setState({pokemonId: prevPokemonId});
    this.setState({pokemonName: pokemonName});
    this.setState({pokemonPaddedId: pokemonPaddedId});
    this.setState({pokemonHeight: pokemonHeight});
    this.setState({pokemonWeight: pokemonWeight});
    this.setState({pokemonGenderRate: pokemonGenderRate});
    this.setState({nextPokemonName: newNextPokemonName});
    this.setState({prevPokemonName: newPrevPokemonName});
    this.setState({loading: false});

  }


  componentWillMount(){

    const pokemonPaddedId = this.pokemonNumtoThreeDigits(this.state.pokemonId);
    const pokemonName = pokemonArr[this.state.pokemonId - 1].identifier;
    const pokemonHeight = Number(pokemonArr[this.state.pokemonId - 1].height) / 10.0;
    const pokemonWeight = Number(pokemonArr[this.state.pokemonId - 1].weight) / 10.0;
    const pokemonGenderRate = this.getGenderRate(this.state.pokemonId);
    const nextPokemonId = this.getNextIdNumber(this.state.pokemonId);
    const prevPokemonId = this.getPrevIdNumber(this.state.pokemonId);
    const nextPokemonName = pokemonArr[nextPokemonId - 1].identifier;
    const prevPokemonName = pokemonArr[prevPokemonId - 1].identifier;

    
    this.setState({pokemonName: pokemonName});
    this.setState({pokemonPaddedId: pokemonPaddedId});
    this.setState({pokemonHeight: pokemonHeight});
    this.setState({pokemonWeight: pokemonWeight});
    this.setState({pokemonGenderRate: pokemonGenderRate});
    this.setState({nextPokemonName: nextPokemonName});
    this.setState({prevPokemonName: prevPokemonName});


    //this.setState({pokemonAbilities: res.data.abilities});
    
    this.setState({loading: false});

    
      
  }


  render() {    
     
    const isMobile = this.isMobile();

    let pokemonName = this.state.pokemonName ? <h2 className={classes.PokemonName}>{this.upperCaseFirst(this.state.pokemonName) + " #" + this.state.pokemonPaddedId }</h2> : null;


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
          isMobile={isMobile}
          pokemonId={this.state.pokemonId}/> 
        {this.state.pokemonId ? <PokemonPhysical 
          height={this.state.pokemonHeight} 
          weight={this.state.pokemonWeight}
          genderRate={this.state.pokemonGenderRate}
          pokemonId={this.state.pokemonId}/> : null}
        <TypeContainer 
          render="Types"
          loading={this.state.loading} 
          pokemonId={this.state.pokemonId}
          pokemonTypes={this.state.pokemonTypes}/>
        <TypeContainer 
          render="Weak Against"
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

          
         <Grid>
            <Row className="show-grid">
              <Col lg={8} lgOffset={2}>
            <button 
              className={classes.Btn} 
              onClick={() => this.prevPokemonHandler(this.state.pokemonId)}>
            <h3 className={classes.BtnLeft}>
              {this.getPrevId(this.state.pokemonId)}
              {' '}
              <b>{this.upperCaseFirst(this.state.prevPokemonName)}</b>
            </h3>
            <h3 className={classes.Chevron} style={{float: 'left'}}><FontAwesomeIcon icon={faChevronCircleLeft} /></h3>
            </button>


            <button 
              className={classes.Btn} 
              onClick={() => this.nextPokemonHandler(this.state.pokemonId)}>
            <h3 className={classes.BtnRight}>
              <b>{this.upperCaseFirst(this.state.nextPokemonName)}</b>
              {' '}
              {this.getNextId(this.state.pokemonId)}
            </h3>
            <h3 className={classes.Chevron} style={{float: 'right'}}><FontAwesomeIcon icon={faChevronCircleRight} /></h3>
          </button>
              </Col>
          </Row>
          <Row className="show-grid">
            <Col lg={8} lgOffset={2}>
                
            {pokemonName}
            
            </Col>
          </Row>
           <Row className="show-grid">
            <Col lg={4} lgOffset={2}>
            <PokemonProPic 
            style={{width: '50%'}}
          loading={this.state.loading} 
          pokemonPaddedId={this.state.pokemonPaddedId} 
          pokemonName={this.state.pokemonName}/>
          <PokemonStats 
          pokemonName={this.upperCaseFirst(this.state.pokemonName)} 
          pokemonId={this.state.pokemonId} />
            </Col>
            <Col lg={4}>
            <PokedexDescription 
          pokemonId={this.state.pokemonId}/> 
            {this.state.pokemonId ? <PokemonPhysical 
          height={this.state.pokemonHeight} 
          weight={this.state.pokemonWeight}
          genderRate={this.state.pokemonGenderRate}
          pokemonId={this.state.pokemonId}/> : null}
          <TypeContainer 
            loading={this.state.loading} 
            pokemonId={this.state.pokemonId}
            pokemonTypes={this.state.pokemonTypes}
            render="Types"/>
           <TypeContainer 
            loading={this.state.loading} 
            pokemonId={this.state.pokemonId}
            pokemonTypes={this.state.pokemonTypes}
            render="Weak Against"/>
          </Col>
          </Row>
          <Row className="show-grid">
            <Col lg={8} lgOffset={2}>
            <PokemonEvolution 
          pokemonSprite={this.state.pokemonSprite} 
          pokemonName={this.state.pokemonName}
          pokemonId={this.state.pokemonId}/>
            </Col>
          </Row>
        </Grid>
       
        </div>
      );
    }




  }
}



export default App;
