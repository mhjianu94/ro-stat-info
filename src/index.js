import {getData} from "./scripts/data.js"
import {handleClick} from "./scripts/events.js"
import icon from './assets/crowd.png';
import './assets/styles.css';
import {SvgBarChart} from './scripts/barChartController.js'
import {BubbleChart} from './scripts/bubbleChartController.js'
import {filterData} from './scripts/filterData.js'
import state from './scripts/state.js'

const App = async ()=>{

    await getData();
    filterData();

    document.getElementById("selected_filters").innerText = `Filtre: ${state.selectedIndex} - ${state.selectedCountries}`

    const barChart = new SvgBarChart(document.getElementById('chart_div'));

    barChart.draw();
}

App();