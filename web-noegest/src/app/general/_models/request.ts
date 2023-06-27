import { HttpClient }


interface MyData {
  // Define your data structure here
}

interface MyResponse extends HttpResponse<MyData> {
  results: MyData[];
}
