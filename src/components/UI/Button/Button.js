import React, {Component} from 'react';
import classes from './Button.css'

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

        let idInButton = null;
        if (this.props.type === "prev"){
            idInButton = this.getPrevId(this.props.pokemonId)
        }
        else if (this.props.type === "next"){
            idInButton = this.getNextId(this.props.pokemonId)
        }


        return (
            <div>
                <button>{idInButton}</button>
            </div>
        )
    }
}

export default Button;