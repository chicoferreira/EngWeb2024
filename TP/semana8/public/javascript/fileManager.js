$(function () {

});

function showImage(fname, ftype) {
    var download = $('<div> <a href="/download/' + fname + '">Download</a> </div>');
    if (ftype == 'image/png' || ftype == 'image/jpeg') {
        var ficheiro = $('<img>').attr('src', '/filestore/' + fname).attr('width', '80%');
        $('#display').empty().append(ficheiro).append(download).modal();
    } else {
        var ficheiro = $('<p>').text('Ficheiro: ' + fname);
        $('#display').empty().append(ficheiro).append(download).modal();
    }
}