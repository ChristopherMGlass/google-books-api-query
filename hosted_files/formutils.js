/**
 * series of utility functions for help with a HTML Form
 */
var builtFormValues={}

/**
 * grabs the from data without requiring submission of the form
 * puts data into the  builtFormValues structure
 * @param {string} id - the elment ID of the form
 */
function formDataToObject(id) {
    var form = document.getElementById(id)
    if (!form){
        console.error("form element not found")
        return;
    } 

    var fields = form.querySelectorAll('input, select')
    var formValues = {}

    console.debug("building form values")
    for (var i = 0; i < fields.length; ++i) {
        var field = fields[i],
            fieldKey = field.name || field.id;
        if (field.type === 'button' || field.type === 'image' || field.type === 'submit' || !fieldKey) continue;
        switch (field.type) {
            case 'checkbox':
                formValues[fieldKey] = field.checked;
                break;
            case 'radio':
                if (formValues[fieldKey] === undefined)
                    formValues[fieldKey] = '';
                if (field.checked)
                    formValues[fieldKey] = field.value;
                break;
            case 'select-multiple':
                var a = [];
                for (var j = 0; j < field.options.length; ++j) {
                    if (field.options[j].selected) a.push(field.options[j].value);
                }
                formValues[fieldKey] = a;
                break;
            default:
                formValues[fieldKey] = field.value;
        }
    }
    builtFormValues=formValues
    console.debug("returning form values", formValues)
    return formValues
}

/**
 * displays element
 * 
 * @param id - element id to display
 */
function show(id){
    console.debug("showing",id)
    var elem = document.getElementById(id)
    elem.style.display="block"

}

/**
 * hides element
 * 
 * @param id - element id to hide
 */
function hide(id){
    console.debug("hiding",id)
    var elem =  document.getElementById(id)
    elem.style.display="none"
}