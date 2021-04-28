const links = {
    baseUrl: "",
    getAllAuthor: "",
    postNewAuthor: "",
    getAuthorById: "",
    postUpdateAuthor: "",
    deleteAuthor: ""
};

links.baseUrl = "http://localhost:51548/WebService1.asmx/";
links.getAllAuthor = links.baseUrl + "GetDataAuthor";
links.postNewAuthor = links.baseUrl + "PostNewAuthor";
links.getAuthorById = links.baseUrl + "GetAuthorById";
links.postUpdateAuthor = links.baseUrl + "PostUpdateAuthor";
links.deleteAuthor = links.baseUrl + "DeleteAuthor";

export default links;