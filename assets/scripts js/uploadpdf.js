async function uploadPdf() {
    const file = document.querySelector("#file-hist").files[0] 
 
    if (!file) {
        console.error('Nenhum arquivo selecionado.') 
        return 
    }

    const formData = new FormData()
    formData.append('pdf', file)

    try { 
        const response = await fetch('https://api-cr.up.railway.app/', {
            method: 'POST', mode: 'cors', body: formData
        }).then(response=> response.json()).then(response => localStorage.setItem('data', JSON.stringify({
            nome: response[0][0],
            matricula: response[0][1],
            curso : response[0][2], 
            periodo : response[0][3],
            crs : response[0][4], 
            crgeral : response[0][5],
            areasch: response[0][6], 
            areascred: response[1],
            aulas: response[2]
        })))
        setTimeout(window.location.replace('dashboard.html', 'index.html'), 2000);
        
    } catch (error) { 
        document.querySelector("#file-error span").innerText = "\nOcorreu um erro durante o envio do PDF." 
        console.error(error) 
    } 
} 