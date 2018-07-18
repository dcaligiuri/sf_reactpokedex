import React, {Component} from 'react';
import classes from './Button.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Aux from './../../../hoc/Auxiliary/Aux';

class Button extends Component{
    
    pokemonNumtoThreeDigits(strNum){
        let num = Number(strNum);
        let newStr = "" + num;
        let pad = "000";
        let ans = pad.substring(0, pad.length - newStr.length) + newStr;
        return ans;
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

    render(){
        console.log("BTN");
        let btn = null;
        if (this.props.type === "prev"){
            btn = <button 
                className={classes.Btn} 
                onClick={() => this.prevPokemonHandler(this.state.pokemonId)}>
                <h3 className={classes.BtnLeft}>
                    {this.getPrevId(this.props.pokemonId)}
                </h3>
                <h3 className={classes.Chevron} style={{float: 'left'}}><FontAwesomeIcon icon={faChevronCircleLeft} /></h3>
          </button>
        }
        else if (this.props.type === "next"){
            btn = <button 
                className={classes.Btn} 
                onClick={() => this.nextPokemonHandler(this.state.pokemonId)}>
                <h3 className={classes.BtnRight}>
                    {this.getNextId(this.props.pokemonId)}
                </h3>
                <h3 className={classes.Chevron} style={{float: 'right'}}><FontAwesomeIcon icon={faChevronCircleRight} /></h3>
          </button>
        }

        return (
            <Aux>
                {btn}
            </Aux>
        )
    }
}

export default Button;