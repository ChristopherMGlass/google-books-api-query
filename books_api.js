const API_URL = "https://www.googleapis.com/books/v1"
const VOLUMES_ENDPOINT = "/volumes"
const API_KEY = "AIzaSyCkcpjnhGY39fd7rWQBAIUG3HOOM3KpdGU"
const MAX_RESULTS =500

function build_book_query_string(query) {
    const queryStart = "?q="
    let queryString = queryStart;

    //builds from map key values
    for (let key in query) {
        if (key == "query") {
            console.log(typeof query[key])
            queryString += query[key]
        } else {
            console.log(typeof key)
            queryString += key + ":" + query[key] //TODO: may need to wrap in quotes if spaces
        }
        queryString += '+'
    }
    //remove trialing plus 
    queryString = queryString.slice(0, -1);
    return queryString
}
function buildfullquery(fullQuery) {
    let queryString = build_book_query_string(fullQuery.bookQuery)
    for (let key in fullQuery) {
        if (key !== "bookQuery") {
            queryString += "&"
            queryString += key
            queryString += "="
            queryString += fullQuery[key] //TODO: may need to wrap in quotes if spaces

        }
    }

    queryString += "&key=" + API_KEY;
    return queryString
}

export function query_api(fullQuery) {
    // Initialize the HTTP request.
    let queryString = buildfullquery(fullQuery)
    let result = get_booksApi(queryString)
    let nextItems=true 
    while (nextItems &&result.totalItems > result.items.length ) {
        fullQuery.startIndex = result.items.length
        queryString = buildfullquery(fullQuery)
        nextItems=get_booksApi(queryString).items
        if(nextItems &&nextItems.length){
         result.items = result.items.concat(nextItems)
        }
    }
    return result
}


function get_booksApi(urlParamString) {
    let response = ""
    let xhr = new XMLHttpRequest();
    console.debug("quering google api at", API_URL, VOLUMES_ENDPOINT, urlParamString)

    xhr.open('GET', API_URL + VOLUMES_ENDPOINT + urlParamString, false);

    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            response = xhr.responseText
            if (xhr.status !== OK) {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };
    xhr.send()

    while (xhr.readyState != 4) {
        //wait until finished
        continue;
    }

    return JSON.parse(response)
}