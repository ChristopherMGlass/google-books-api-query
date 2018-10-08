import { query_api } from "./books_api.js";
import { displayResults } from "./displayItems.js";
import { gotopage, nextpage, prevpage } from "./gallery.js";

export function query() {
    //     let query = {
    //         bookQuery:{
    //             query: '"War of the Worlds"',
    //             inauthoer: "Wells"
    //         },
    //         orderBy:"relevance",
    //         maxResults:40
    //     }
    console.log("window", window.builtFormValues)
    console.log("global", builtFormValues)
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