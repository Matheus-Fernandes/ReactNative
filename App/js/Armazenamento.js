export default class Armazenamento{
    static lugar = {
        chave : null,
        imagem : null,
        descricao : null,
    };

    static changeListeners = [];

    static dispararChanges(){
        this.changeListeners.forEach(metodo => {
            metodo();
        });
    }

    static addChangeListener(listener){
        this.changeListeners.push(listener);
    }
}