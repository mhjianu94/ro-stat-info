
import axios from "axios"
import state from "./state.js"

export async function getData() {
    let valueArray = [];
    const selectedYear = 2008;
    const countries = ["BE", "BG", "CZ", "DK", "DE", "EE", "IE", "EL", 'ES', "FR", 'HR', "IT", 'CY', 'LV', "LT", "LU", "HU", 'MT', "NL", 'AT', "PL", 'PT', "RO", "SI", "SK", "FI", "SE"];

    const dataSets = [
        { key: "sdg_08_10?na_item=B1GQ&unit=CLV10_EUR_HAB", indicator: "PIB" },
        { key: "demo_mlexpec?sex=T&age=Y1", indicator: "SV" },
        { key: "demo_pjan?sex=T&age=TOTAL", indicator: "Pop" }
    ];

    try {
        const promises = countries.flatMap(country => 
            dataSets.map(async dataSet => {
                const url = createUrl(dataSet.key, country, selectedYear);
                const response = await axios.get(url);
                return dataParser(response.data, country, selectedYear, dataSet.indicator);
            })
        );

        const results = await Promise.all(promises);
        valueArray = results.flat();
    } catch (error) {
        console.error("Could not fetch the data: ", error);
    }

    console.log("Data: ", valueArray);
    state.data = JSON.stringify(valueArray);
}


function createUrl(dataSet, country, year) {
    const BASE_URL = `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/${dataSet}`;
    let url = BASE_URL + `&sinceTimePeriod=${year}&geo=${country}`;
    return url;
}

function dataParser(data, country, year, indicator) {
    const valueArray = [];
    const valueKeys = Object.keys(data.value);

    for (const key of valueKeys) {
        const value = data.value[key];
        const entry = {
            tara: country,
            an: year,
            indicator: indicator,
            valoare: value
        };
        valueArray.push(entry);
    }
    return valueArray;
}


