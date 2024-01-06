import {getData} from "./scripts/data.js"
import {handleClick} from "./scripts/events.js"
import icon from './assets/crowd.png';
import './assets/styles.css';
import {SvgBarChart} from './scripts/grafGen.js'
import {filterData} from './scripts/filterData.js'
import state from './scripts/state.js'

const App = async ()=>{
    await getData();

    state.selectedIndex = "SV"

    filterData();

    const chart = new SvgBarChart(document.getElementById('chart_div'));
    chart.draw();
}

App();