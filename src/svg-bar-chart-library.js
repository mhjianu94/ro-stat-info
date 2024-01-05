class SvgBarChart {
    #svgns
    
    #domElement
    #svg
    
    /**
     * 
     * @param {HTMLDivElement} domElement 
     */
    constructor(domElement){
        this.#domElement = domElement;
        this.#svgns = 'http://www.w3.org/2000/svg'
    }

    /**
     * Displays the bar chart
     * @param {Array<Array>} data 
     */
    draw(data){
        this.#createSVG();
        this.#domElement.appendChild(this.#svg);
        this.#drawBars(data);
    }

    #createSVG(){
        this.#svg = document.createElementNS(this.#svgns, 'svg');
        this.#svg.style.width = '600px';
        this.#svg.style.height = '300px';
        this.#svg.style.borderColor = 'black';
        this.#svg.style.borderWidth = '1px';
        this.#svg.style.borderStyle = 'solid';
    }

    #drawBars(data){
        const barWidth = this.#svg.clientWidth / data.length;
        
        const maxValue = Math.max(...data.map(x=>x[1]))
        const f = this.#svg.clientHeight / maxValue;

        for(let i = 0; i < data.length; i++){
            const barX = i * barWidth;
            
            const element = data[i];
            const label = element[0];
            const value = element[1];

            const barHeight = value * f * 0.9;
            const barY = this.#svg.clientHeight - barHeight;

            const bar = document.createElementNS(this.#svgns, 'rect');
            bar.classList.add('bar');
            bar.setAttribute('x', barX + barWidth / 4);
            bar.setAttribute('y', barY);
            bar.setAttribute('width', barWidth / 2);
            bar.setAttribute('height', barHeight);

            bar.addEventListener('click', function(){
                alert(label);
            })

            this.#svg.appendChild(bar);

            const text = document.createElementNS(this.#svgns, 'text');
            text.appendChild(document.createTextNode(label));
            text.setAttribute('x', barX  + barWidth / 4);
            text.setAttribute('y', barY);
            this.#svg.appendChild(text);
        }

    }
}