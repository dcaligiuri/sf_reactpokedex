import React, {Component} from 'react';
import { Bar } from 'react-chartjs-2';
import pokemonStatsArr from './../../csv/pokemonStats';

class PokemonStats extends Component{

    state = {
        chartData: {
            labels: [],
            datasets: [
                {
                    label: 'Stats',
                    data: [],
                    backgroundColor: [
                        'rgba(255,99,132,0.6)',
                        'rgba(54,162,235,0.6)',
                        'rgba(255,206,86,0.6)',
                        'rgba(75,192,192,0.6)',
                        'rgba(153,102,255,0.6)',
                        'rgba(255,159,64,0.6)',
                    ]
                }
            ]
        }
    }

    upperCaseStatHeaders(string) {
        
        if (string === 'hp'){
            return string.toUpperCase();
        }
        else if (string === 'special-attack'){
            return 'Special Attack';
        }
        else if (string === 'special-defense'){
            return 'Special Defense';
        }
        else 
            return string.charAt(0).toUpperCase() + string.slice(1);
      }


    componentWillReceiveProps(nextProps){
        if (nextProps.pokemonId){
            let statBases = [];
            const statNames = ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed']
            for (let pokemonStat of pokemonStatsArr){
                if (pokemonStat.pokemon_id == nextProps.pokemonId){
                    statBases.push(pokemonStat.base_stat);
                }
            }
        
            let updatedChartData = {
                ...this.state.chartData
            }
            updatedChartData.labels = statNames;
            updatedChartData.datasets[0].data = statBases;
            this.setState({chartData: updatedChartData});
        }
       
    }

    componentDidMount(){
        /*if (this.props.pokemonStats){
            const statNames = this.props.pokemonStats.map(el => this.upperCaseStatHeaders(el.stat.name) );
            const statBases = this.props.pokemonStats.map(el => el.base_stat);
            let updatedChartData = {
                ...this.state.chartData
            }
            updatedChartData.labels = statNames;
            updatedChartData.datasets[0].data = statBases;
            this.setState({chartData: updatedChartData});
        }*/


        if (this.props.pokemonId){
            let statBases = [];
            const statNames = ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed']
            for (let pokemonStat of pokemonStatsArr){
                if (pokemonStat.pokemon_id == this.props.pokemonId){
                    statBases.push(pokemonStat.base_stat);
                }
            }
        
            let updatedChartData = {
                ...this.state.chartData
            }
            updatedChartData.labels = statNames;
            updatedChartData.datasets[0].data = statBases;
            this.setState({chartData: updatedChartData});
        }
    }
    
    render(){

        return (
            <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', height: '300px'}}>
                <Bar 
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: true,
                            text:  "Stats",
                            fontSize: '12'
                        },
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    autoSkip: false
                                }
                            }]
                        },
                        maintainAspectRatio: false
                        
                        }
                    }
                />
            
            </div>
        )
            
            
    }
}

export default PokemonStats;