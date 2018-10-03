
var builtFormValues={}

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
    console.log("returning form values", formValues)
    return formValues
}

function show(id){
    var elem = document.getElementById(id)
    elem.style.display=""

}
function hide(id){
    var elem =  document.getElementById(id)
    elem.style.display="none"
}