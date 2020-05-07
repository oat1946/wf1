const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

let mock = {
    "documentId": "doc1587973848541",
    "creator": "kantanop@hiqfood.com",
    "approver": "chaya@hiqfood.com",

    "data": {
        "company": "บริษัท ไฮคิวผลิตภัณฑ์อาหาร จำกัด",
        "date": 1587719724324,
        "requesition": "Kantanop Jiwsakul",
        "department": "IT",
        "date_custom_clear": "",
        "pay_in": "",
        "payType": "ค่าใช้จ่ายอื่นๆ",
        "list": [{
            "name": "a",
            "price": 100
        }],
        "expense_all": 100,
        "vatPercent": 100,
        "vatBaht": 100,
        "taxPercent": 100,
        "taxBaht": 100,
        "net": 100,
        "advance": 100,
        "reimbursement": 100,
        "attach": []
    },
    "state": "Pending",
    "comments": [
        // {
        // "dateTime": "12345", "message": "เงินไม่ถูก", "state": "Pending"
    // }
]
}

const port = process.env.PORT | 3000
const wffw = require('./wffw')
const wfNginApp = wffw('./BP0.json')

app.post("/api/create", (req, res) => {
    const body = req.body
    wfNginApp.create()
})

app.get("/api/create", (req, res) => {
    const documentJson = mock
    const resp = wfNginApp.create(documentJson)
    res.send(resp)
})

app.get("/api/approve", (req, res) => {
    const documentId = mock.documentId
    const approveId = mock.approver
    // if (bp.constants.approvers.includes(approveId)) {
    const resp = wfNginApp.approve(documentId, approveId)
    res.send(resp)
    // }
})

app.listen(port, "0.0.0.0", () => console.log(`http://localhost:${port}`))