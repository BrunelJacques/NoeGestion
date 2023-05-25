def StatisticsMiddleware(get_response):
    def middleware(request):

        # Code to be executed for each request/response after
        # the view is called.

        body = request.body
        headers = request.headers
        print(request.method,request.POST,request.path)
        print(len(body),body)
        print(len(headers),headers)
        response = get_response(request)
        print(response.data)
        return  response #response should be defined before

    return middleware