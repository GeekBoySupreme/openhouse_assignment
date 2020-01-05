var page_param;
var last_value;

var name="Yoda";
document.getElementById('user_name').innerHTML=name;

function changepage(page_param)
{
    switch(page_param)
    {
        case 2:
                document.getElementById("page_1").style.display="none";
                document.getElementById("page_2").style.display="block";
                document.getElementById("page_3").style.display="none";
                document.getElementById("page_4").style.display="none";
                document.getElementById("page_5").style.display="none";
        break;

        case 3:
                document.getElementById("page_1").style.display="none";
                document.getElementById("page_2").style.display="none";
                document.getElementById("page_3").style.display="block";
                document.getElementById("page_4").style.display="none";
                document.getElementById("page_5").style.display="none";
        break;

        case 4:
                document.getElementById("page_1").style.display="none";
                document.getElementById("page_2").style.display="none";
                document.getElementById("page_3").style.display="none";
                document.getElementById("page_4").style.display="block";
                document.getElementById("page_5").style.display="none";
        break;

        case 5:
                document.getElementById("page_1").style.display="none";
                document.getElementById("page_2").style.display="none";
                document.getElementById("page_3").style.display="none";
                document.getElementById("page_4").style.display="none";
                document.getElementById("page_5").style.display="block";

                showdemo();
        break;
         
    }
}


//fetches the json and renders data in the page
function showdemo()
{
    console.log("Heck Yas");

        document.getElementById('container-subject').innerHTML='';
    
                function getTemplate(subject) {

                    var template = '<div class="col-lg-4 card">\
                    <div class="clearfix float-my-children">\
                    \
                        <div class="subject-details">\
                            <h3 class="description"><b>' +
                    subject.subject_name + '</b></h3>\
                            <h5><b>Fees : Rs.' + subject.fees +
                    '<b></h5>\
                    \
                    <div class="tab">\
                    <div class="tablinks"><b>'+ subject.timing.day_1 +'</b></div>'+
                    gettime(subject.timing.time_1)+
                    '</div>\
                    <div class="tab">\
                    <div class="tablinks"><b>'+ subject.timing.day_2 +'</b></div>'+
                    gettime(subject.timing.time_2)+
                    '</div>\
                    <div class="tab">\
                    <div class="tablinks"><b>'+ subject.timing.day_3 +'</b></div>'+
                    gettime(subject.timing.time_3)+
                    '</div>\
                        </div>\
                    </div>\
                </div>';
                    return template;
                }
               
                var queryUrl='https://openhouseparent.netlify.com/subject_details.json';

    
                var html = '';
                $.getJSON(queryUrl, function (subjects) {
                subjects.forEach(function (subject) {
                    html += getTemplate(subject);
                });
                $('#container-subject').append(html);
            });
        
}


function gettime(time)
{
    var code='';
    for(var i=0; i<time.length; i++){
        code +='<button class="btn btn-primary btn-round">'+ time[i] +'</button>';
    }
    return code;
}
