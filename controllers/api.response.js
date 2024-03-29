class ApiResponse{
    constructor(statusCode, message,data){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        
    }

    send(res){
        return res.status(this.statusCode).json({
            status: this.statusCode,
            message:this.message,
            data: this.data,
        });
    }
}

module.exports =  ApiResponse;