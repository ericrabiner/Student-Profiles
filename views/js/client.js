const studentDoms = $(".row");

$('#searchName').on('input', function() {
    let inputText = $(this).val().toLowerCase();
    if(inputText != '') {
        for (var i = 0; i < studentDoms.length; i++) {
            if (!($(`#${i} .col-md-7 h3`).html().toLowerCase().match(inputText))) {
                studentDoms[i].style.display = "none";
            }
        }
    } 
    else {
        for (var i = 0; i < studentDoms.length; i++) {
            studentDoms[i].style.display = "";
        }
    }
});

$('#searchTag').on('input', function() {
    let inputText = $(this).val().toLowerCase();
    if(inputText != '') {
        for (var i = 0; i < studentDoms.length; i++) {
            let tags = ($(`#${i} .col-md-7 span`));
            let found = false;
            for (var j = 0; j < tags.length; j++) {
                if (tags[j].innerHTML.toLowerCase().match(inputText)) {
                    found = true;   
                }
            }
            if (!found) {
                studentDoms[i].style.display = 'none';
            }
        }
    } 
    else {
        for (var i = 0; i < studentDoms.length; i++) {
            studentDoms[i].style.display = "";
        }
    }
});


$(".expandableButton").click((obj) => {
    let rowIndex = obj.target.parentNode.parentNode.id;
    if (obj.target.innerHTML == "+") {
        obj.target.innerHTML = "-";
        $(`#${rowIndex} ul`).css({"display": "block"});
        $(`#${rowIndex} span`).css({"display": "inline"});
        $(`#${rowIndex} input`).css({"display": "block"});
    }
    else {
        obj.target.innerHTML = "+";
        $(`#${rowIndex} ul`).css({"display": "none"});
        $(`#${rowIndex} span`).css({"display": "none"});
        $(`#${rowIndex} input`).css({"display": "none"});
    }
});


$('.tagInput').bind("enterKey",function(data){
    let rowIndex = data.target.parentNode.parentNode.id;
    let newTag = $("<span/>").attr("class", "badge badge-primary").attr("id", "expandable").html(data.target.value).css("display", "inline");
    $(`#${rowIndex} .col-md-7`).append(newTag);
});
$('input').keyup(function(e){
    if(e.keyCode == 13) {
        $(this).trigger("enterKey");
    }
});
