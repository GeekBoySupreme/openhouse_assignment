var page_param;
var last_value;

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


function showdemo()
{
    console.log("Heck Yas");

        document.getElementById('container-subject').innerHTML='';
    
                function getTemplate(subject) {
                    console.log(subject.subject_name);
                    console.log(subject.fees);
                    console.log(subject.timing.day_1);
                    console.log(subject.timing.time_1.slot_1);
                    var template = '<div class="col-lg-4 wow fadeIn" data-wow-delay="0.2s">\
                        <div class="card_subject">\
                            <div class="card-body">\
                                <p><h4 class="description"><b>' + subject.subject_name + '</b></h4></p><h6>Fees : Rs.'
                        subject.fees + '</h6>\
                        \
                        <button class="accordion">'+ subject.timing.day_1 +'</button>\
                        <div class="panel">\
                        <p>Lorem ipsum...</p>\
                        </div>\
\
                        <button class="accordion">'+ subject.timing.day_2 +'</button>\
                        <div class="panel">\
                        <p>Lorem ipsum...</p>\
                        </div>\
\
                        <button class="accordion">'+ subject.timing.day_3 +'</button>\
                        <div class="panel">\
                        <p>Lorem ipsum...</p>\
                        </div>\
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