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

                    var template = '<div class="col-lg-6 card">\
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
                    gettime(subject.timing.time_1, subject.timing.day_1, subject.subject_name)+
                    '</div>\
                    <div class="tab">\
                    <div class="tablinks"><b>'+ subject.timing.day_2 +'</b></div>'+
                    gettime(subject.timing.time_2, subject.timing.day_2, subject.subject_name)+
                    '</div>\
                    <div class="tab">\
                    <div class="tablinks"><b>'+ subject.timing.day_3 +'</b></div>'+
                    gettime(subject.timing.time_3, subject.timing.day_3, subject.subject_name)+
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


function gettime(time, day, subject)
{
    var code='';
    for(var i=0; i<time.length; i++){
        var parameters="'"+subject+"','"+day+"','"+time[i]+"'";
        code +='<button class="btn btn-primary btn-round '+ subject +'/'+ day +'" id="'+ subject +'/'+ day +'" onclick="addToConfirmation('+ parameters +')">'+ time[i] +'</button>';
    }
    return code;
}



function addToConfirmation(subject, day, time)
{
    html='';
    //console.log("Function Hit");
    console.log(subject+" "+day+" "+time);
    var pill_id = subject+"/"+day;
    var pill = document.getElementById(pill_id);

    var pill_class = subject+"/"+day;
    var pill_cluster = document.getElementsByClassName(pill_class);

    for (i = 0; i < pill_cluster.length; i++) {
        pill_cluster[i].className = pill_cluster[i].className.replace(" active", "");
      }

    pill.style.background="#fc6666";
    pill.className += "active";


    html='<div id='+ subject +'><h4 class="description">'+ subject+'</h4><h5>'+day+' '+time +'</h5></div><p>&nbsp;</p>';

    document.getElementById("schedule_container").innerHTML += html;


    //Sending POST Request to a fake Server
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      subject_name: subject,
      day_of_week: day,
      timeslot: time,
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))

}