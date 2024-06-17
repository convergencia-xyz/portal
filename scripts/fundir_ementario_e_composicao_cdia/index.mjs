import { readFileSync } from 'fs';


try {
    const composicao_data = readFileSync('static/json/ppp-cdia-2020-composicao.json', 'utf8');  
    const ementario_data = readFileSync('static/json/ppp-cdia-2020-ementario.json', 'utf8');  

    const ementario = JSON.parse(ementario_data);
    const composicao = JSON.parse(composicao_data);

    let disciplinas = [];
    for (const c of composicao) {
        let disciplina = c;
        for (const e of ementario) {        
            if (e["Nome"] === c["Nome"]) {
                disciplina = Object.assign({}, e, c);
            }
        }
        disciplinas.push(disciplina);
    }

    console.log(JSON.stringify(disciplinas, null, 4));
} catch (err) {
    console.error('Erro ao ler o arquivo:', err);
}

