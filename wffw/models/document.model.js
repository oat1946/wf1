class Document {
    constructor(_db, document) {
        this.documentId = document.documentId
        this.approver = document.approver
        this.data = document.data
        this.state = document.state
        this.comments = document.comments
        this.db = _db
    }
    save() {
        this.db.insert({ documentId: this.documentId, approver: this.approver, data: this.data, state: this.state, comments: this.comments })
    }
    get() {
        return {
            value: {
                documentId: this.documentId,
                approver: this.approver,
                data: this.data,
                state: this.state,
                comments: this.comments
            },
            view: () => this.db.view(),
            update: (newVal) => this.db.update(this.documentId, newVal),
            delete: () => this.db.delete(this.documentId)

        }
    }
    comment(dateTime, msg, state) {
        this.comments.push({ dateTime: dateTime, message: msg, state: state })
        this.db.update(this.documentId, { comments: this.comments })
        return { status: "success" }
    }

    documentUpdate(documentUpdate) {
        this.data = documentUpdate
        this.db.update(this.documentId, {data: documentUpdate})
        return { status: "success" }
    }

    commentUpdate(dateTime, documentUpdate) {
        const commentIndex = this.comments.findIndex((comment) => dateTime === comment['dateTime'])
        const documentDb = this.db.getById(this.documentId)
        if (documentDb.comments[commentIndex].state === "Pending") {
            this.comments[commentIndex].state = "Success"
            this.data = documentUpdate
            this.db.update(this.documentId, { comments: this.comments, data: documentUpdate })
            return { status: "success" }
        } else {
            return { status: "failed" }
        }
    }
}

module.exports = Document