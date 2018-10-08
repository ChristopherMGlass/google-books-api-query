import { query_api } from "./books_api.js";
import { displayResults } from "./displayItems.js";

//disable debug statements
console.debug=function(){}
/**
 * get form input data stored globally to query google api
 */
export function query() {
    console.debug("querying...")
    let bookQuery = {}
    let query = {
        maxResults: 40
    }
    for (let key in builtFormValues) {
        if (!builtFormValues[key]) {
            continue;
        }
        switch (key) {
            case "orderBy":
            case "printType":
                query[key] = builtFormValues[key]
                break;
            default:
                bookQuery[key] = "\"" + builtFormValues[key] + "\"" //wrap in quotes to allow for white space in query value
        }
    }
    query.bookQuery = bookQuery
    let results = query_api(query)
    displayResults(results)

   

}

document.getElementById("query_btn").addEventListener("click", query)