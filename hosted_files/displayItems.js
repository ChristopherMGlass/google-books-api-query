import { renderGallery, initGallery } from "./gallery.js";

const DEFAULT_IMG="./Not Found.png"

/**
 *  handles the rendering of a list of volumes from teh API query
 * @param volumeResult - the list of volumes retrived from Google
 *
  */
function handleVolumes(volumeResult) {
    initGallery(volumeResult, 20, displayVolume, "volume_gallery")
    renderGallery()
}


/**
 * displays and individual volume
 * @param {} volume - the volume to display
 */
let displayVolume=function(volume) {
    console.debug("displaying volume:",volume)

    let volumeHtml = "<div class=\"galleryItem volume\" >"
    let title = volume.volumeInfo.title
    let authors = volume.volumeInfo.authors || ["no authors found"]
    let publisher = volume.volumeInfo.publisher || "publisher not found"

    let imagelinks=volume.volumeInfo.imageLinks || {}
    let imglink = imagelinks.small ||  imagelinks.thumbnail || DEFAULT_IMG
    let infolink = volume.volumeInfo.infoLink

    volumeHtml += "<img class=\"volumeImage\" src=\""+imglink+"\" />"
    volumeHtml += "<h2 class= \"volumeTitle\">" + title + "</h2>"
    volumeHtml += "<div class=\"authorsWrapper\">"
    authors.forEach(author => {
        volumeHtml += "<h5 class=\"volumeAuthors\">" + author + "</h5>"
    });
    volumeHtml += "</div>"

    volumeHtml += "<div class=\"volumePublisher\">" + publisher + "</div>"
    volumeHtml += "<a class=\"volumeImage\" href="+infolink+" target=\"blank\" > click here for more info </a>"
    volumeHtml += "</div>" //close volume
    return volumeHtml
}

/**
 * displays results of query
 * @param {*} results 
 */
export function displayResults(results){
    let volumesList=results.items || []
    if(!volumesList instanceof Array){
        console.error("volumesList is not an array is", typeof volumesList)
    }
    if(!volumesList.length){
        console.debug("volumelist is empty")
        gallery.innerHTML= "<div class=\"empty results\">NO BOOKS FOUND</div>"
        return
    }
    //hide spinner - DOES 
    var elem =  document.getElementById("spinner")
    elem.style.display="none"
    handleVolumes(volumesList)
}