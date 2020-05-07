class DB {
    localStore = []

    getAll(){
        return this.localStore
    }
    getById(documentId){
        const resp = this.localStore.find((doc)=> doc.documentId == documentId)
        return resp;
    }
    insert(val) {
        this.localStore.push(val)
    }
    update(docId, val){
        let objIndex = this.localStore.findIndex((obj => obj.documentId == docId));
        
        console.log("this.localStore : ", this.localStore );
        console.log("objIndex : ", objIndex );
        console.log("docId : ", docId );
        
        Object.keys(val).forEach(key => {
            this.localStore[objIndex][key] = val[key]
        });
    }
    delete(docId){
        this.localStore = this.localStore.filter((doc)=> doc.documentId != docId)
    }
    view(){
        console.log("localStore :", this.localStore);  
    }
}

module.exports = DB