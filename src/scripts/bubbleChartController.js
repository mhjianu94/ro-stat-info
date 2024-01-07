import state from './state.js';

export class BubbleChart {
    constructor(domElement) {
        this.canvas = domElement;
        this.ctx = this.canvas.getContext('2d');
        this.data = this.processedData();
        console.log("processedData",this.data);
    }

    processedData() {
        const maxValue = Math.max(...state.selectedDataByYear.map(item => item.valoare));
    
        this.scaleFactor = 100 / maxValue; 
    
        return state.selectedDataByYear.map(item => {
            const x = Math.random() * this.canvas.width; 
            const y = Math.random() * this.canvas.height; 
            const scaledValue = item.valoare * this.scaleFactor;
            const r = scaledValue; 
            const tara = item.tara;
            const culoare = this.getRandomColor(); 
    
            return { x, y, r, tara, culoare };
        });
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.data.forEach(bubble => {
            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI);
            this.ctx.fillStyle = bubble.culoare;
            this.ctx.fill();
    
            this.ctx.fillStyle = 'black';
            this.ctx.font = '14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`${bubble.tara}: ${Math.round(bubble.r / this.scaleFactor)}`, bubble.x, bubble.y);
        });
    }

    animate(startYear, endYear) {
        let currentYear = startYear;

        const step = () => {
            if (currentYear <= endYear) {
                this.draw(currentYear);
                currentYear++;
                setTimeout(step, 1000); // Ajustați viteza animației
            }
        };

        step();
    }
}
