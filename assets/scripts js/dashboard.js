const data = JSON.parse(localStorage.getItem('data'));

console.log('teste', data)

function setDashboard(){ 
    function cor(valor){  
        var r = Math.floor((125 - valor) * 2.20);
        var g = Math.floor(valor * 1.80);
        return `rgb( ${r}, ${g}, 30`;
    }

    function setCRBar() {
        const  crbar = data.crgeral.match(/\d+,\d{3}/)[0].replace(",", ".") * 10
        const rgb = cor(crbar)
        
        document.getElementById("progress-spinner").style.background =`conic-gradient(${rgb}) ${crbar}%,rgb(242, 242, 242) ${crbar}%)`

        document.getElementById("middle-circle").innerHTML = `<span>${crbar}%</span>`

    }

    setCRBar()
    // referencia: https://stackoverflow.com/questions/14222138/css-progress-circle
} 
