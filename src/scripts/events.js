import state from '../scripts/state.js'
import {SvgBarChart} from './grafGen.js'
import {filterData} from './filterData.js'
function handleClick(event) {
    state.selectedCountries = event.target.id;
    console.log("Selected country: ", state.selectedCountries);
    filterData();

    const chartContainer = document.getElementById('chart_div');
    if (chartContainer) {
        chartContainer.innerHTML = ''; 
        const chart = new SvgBarChart(chartContainer);
        chart.draw();
    } else {
        console.log('Elementul chart_div nu a fost găsit.');
    }
}

function handleIndicator(event) {
    state.selectedIndex = event.target.id;
    filterData();

    const chartContainer = document.getElementById('chart_div');
    if (chartContainer) {
        chartContainer.innerHTML = ''; 
        const chart = new SvgBarChart(chartContainer);
        chart.draw();
    } else {
        console.log('Elementul chart_div nu a fost găsit.');
    }
}


document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.buttonCountry');
    buttons.forEach(button => {
        button.addEventListener('click', handleClick);
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.buttonIndicator');
    buttons.forEach(button => {
        button.addEventListener('click', handleIndicator);
    });
});


