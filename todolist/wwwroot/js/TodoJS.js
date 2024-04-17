$(document).ready(function () {   
   
   GetTodos();

});

/*Read Data*/
function GetTodos() {
    $.ajax({
        url: '/todo/GetTodos',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                var object = '';
                object += '<tr>';
                object += '<td colspan="5">' + 'Todo list is not available' + '</td>';
                object += '</tr>';
                $('#tblBody').html(object);
            }
            else {
                var object = '';
                $.each(response, function (index, item) {
                    object += '<tr>';
                    object += '<td>' + item.id + '</td>';
                    object += '<td>' + item.description + '</td>';
                    if (item.isComplete == false) {
                        item.isComplete = 'No';
                    } else {
                        item.isComplete = 'Yes';
                    }
                    object += '<td>' + item.isComplete + '</td>';
                    object += '<td> <a href = "#" class="btn btn-primary btn-sm" onclick="Edit(' + item.id + ')">Edit</a> <a href="#" class="btn btn-danger btn-sm" onclick="Delete(' + item.id + ')">Delete</a></td>';
                });
                $('#tblBody').html(object);
            }
        },
        error: function () {
            alert('Unable to retrive Todo list');
        }
    })
}

$('#btnAdd').click(function () {
    $('#TodoModal').modal('show');
    $('#modalTitle').text('Add todo');
})

/*Insert Data*/
function Insert() {
    var result = Validate();
    if (result == false) {
        return false;
    }

    var formData = new Object();
    formData.id = $('#Id').val();
    formData.description = $('#Description').val();
    formData.isComplete = $('#IsComplete').is(':checked');

    $.ajax({
        url: '/todo/Insert',
        data: formData,
        type: 'post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to save todo')
            }
            else {
                HideModal();
                GetTodos();
                alert(response)
            }
        },
        error: function () {
            alert('Unable to save todo')
        }
    })
}

/*Get and Edit Data*/
function Edit(id) {
    $.ajax({
        url: 'todo/GetById?id=' + id,
        type: 'get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            if (response == null || response == undefined) {
                alert('Unable to retrieve data');
            } else if (response.length == 0) {
                alert('There is no data with the id' + id);
            } else {
                $('#TodoModal').modal('show');
                $('#modalTitle').text('Update todo');
                $('#Save').css('display', 'none');
                $('#Update').css('display', 'block');

                $('#Id').val(response.id);
                $('#Description').val(response.description);
                $('#IsComplete').val(response.isComplete);
            }
        },
        error: function () {
            alert('Unable to retrieve data');
        }
    })
}

/*Update Data*/
function Update() {
    var result = Validate();
    if (result == false) {
        return false;
    }

    var formData = new Object();
    formData.id = $('#Id').val();
    formData.description = $('#Description').val();
    formData.isComplete = $('#IsComplete').is(':checked');

    $.ajax({
        url: 'todo/Update',
        data: formData,
        type: 'post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to save the data');
            } else {
                HideModal();
                GetTodos();
                alert(response);
            }
        },
        error: function () {
            alert('Unable to save the data');
        }
    })
}

/*Delete Data*/
function Delete(id) {
    if (confirm('Are you sure you want to delete this record')) {
        $.ajax({
            url: 'todo/Delete?id=' + id,
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (response) {
                if (response == null || response == undefined) {
                    alert('Unable to delete data');
                } else if (response.length == 0) {
                    alert('Unable to delete data' + id);
                } else {
                    GetTodos();
                    alert(response);
                }
            },
            error: function () {
                alert('Unable to delete data');
            }
        })
    }
}

function HideModal() {
    ClearData();
    $('#TodoModal').modal('hide');
}

function ClearData() {
    $('#Description').val('');
    $('#IsComplete').prop('checked', false);
    $('#Description').css('border-color', 'lightgrey');
}

function Validate() {
    var isValid = true;

    if ($('#Description').val().trim() == "") {
        $('#Description').css('border-color', 'red');
        isValid = false;
    } else {
        $('#Description').css('border-color', 'lightgrey');
    }
    return isValid;
}

$('#Description').on('change', (function () {
    Validate();
}));