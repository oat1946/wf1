const fs = require('fs')
const DB = require('./db/storedb.js')
const Document = require('./models/document.model.js')

let Unauthorized = { code: 401, error: 'Unauthorized.' }

const Singleton = (function () {
  let instance;

  function createInstance() {
    const object = new DB()
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const dbInstance = Singleton.getInstance()
// let mock = {
//   "documentId": "doc1587973848541",
  // "creator": "kantanop@hiqfood.com",
  // "approver": "chaya@hiqfood.com",

//   "data": {
//     "company": "บริษัท ไฮคิวผลิตภัณฑ์อาหาร จำกัด",
//     "date": 1587719724324,
//     "requesition": "Kantanop Jiwsakul",
//     "department": "IT",
//     "date_custom_clear": "",
//     "pay_in": "",
//     "payType": "ค่าใช้จ่ายอื่นๆ",
//     "list": [{
//       "name": "a",
//       "price": 100
//     }],
//     "expense_all": 100,
//     "vatPercent": 100,
//     "vatBaht": 100,
//     "taxPercent": 100,
//     "taxBaht": 100,
//     "net": 100,
//     "advance": 100,
//     "reimbursement": 100,
//     "attach": []
//   },
//   "state" : "Pending",
//   "comments" : [{
//     "dateTime": "12345", "message": "เงินไม่ถูก", "state": "Pending"
//   }]
// }
// const document = new Document(dbInstance, mock)
// document.save()




// const documentResp = document.get()
// documentResp.view()
// documentResp.update({state:"NEW STATE"})
// documentResp.view()
// const respDoc = dbInstance.getById("doc1587719724324")
//     console.log("respDoc : ", respDoc);
let bp
let _options

module.exports = (BP, options) => {

  bp = (typeof BP == "string")
    ? JSON.parse(fs.readFileSync(BP, 'utf8'))
    : JSON.parse(BP)
  return wfNgin
}

const wfNgin = {
  create: (jsonDocument) => {
    jsonDocument.state = bp.create
    const document = new Document(dbInstance, jsonDocument)
    document.save()
    return document.get()
  },
  approve: (documentId, userId) => {
    const dbResp = dbInstance.getById(documentId)
    if (dbResp.approver == userId ) {
      const action = "Approve"
      dbInstance.update(documentId, {state: bp.actions[action].transition.after})
      return dbInstance.getById(documentId)
    }else{
      return Unauthorized
    }
  }
}


