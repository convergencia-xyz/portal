import re
import fitz  # PyMuPDF
import json
import sys

from pydantic import BaseModel


class DisciplinaCDIA(BaseModel):
    Nome: str
    Carga: str
    Departamento: str
    Ementa: list[str]
    Bibliografia_Obrigatória: list[str]
    Bibliografia_Complementar: list[str]


def extrair(pdf_path: str):

    doc = fitz.open(pdf_path)

    texto = ""

    for page in doc:
        page_text = page.get_text()
        texto += page_text

    texto += " "
    doc.close()

    _, texto = texto.split("Ementário", 1)

    texto = re.sub(r"[\n\s]+Carga[\s]*:", "\nCarga:", texto)
    texto = re.sub(r"(^.*\n)(?=^Carga)", r"@#@#@#@#@#@\1", texto, flags=re.MULTILINE)

    ementa = []
    for disciplina in [txt for txt in texto.split("@#@#@#@#@#@") if not txt.isspace()]:
        selecao = {}
        disciplina = re.sub(r"\s*", "@>@>", disciplina)
        nome, disciplina = disciplina.split("\n", 1)
        for palavra in [
            "Carga",
            "Departamento",
            "Ementa",
            "Bibliografia Obrigatória",
            "Bibliografia Complementar",
        ]:
            disciplina = re.sub(
                palavra + ":", r"\n-@#1@1#@-\n" + palavra + ":", disciplina
            )
        secoes = disciplina.split("-@#1@1#@-")
        for secao in [sec for sec in secoes if not sec.isspace()]:
            chave, conteudo = secao.split(":", 1)
            if "Ementa" in chave:
                selecao[chave.strip()] = [
                    cont.strip()
                    for cont in conteudo.strip().split(".")
                    if not cont.isspace() and not cont == ""
                ]
            else:
                selecao[chave.strip()] = [
                    cont.strip()
                    for cont in conteudo.strip().split("@>@>")
                    if not cont.isspace() and not cont == ""
                ]

        selecao["Nome"] = nome.strip()
        obj = DisciplinaCDIA(
            Nome=selecao["Nome"],
            Carga=(
                selecao["Carga"] if len(selecao["Carga"]) > 1 else selecao["Carga"][0]
            ),
            Departamento=(
                selecao["Departamento"]
                if len(selecao["Departamento"]) > 1
                else selecao["Departamento"][0]
            ),
            Ementa=selecao["Ementa"],
            Bibliografia_Obrigatória=selecao["Bibliografia Obrigatória"],
            Bibliografia_Complementar=selecao["Bibliografia Complementar"],
        )
        ementa.append(obj.model_dump())

    return ementa


if __name__ == "__main__":
    # se sys.argv[1] termina em .pdf e sys.argv[2] termina em .json, realize alguma operação. Caso contrário, informe o erro.
    if (
        len(sys.argv) == 3
        and sys.argv[1].endswith(".pdf")
        and sys.argv[2].endswith(".json")
    ):
        ementa = extrair(sys.argv[1])
        with open(sys.argv[2], "w", encoding="utf-8") as f:
            json.dump(ementa, f, indent=2)
    else:
        raise ValueError("Informe o nome do arquivo de entrada e de saída")
