const data = JSON.parse(localStorage.getItem('data'));

function setDashboard(){ 
    function cor(valor){  
        if (valor == 0)
            valor = 10
        var r = Math.floor((125 - valor) * 2.20);
        var g = Math.floor(valor * 2.20);
        return `rgb( ${r}, ${g}, 30`;
    }

    let areasplace = document.querySelector(".msection-areas");
    let studying = document.querySelector("#studying div");

    const crbar = data.crgeral.match(/\d+,\d{3}/)[0].replace(",", ".") * 10
    
    document.getElementById("progress-spinner").style.background =`conic-gradient(${cor(crbar)}) ${crbar}%,rgb(242, 242, 242) ${1.5*crbar}%)`

    document.getElementById("middle-circle").innerHTML = `<span>${(crbar/10).toFixed(4)}</span>`

    // carga horaria por area
    for(area of data.areasch){
        if(!area[0].match("Atividades Complementares")){
            perc = (250 * area[2])/area[1]

            areasplace.innerHTML += `<span class="span-bar-area">${area[0]}</span>
                                    <div class="bar-area">
                                        <div class="bar-bg-area" id="progress${area[0]}"></div>
                                        <div class="bar-perc-area" id="progressbar${area[0]}" style="width: ${perc}px"></div>
                                    </div>`
        }
        else   
            actextra = area
    }

    // materias atualmente matriculado(a)
    for(aula of data.aulas){
        studying.innerHTML += `<span class="classes">${aula[1]}<span>`
    }

    // periodo atual
    document.querySelector("#period").innerHTML = `<span class="currentperiod">${data.periodo.substring(0, 2)}<br>Período<span>`

    // porcentagem ch de atividade extra
    
    actbar = (100 * 48)/actextra[1]
        
    document.getElementById(`progress-actextra`).style.background =`conic-gradient(var(--green) ${actbar}%,rgb(242, 242, 242) ${1.5*actbar}%)`

    document.getElementById(`middle-actextra`).innerHTML = `<span>${actextra[0]}</span>`
}
