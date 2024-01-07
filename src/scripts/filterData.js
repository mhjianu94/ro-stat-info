import state from "./state.js"

export const filterData = () => {
    const data = JSON.parse(state.data)
    
    const selectedCountries = state.selectedCountries;
    const selectedIndex = state.selectedIndex;

    const filteredData = data.filter(item => 
        item.tara === selectedCountries && item.indicator === selectedIndex
    );

    console.log("filteredData: ",filteredData)
    state.selectedData =  filteredData;
}

export const filterDataByYear = () => {
    const data = JSON.parse(state.data)

    const selectedYear = state.selection.an    
    const selectedIndicator = state.selection.indicator 

    const filteredData = data.filter(item => 
        item.an === selectedYear && item.indicator === selectedIndicator
    );

    console.log("filteredDataByYear: ",filteredData)
    state.selectedDataByYear =  filteredData;
}