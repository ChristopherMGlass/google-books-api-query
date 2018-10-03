import { query_api } from "./books_api";
import jsdom from "jsdom-global";
import {expect}from 'chai'

jsdom()
describe("books api", function () {

    it("should return a list of books", function () {
        let query = {
            bookQuery:{
                query: '"War of the Worlds"',
                inauthor: "Wells"
            },
            orderBy:"relevance",
            maxResults:40
        }
        let results=query_api(query)
        expect(results.totalItems).to.equal(38)
    })
})