import state from './state.js'

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

            const barHeight = value * f * 0.9;
            const barY = this.svg.clientHeight - barHeight;

            const bar = document.createElementNS(this.svgns, 'rect');
            bar.classList.add('bar');
            bar.setAttribute('x', barX + barWidth / 4);
            bar.setAttribute('y', barY -20);
            bar.setAttribute('width', barWidth / 2);
            bar.setAttribute('height', barHeight);

            bar.addEventListener('click', function(){
                alert(labelValue);
            })

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
        }

    }
}