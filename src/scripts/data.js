
import axios from "axios"
export async function getData(year,country) {
    const url = `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/demo_mlexpec?sex=T&age=Y1&sinceTimePeriod=${year}&geo=${country}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        processData(data);
    } catch (error) {
        console.error("Could not fetch the data: ", error);
    }
}

function processData(data) {
    
    console.log(data); 
}

