
import axios from "axios"
export async function getData() {
    const url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/demo_mlexpec?sex=T&age=Y1&time=2019&time=2020&geo=RO&geo=BG";
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

