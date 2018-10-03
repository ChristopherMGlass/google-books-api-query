const PAGE_SEPARATOR = "..."

function get_pages(total, idx, perpage) {
    let numPages = Math.ceil(total / perpage)
    let display = []
    console.log("getting pages", total, idx, perpage)
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

function page_links(display, idx) { //throws type error

    let pagehtml = "<div class=\"pageLinks\"> "
    if (idx > 1) {
        pagehtml += "<button id='prev_page' class=\"page_btn\" > \< prev page </button>"
    }
    console.log("display", display, idx, pagehtml)
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

function display_items(items, size, idx, perpage, displayHandler) {
    let numberOfItems = size || items.length
    let displayWrapper = "<div class=\"itemWraper\">"
    let displayHtml = displayWrapper
    let base=(idx-1)*perpage
    for (let i = 0; i < perpage  && base+1<numPages ; i++) {
        displayHtml += displayHandler(items[base+i])

    }
    displayHtml += "</div>" //close itemwrapper
    displayHtml += page_links(get_pages(numberOfItems, idx, perpage), idx)
    return displayHtml
}

export function gotopage(pageNum) {
    console.debug("goto num", pageNum)
    pageNum = +pageNum //ensure it is of type number
    window.index = pageNum
    renderGallery()
}

export function nextpage() {
    gotopage(window.index + 1)
}

export function prevpage() {
    gotopage(window.index - 1)
}

//idx support for multiple galleries in the future
export function renderGallery(galleryidx = 0) {
    let gallery = window.galleries[galleryidx]
    let elementID = gallery.element || "item_gallery_" + galleryidx
    let galleryElement = document.getElementById(elementID)
    console.log("gallery", gallery, window.index)
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
    window.galleries = window.galleries || []
    window.galleries.push(gallery)
}