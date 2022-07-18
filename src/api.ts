interface ApiRequest {
    url: string,
    method: string,
    headers?: any,
    data?: any
}

class ApiService {
    BASE_URL: any = "https://e2e.azurewebsites.net/"

    async apiRequest(requestConfig: ApiRequest) {
        const options = {
            method: requestConfig.method.toUpperCase(),
            body: JSON.stringify(requestConfig.data),
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': "Bearer " + store.getState().auth.authToken,
                ...requestConfig.headers
            }
        };

        let response: Response;
        response = await fetch(`${this.BASE_URL}${requestConfig.url}`, options)

        return response.json();
    }

    loginRequest = async (request: {Email: string, Password: string}) => {
        return await this.apiRequest({
            url: '/api/Users/Login',
            method: 'Post',
            data: request
        })
    }

    sendMessage = async (request: {Message: string | null, Sender: string | null,}, tokenId: string | null) => {
        return await this.apiRequest({
            url: '/api/Users/Login',
            method: 'Post',
            headers: {
                'API-Key': tokenId
            },
            data: request
        })
    }
    
    sendPublicKey = async (request: {RecieverstokenId: string, publicKey: string}) => {
        return await this.apiRequest({
            url: `/api/rooms/SendPublicKey/${request.RecieverstokenId}/${request.publicKey}`,
            method: 'Post'
        })
    }
}

export default ApiService;