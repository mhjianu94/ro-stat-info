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