const links = {
    baseUrl: "",
    getAllAuthor: "",
    postNewAuthor: "",
    getAuthorById: "",
    postUpdateAuthor: "",
    deleteAuthor: "",
    getBooksByAuthor: "",
    postNewBook: "",
    getBookById: "",
    postUpdateBook: "",
    deleteBook: "",
    deleteCompleteAuthor: ""
};

links.baseUrl = "http://localhost:51548/WebService1.asmx/";
//links.baseUrl = "http://localhost:54774/WebAppVisualBasicWebService.asmx/";
links.getAllAuthor = links.baseUrl + "GetDataAuthor";
links.postNewAuthor = links.baseUrl + "PostNewAuthor";
links.getAuthorById = links.baseUrl + "GetAuthorById";
links.postUpdateAuthor = links.baseUrl + "PostUpdateAuthor";
links.deleteAuthor = links.baseUrl + "DeleteAuthor";
links.getBooksByAuthor = links.baseUrl + "GetBooksByAuthor";
links.postNewBook = links.baseUrl + "PostNewBook";
links.getBookById = links.baseUrl + "GetBookById";
links.postUpdateBook = links.baseUrl + "PostUpdateBook";
links.deleteBook = links.baseUrl + "DeleteBook";
links.deleteCompleteAuthor = links.baseUrl + "DeleteCompleteAuthor";

export default links;