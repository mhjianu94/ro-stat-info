import state from './state.js'
import {filterDataByYear} from './filterData.js'
import {BubbleChart} from './bubbleChartController.js'

export class SvgBarChart {
   
    constructor(domElement){
        this.domElement = domElement;
        this.svgns = 'http://www.w3.org/2000/svg'
    }
    
    draw(){
        this.createSVG();
        this.domElement.appendChild(this.svg);
        this.drawBars();
    }

    createSVG(){
        this.svg = document.createElementNS(this.svgns, 'svg');
        this.svg.style.width = '100%'; 
        this.svg.style.height = '500px'; 
        this.svg.style.display = 'block'; 
        this.svg.style.margin = 'auto';
    }

    drawBars(){
        const data = state.selectedData
        const barWidth = this.svg.clientWidth / data.length;
        const maxValue = Math.max(...data.map(x=>x["valoare"]))

        const f = this.svg.clientHeight / maxValue;

        for(let i = 0; i < data.length; i++){

            const barX = i * barWidth;
           
            const element = data[i];
            const labelValue = element["valoare"];
            const labelTime = element["an"];
            const value = element["valoare"];
            const indicator = element["indicator"];

            const barHeight = value * f * 0.9;
            const barY = this.svg.clientHeight - barHeight;

            const bar = document.createElementNS(this.svgns, 'rect');
            bar.classList.add('bar');
            bar.setAttribute('x', barX + barWidth / 4);
            bar.setAttribute('y', barY -20);
            bar.setAttribute('width', barWidth / 2);
            bar.setAttribute('height', barHeight);

            this.svg.appendChild(bar);

            const valueText = document.createElementNS(this.svgns, 'text');
            valueText.appendChild(document.createTextNode(labelValue));
            valueText.setAttribute('x', barX  + barWidth / 4);
            valueText.setAttribute('y', barY - 30);
            this.svg.appendChild(valueText);

            const timeText = document.createElementNS(this.svgns, 'text');
            timeText.appendChild(document.createTextNode(labelTime));
            timeText.setAttribute('x', barX  + barWidth / 4);
            timeText.setAttribute('y', 500);
            this.svg.appendChild(timeText);


            bar.addEventListener('click', function(){
                state.selection =  element;
                console.log("Selected: ",state.selection)
                filterDataByYear();

                const bubbleChart = new BubbleChart(document.getElementById('bubble_chart_canvas'));
                bubbleChart.draw();
            })

           bar.addEventListener('mousemove', function(event) {
                const tooltip = document.getElementById('tooltip');
                const svgRect = this.getBoundingClientRect();
                const x = event.clientX - svgRect.left; 
                const y = event.clientY - svgRect.top;  
            
                tooltip.innerHTML = `<p>Index: ${indicator}</p><p>An: ${labelTime}</p><p>Valoare: ${labelValue}</p>`;
                
            
                tooltip.style.display = 'block';
                tooltip.style.left = event.clientX + 'px';
                tooltip.style.top = event.clientY + 'px';
            });
            
            bar.addEventListener('mouseout', function() {
                document.getElementById('tooltip').style.display = 'none';
            });
        }

    }
}