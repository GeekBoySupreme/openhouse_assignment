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


//fetches the json and renders data in the page
function showdemo()
{
    console.log("Heck Yas");

        document.getElementById('container-subject').innerHTML='';
    
                function getTemplate(subject) {
                    console.log(subject.subject_name);
                    console.log(subject.fees);
                    console.log(subject.timing.day_1);
                    console.log(subject.timing.time_1.slot_1);
                    var template = '<div class="col-lg-4 card">\
                    <div class="clearfix float-my-children">\
                    \
                        <div class="subject-details">\
                            <h4 class="description"><b>' +
                    subject.subject_name + '</b></h4><br />\
                            <h5><b>' + subject.fees +
                    '<b></h5>\
                    \
                    <div class="tab">\
                    <button class="tablinks" onclick="openCity(event, '+ subject.timing.day_1 +')">'+ subject.timing.day_1 +'</button>\
                    <button class="tablinks" onclick="openCity(event, '+ subject.timing.day_2 +')">'+ subject.timing.day_2 +'</button>\
                    <button class="tablinks" onclick="openCity(event, '+ subject.timing.day_3 +')">'+ subject.timing.day_3 +'</button>\
                    </div>\
\
                    <div id="'+ subject.timing.day_1 +'" class="tabcontent">\
                    <h3>London</h3>\
                    <p>London is the capital city of England.</p>\
                    </div>\
\
                    <div id="'+ subject.timing.day_2 +'" class="tabcontent">\
                    <h3>Paris</h3>\
                    <p>Paris is the capital of France.</p> \
                    </div>\
\
                    <div id="'+ subject.timing.day_3 +'" class="tabcontent">\
                    <h3>Tokyo</h3>\
                    <p>Tokyo is the capital of Japan.</p>\
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



//Controls opening of Tabs
function openCity(evt, day) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(day).style.display = "block";
    evt.currentTarget.className += " active";
  }