class AppState {
    constructor() {
        this.data = "";
        this.initData = false;
        this.selectedCountries = "RO";
        this.selectedYear = 2007;
        this.selectedIndex = null;
        this.selectedData = [];
    }
}

const state = new AppState();
export default state;