import { readFileSync } from 'fs';

function removeDuplicates(arr) {
    return arr.filter((item, index) => {
        return !arr.some((el, i) => i !== index && el.includes(item));
    });
}

try {
    const data = readFileSync('static/csv/teste.txt', 'utf8');    
    let disciplinas = [];
    for (const line of data.split('\n')) {
        const [nome, creditos, carga, deps] = line.split(',');
        disciplinas.push({"Nome": nome.trim(), "Cŕeditos": creditos.trim(), "Carga Horária": carga.trim(), "Pré-requisitos": [], deps});
    }
    for (let ii of disciplinas) {
        for (let jj of disciplinas) {
            if (jj.deps.includes(ii["Nome"])) {
                jj["Pré-requisitos"].push(ii.Nome);
            }
        }                
    } 
    for (const disciplina of disciplinas) {
        delete disciplina.deps;
        disciplina["Pré-requisitos"] = removeDuplicates(disciplina["Pré-requisitos"]);        
    }   
    console.log(disciplinas);
} catch (err) {
    console.error('Erro ao ler o arquivo:', err);
}

