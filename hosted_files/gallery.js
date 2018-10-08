const PAGE_SEPARATOR = "..."

/**
 * builds a structure of the page navigation
 * @param {*} total - total number of items
 * @param {*} idx - the page index currenty displayed
 * @param {*} perpage - the number of items perpage
 */
function get_pages(total, idx, perpage) {
    let numPages = Math.ceil(total / perpage)
    let display = []
    console.debug("getting pages", total, idx, perpage)
    if (numPages > 10) {
        if (index > (numPages - 3)) {
            display.push(1)
            display.push(PAGE_SEPARATOR)
            display.push(idx - 1)
            for (let i = index; i <= numPages; i++) {
                display.push(i)
            }
        } else if (index < 2) {  // first page
            display.push(idx)
            display.push(idx + 1)
            display.push(idx + 2)
            display.push(idx + 3)
            display.push(PAGE_SEPARATOR)
            display.push(numPages)
        } else if (index > 2) { // enough distance to warrent the '...' separator
            display.push(1)
            display.push(PAGE_SEPARATOR)
            display.push(idx - 1)
            display.push(idx)
            display.push(idx + 1)
            display.push(PAGE_SEPARATOR)
            display.push(numPages)
        } else { // second page
            display.push(idx - 1)
            display.push(idx)
            display.push(idx + 1)
            display.push(idx + 2)
            display.push(PAGE_SEPARATOR)
            display.push(numPages)
        }
    } else {
        for (let i = 1; i <= numPages; i++) {
            display.push(i)
        }
    }
    return display
}

//builds the page link html from the display structure
function page_links(display, idx) { //throws type error

    let pagehtml = "<div class=\"pageLinks\"> "
    if (idx > 1) {
        pagehtml += "<button id='prev_page' class=\"page_btn\" > \< prev page </button>"
    }
    console.debug("display", display, idx, pagehtml)
    if (display.length > 1 && display.length < 3) {
        pagehtml += "<button id='next_page' class=\"page_btn\" >next page ></button></div>"
        return pagehtml
    }
    display.forEach(element => {
        if (typeof element == 'number') { //means element is an instance of page number (js string conversion should cover any issues)
            pagehtml += "<span class='link-like page_link' id=\"" + element + "\">"
            pagehtml += element
            pagehtml += "</span>"
        } else {
            pagehtml += "<span class='etc_page'>" + PAGE_SEPARATOR + "</span>"
        }
    });
    pagehtml += "<button id='next_page' class=\"page_btn\" >next page ></button>"
    pagehtml += "</div>"
    return pagehtml
}

/**
 * displays the items in the galler
 * @param {} items - items to display
 * @param {*} size - size of the item structure
 * @param {*} idx - current page index
 * @param {*} perpage - items perpage
 * @param {*} displayHandler - callback to render the item
 */
function display_items(items, size, idx, perpage, displayHandler) {
    let numberOfItems = size || items.length
    let displayWrapper = "<div class=\"itemWraper\">"
    let displayHtml = displayWrapper
    let base = (idx - 1) * perpage
    let numPages = Math.ceil(numberOfItems / perpage)

    for (let i = 0; i < perpage && i + base < numberOfItems; i++) {
        displayHtml += displayHandler(items[base + i])

    }
    displayHtml += "</div>" //close itemwrapper
    displayHtml += page_links(get_pages(numberOfItems, idx, perpage), idx)
    return displayHtml
}


/**
 * navigate to specified page
 * @param pageNum - the page index to navigate to
 */
export function gotopage(pageNum) {
    console.debug("goto num", pageNum)
    pageNum = +pageNum //ensure it is of type number
    window.index = pageNum
    renderGallery()
}

//go to nex page index
export function nextpage() {
    gotopage(window.index + 1)
}

//go to previous page index
export function prevpage() {
    gotopage(window.index - 1)
}

/**
 * renders the gallery and adds required listeners
 */
export function renderGallery() {
    let gallery = window.gallery
    let elementID = gallery.element || "item_gallery"
    let galleryElement = document.getElementById(elementID)
    galleryElement.innerHTML = ""

    console.debug("gallery", gallery, window.index)
    galleryElement.innerHTML = display_items(gallery.items, null, window.index, gallery.perpage, gallery.displayHandler)

    let nextPage = document.getElementById("next_page")
    if (nextPage) nextPage.addEventListener("click", nextpage);
    let prevPage = document.getElementById("prev_page")
    if (prevPage) prevPage.addEventListener("click", prevpage);

    let pages = document.getElementsByClassName("page_link")
    for (let i = 0; i < pages.length; i++) {
        pages[i].addEventListener("click", gotopage.bind(this, pages[i].id))
    }
}

/**
 * initilazes the gallery object
 * @param items - the items to rendfer in teh galery
 * @param itemsPerPage - the number of items to display on the page
 * @param displayHandler - the callback to display an item
 * @param elementID {O} - an optional gallery HTML element id
 * */
export function initGallery(items, itemsPerPage, displayHandler, elementID = null) {

    let gallery = {
        items: items,
        perpage: itemsPerPage,
        displayHandler: displayHandler,
    }
    if (elementID) {
        gallery.element = elementID
    }
    window.index = 1
    window.gallery = gallery
}