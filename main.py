import PyPDF2
import re
from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
def extrair_texto_pdf(arquivo):
    texto = ""
    leitor = PyPDF2.PdfReader(arquivo)
    num_paginas = len(leitor.pages)

    for pagina in range(num_paginas):
        conteudo_pagina = leitor.pages[pagina].extract_text()
        texto += conteudo_pagina

    return texto


def extrair_informacoes(texto_pdf):
    CRs = []
    Areas = []
    padrao_nome = r"Nome Aluno:\s*([A-Z\s]+)"
    nome = re.search(padrao_nome, texto_pdf).group(1)
    nome = re.sub(".$", "", nome)

    padrao_matricula = r"\d+(?=\sMatrícula)"
    matricula = re.search(padrao_matricula, texto_pdf)[0]

    padrao_curso = r"Data:\s*\d+/\d+/\d+\s+(.*?)\s+20"
    curso = re.search(padrao_curso, texto_pdf).group(1)

    periodo_atual = re.search(r'Período Atual:\s*(.+)', texto_pdf).group(1)

    numeros = re.findall(r'(\d+,\d+)\s+Coeficiente de Rendimento:', texto_pdf)
    numeros_float = [CRs.append(numero) for numero in numeros]

    cr_geral = re.search(r'Coeficiente de Rendimento Geral: (\d+,\d+)', texto_pdf)[0]

    # areas = re.findall(r'\d+\.\s(.*?)\s-', texto_pdf)
    areas_horas = re.findall(r'(\d+\..*?) - .*?0\s/\s\d+\s(\d+\s/\s\d+)', texto_pdf)
    
    for area, horas_cumpridas in areas_horas:
        horas,horas_cumpridas = horas_cumpridas.split(" / ")
        Areas.append([area, horas, horas_cumpridas])
    return [nome, matricula, curso, periodo_atual, CRs, cr_geral, Areas]

def calcula_materias(array_informacoes):
    array_quantofeito = []
    array = array_informacoes[6]
    for i in range(len(array)):
        area = re.sub(r"\d?[.]?\d?[.]","",array[i][0])
        area = re.sub(r"^\s", "" ,area)
        relacao = array[i][1]
        materias_porc = (int(array[i][2]) / int(array[i][1]))

        array_quantofeito.append([area, materias_porc * 100])
    return array_quantofeito

def materias_atuais(texto_pdf):
    array_materias_atuais = []
    regex_disciplina = r"([A-Z\s]{3}\d+)\s+([\w\s]+)\d\s+\d+\s+\d+,\d+\s+ASC - Matrícula"

    correspondencias = re.findall(regex_disciplina, texto_pdf)

    for codigo, nome_disciplina in correspondencias:
        nome_disciplina = nome_disciplina.replace("\n", "")
        array_materias_atuais.append([codigo, nome_disciplina])

    return array_materias_atuais



@app.route('/', methods=['POST'])
def main():
    pacote = request.files
    pdf = pacote['pdf']
    texto_pdf = extrair_texto_pdf(pdf)
    array_informacoes = extrair_informacoes(texto_pdf)
    array_materias_porc = calcula_materias(array_informacoes)
    array_materias_atuais = materias_atuais(texto_pdf)
    retorno = [array_informacoes, array_materias_porc, array_materias_atuais]
    return jsonify(retorno)

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))
