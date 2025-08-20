export class ClientError extends Error {
    digest: string
    constructor(message: string) {
        super(message)
        this.name = "ClientError"
        this.digest = message
    }
}