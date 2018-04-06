const CONTEXTO = "http://10.0.0.247:8180/sgm_web_adm_sistema/";

export default class Armazenamento{
    static lugar = {
        id : null,
        imagem : null,
        descricao : null,
        longitude : null,
		latitude : null,
    };
    static listaLugares = [{id:"1", descricao:"vla"}];
    static changeListeners = [];

    constructor(){
        this.carregarLugares();
    }

    static carregarLugares = async() => {
        try {
            const response = await fetch(CONTEXTO + "ServletLugar?operation=getLugares")
            const json = await response.json();
            this.listaLugares = json;
            return this.listaLugares;
        } catch (e) {
            console.log("erroaqui" + e);
        }
    }

    static setLugares(lugares){
        this.lugares = lugares;
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
