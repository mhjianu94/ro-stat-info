class AppState {
    constructor() {
        this.data = "";
        this.initData = false;
        this.selectedCountries = "RO";
        this.selectedYear = 2007;
        this.selectedIndex = "SV";
        this.selectedData = [];
        this.elementSelection = {};
        this.selectedDataByYear = [];
    }
}

const state = new AppState();
export default state;