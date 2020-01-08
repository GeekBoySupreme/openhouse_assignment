var page_param;
var last_value;

//var name="Yoda";
//document.getElementById('user_name').innerHTML=name;

//controlling page tabs visibility for onboarding
function changepage(page_param)
{
    switch(page_param)
    {
        case 2:
                document.getElementById("page_1").style.display="none";
                document.getElementById("page_2").style.display="block";
                document.getElementById("page_3").style.display="none";
                document.getElementById("page_4").style.display="none";
                break;

        case 3:
                document.getElementById("page_1").style.display="none";
                document.getElementById("page_2").style.display="none";
                document.getElementById("page_3").style.display="block";
                document.getElementById("page_4").style.display="none";
                break;

        case 4:
                document.getElementById("page_1").style.display="none";
                document.getElementById("page_2").style.display="none";
                document.getElementById("page_3").style.display="none";
                document.getElementById("page_4").style.display="block";
                break; 
    }
}


//fetches the json and renders data in the page
function showdemo()
{
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
                    <div class="row"\
                    <div class="tab col-lg-4">\
                    <div class="tablinks"><b>'+ subject.timing.day_1 +'</b><br>'+ subject.timing.time_1[0] +'</div>'
                    '</div>\
                    <div class="tab" col-lg-4>\
                    <div class="tablinks"><b>'+ subject.timing.day_2 +'</b><br>'+ subject.timing.time_2[0] +'</div>'
                    '</div>\
                    <div class="tab" col-lg-4>\
                    <div class="tablinks"><b>'+ subject.timing.day_3 +'</b><br>'+ subject.timing.time_3[0] +'</div>'
                    '</div>\
                        </div>\
                    </div>\
                </div>';
                    return template;
                }
               
                //This URL can be replaced with the Endpoint that would serve a JSON 
                var queryUrl='https://openhouseparent.netlify.com/subject_details.json';

    
                var html = '';
                $.getJSON(queryUrl, function (subjects) {
                subjects.forEach(function (subject) {
                    html += getTemplate(subject);
                });
                $('#container-subject').append(html);
            });
        
}

var key=0;

function gettime(time, day, subject)
{
    var code='';
    for(var i=0; i<time.length; i++){
        var parameters="'"+subject+"','"+day+"','"+time[i]+"','"+key+"'";
        code +='<button class="btn btn-primary btn-round" id="'+ subject +'/'+ day + key +'" onclick="addToConfirmation('+ parameters +')">'+ time[i] +'</button>';
        key++;
    }
    return code;
}


//Sends data to Validation Form
function addToConfirmation(subject, day, time, key)
{
    html='';

    var pill_id = subject+"/"+day+key;
    var pill = document.getElementById(pill_id);


    pill.style.background="#fc6666";
    pill.style.color="#ffffff";

    html='<div id='+ subject +'><h4 class="description">'+ subject+'</h4><h5>'+day+' '+time +'</h5></div><p>&nbsp;</p>';

    document.getElementById("schedule_container").innerHTML += html;
    jsonBuilder(subject, day, time);

    return false;

}


//sends timelsot data to server
function sendToServer()
{
    //Redirecting to Success Page
    window.location = 'appointment.html', true;//disable to see the json data being dumped in console
    
    //Sending POST Request to a fake Server - for now
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(schedule),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
  //dumping json in console to validate. Won't be visible as window.location is set
}



//To Build Final Information JSON
var schedule = {};
var timeslots = []
schedule.timeslots = timeslots;

//builds the json with preferred timeslots
function jsonBuilder(subject, day, time)
{
    var subject_name = subject;
    var day_of_week = day;
    var timeslot= time;

    var slot={
        "subject_name": subject_name,
        "day_of_week": day_of_week,
        "timeslot":timeslot,
        "username":name
    }

    schedule.timeslots.push(slot);
}
