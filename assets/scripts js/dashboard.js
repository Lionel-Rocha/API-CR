const data = JSON.parse(localStorage.getItem('data'));

console.log('teste', data)
areaName = data.areasch
console.log(areaName)

function setDashboard(){ 
    function cor(valor){  
        var r = Math.floor((125 - valor) * 2.20);
        var g = Math.floor(valor * 1.80);
        return `rgb( ${r}, ${g}, 30`;
    }

    function setCRBar() {
        const crbar = data.crgeral.match(/\d+,\d{3}/)[0].replace(",", ".") * 10
        const rgb = cor(crbar)
        
        document.getElementById("progress-spinner").style.background =`conic-gradient(${rgb}) ${crbar}%,rgb(242, 242, 242) ${crbar}%)`

        document.getElementById("middle-circle").innerHTML = `<span>${crbar}%</span>`

    }

    setCRBar()
    // referencia: https://stackoverflow.com/questions/14222138/css-progress-circle

    function setAreas() {
        //const 
        //const horasTotais = data.areasch[1].substring(0, )
        let ulDisciplina = documento.getElementById("disciplinas-ul")
        
        for(i = 0; i < data.areasch.length; i++){
            for(j = 0; j < 2; j++){
                
            }
            console.log(areaName[i])
        }
    }

    setAreas()
} 
