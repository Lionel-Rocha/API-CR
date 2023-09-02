response = [['PABLO MARTINS BORGES', '20221210024', '210 - Sistemas de Informação - Bacharelado - Turno Integral (V/N)', '3º Semestre', ['6,8400', '7,5700', '0,0000'], 'Coeficiente de Rendimento Geral: 7,1628', [['08. Outras Áreas da Computação', '480', '0'], ['11.3. Trabalho de Conclusão Final de Curso', '150', '0'], ['11.1. Atividades Complementares', '360', '0'], ['10. Comunicação', '60', '60'], ['01. Fundamentação Mat. da Ciência da Computação', '240', '60'], ['07. Ciências Administrativas', '180', '60'], ['06. Banco de Dados', '180', '0'], ['05. Engenharia de Software', '300', '0'], ['04.Arquitetura de Comp ,Sistemas Oper. e Redes', '240', '60'], ['03. Sistemas de Informação', '180', '120'], ['02. Programação e Estruturas de Dados', '300', '180']]], [['Outras Áreas da Computação', 0.0], ['Trabalho de Conclusão Final de Curso', 0.0], ['Atividades Complementares', 0.0], ['Comunicação', 100.0], ['Fundamentação Mat da Ciência da Computação', 25.0], ['Ciências Administrativas', 33.33333333333333], ['Banco de Dados', 0.0], ['Engenharia de Software', 0.0], ['Arquitetura de Comp ,Sistemas Oper e Redes', 25.0], ['Sistemas de Informação', 66.66666666666666], ['Programação e Estruturas de Dados', 60.0]], [['TIN0109', 'ESTRUTURAS DISCRETAS '], ['TIN0114', 'ESTRUTURAS DE DADOS I '], ['TIN0115', 'ANÁLISE DE SISTEMAS '], ['TIN0116', 'SISTEMAS OPERACIONAIS '], ['TIN0120', 'BANCO DE DADOS I ']]]

localStorage.setItem('data', JSON.stringify({
    nome: response[0][0],
    matricula: response[0][1],
    curso : response[0][2], 
    periodo : response[0][3],
    crs : response[0][4], 
    crgeral : response[0][5],
    areasch: response[0][6], 
    areascred: response[1],
    aulas: response[2]
}))
const data = JSON.parse(localStorage.getItem('data'));

function setDashboard(){ 
    function titletype(text){
        let words = text.toLowerCase().split(" ")
        for (let i = 0; i < words.length; i++){
            let w = words[i];
            words[i] = w[0].toUpperCase() + w.slice(1)
        }
        return words.join(" ")
    }

    document.querySelector("#name").innerText = titletype(data.nome)
    document.querySelector("#regist").innerText = data.matricula
    document.querySelector("#course").innerText = titletype(data.curso)

    function cor(valor){  
        if (valor == 0)
            valor = 10
        var r = Math.floor((125 - valor) * 2.20);
        var g = Math.floor(valor * 2.20);
        return `rgb( ${r}, ${g}, 30`;
    }

    let areasplace = document.querySelector("#areas");
    let classes = document.querySelector("#classes div");

    const crbar = data.crgeral.match(/\d+,\d{3}/)[0].replace(",", ".") * 10
    
    document.getElementById("progress-spinner").style.background =`conic-gradient(${cor(crbar)}) ${crbar}%, var(--white) ${1.4*crbar}%)`

    document.getElementById("middle-circle").innerHTML = `<span>CR Geral</span><span>${(crbar/10).toFixed(4)}</span>`

    // carga horaria por area
    for(area of data.areasch){
        if(!area[0].match("Atividades Complementares")){
            perc = (320 * area[2])/area[1]

            areasplace.innerHTML += `<div class="bar-area">
                                        <span class="span-bar-area">${area[0]}</span>
                                        <div class="bar">
                                            <div class="bar-bg-area" id="progress${area[0]}"></div>
                                            <div class="bar-perc-area" id="progressbar${area[0]}" style="width: ${perc}px;"></div>
                                        </div>
                                    </div>`
        }
        else   
            actextra = area
    }

    // materias atualmente matriculado(a)
    for(aula of data.aulas){
        classes.innerHTML += `<span class="class">${aula[1]}<span>`
    }

    // periodo atual
    document.querySelector("#period").innerHTML = `${data.periodo.substring(0, 2)} Período`

    // porcentagem ch extra
    
    actbar = (100 * 48)/actextra[1]
        
    document.getElementById(`progress-extra`).style.background =`conic-gradient(var(--green) ${actbar}%, var(--white) ${1.25*actbar}%)`

    document.getElementById(`middle-extra`).innerHTML = `<span>${actextra[0]}</span>`
}
