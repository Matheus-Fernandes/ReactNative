const CONTEXTO = "http://10.0.0.247:8180/sgm_web_adm_sistema/";

export default class Armazenamento{
    static lugar = {
        id : null,
        imagem : null,
        descricao : null,
    };
    static listaLugares = [];
    static changeListeners = [];

    static async carregarLugares(){
        try {
            const response = await fetch(CONTEXTO + "ServletLugar?operation=getLugares")
            const listaLugares = await response.json();

        } catch (e) {
            console.log(e);
        }
    }

    static dispararChanges(){
        this.changeListeners.forEach(metodo => {
            metodo();
        });
    }

    static addChangeListener(listener){
        this.changeListeners.push(listener);
    }
}

Armazenamento.carregarLugares();