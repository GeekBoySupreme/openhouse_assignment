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

var sub_1, sub_2, sub_3;

//fetches the json and renders data in the page
function showdemo()
{
        document.getElementById('container-subject').innerHTML='';

                function getTemplate(subject) {

                    var subject_id_1 = subject.subject_name + subject.timing.batch_1[0];
                    var subject_id_2 = subject.subject_name + subject.timing.batch_2[0];
                    var subject_id_3 = subject.subject_name + subject.timing.batch_3[0];

                    sub_1="'"+subject_id_1+"'";
                    sub_2="'"+subject_id_2+"'";
                    sub_3="'"+subject_id_3+"'";

                    var template = '<div class="col-lg-6 card">\
                    <div class="clearfix float-my-children">\
                    \
                        <div class="subject-details">\
                            <h3 class="description"><b>' +
                    subject.subject_name + '</b></h3>\
                            <h5 class="description">Fees : Rs.' + subject.fees +
                    '</h5>\
                    \
                    <div class="tab">\
                    <button class="tablinks" id="'+ subject.subject_name+subject.timing.batch_1[0]+subject.timing.batch_1[1] +'" onclick="showWidgetPanel('+sub_1+','+sub_2+','+sub_3+')"><b>'+ subject.timing.batch_1[0] +'<br><br>'+ subject.timing.batch_1[1] +'</b></button>\
                    <button class="tablinks" id="'+ subject.subject_name+subject.timing.batch_1[0]+subject.timing.batch_2[1] +'" onclick="showWidgetPanel('+sub_2+','+sub_1+','+sub_3+')"><b>'+ subject.timing.batch_2[0] +'<br><br>'+ subject.timing.batch_2[1] +'</b></button>\
                    <button class="tablinks" id="'+ subject.subject_name+subject.timing.batch_1[0]+subject.timing.batch_3[1] +'" onclick="showWidgetPanel('+sub_3+','+sub_2+','+sub_1+')"><b>'+ subject.timing.batch_3[0] +'<br><br>'+ subject.timing.batch_3[1] +'</b></button>\
                    </div>\
                    \
                    <div id="'+ subject_id_1 +'" class="widget_panel">\
                    '+ gettime(subject.timing.batch_1, subject.subject_name) +'\
                    </div>\
                    <div id="'+ subject_id_2 +'" class="widget_panel">\
                    '+ gettime(subject.timing.batch_2, subject.subject_name) +'\
                    </div>\
                    <div id="'+ subject_id_3 +'" class="widget_panel">\
                    '+ gettime(subject.timing.batch_1, subject.subject_name) +'\
                    </div>\
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

function gettime(timing, subject)
{
    var code='';
    for(var i=2; i<timing.length; i++){
        var parameters="'"+subject+"','"+timing[0]+"','"+timing[1]+"','"+timing[i]+"','"+key+"'";
        code +='<button class="btn btn-primary btn-round time_pill '+ subject +'" id="'+ subject +'/'+ timing[0] + key +'" onclick="addToConfirmation('+ parameters +')">'+ timing[i] +'</button>';
        key++;
    }
    return code;
}

//Shows widget panel
function showWidgetPanel(widget_id_1, widget_id_2, widget_id_3)
{
  document.getElementById(widget_id_1).style.display="block";
  document.getElementById(widget_id_2).style.display="none";
  document.getElementById(widget_id_3).style.display="none";
}

//Sends data to Validation Form
function addToConfirmation(subject, day, time, date, key)
{
    html='';

    var pill_id = subject+"/"+day+key;
    var pill = document.getElementById(pill_id);

    var check=document.getElementsByClassName(subject);
    for(var i=0; i<check.length; i++)
    {
      if(check[i].style.background=="#fc6666"){
        check[i].style.background="#f7d986";
        check[i].style.color="#000000";
      }
    }

    pill.style.background="#fc6666";
    pill.style.color="#ffffff";

    html='<div id='+ subject +'><h4 class="description">'+ subject+'</h4><h5>'+day+' '+time +'<br>' + date + '</h5></div><p>&nbsp;</p>';

    document.getElementById("schedule_container").innerHTML += html;
    jsonBuilder(subject, day, time, date);

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
function jsonBuilder(subject, day, time, date)
{
    var subject_name = subject;
    var day_of_week = day;
    var timeslot= time;
    var date_class = date;

    var slot={
        "subject_name": subject_name,
        "day_of_week": day_of_week,
        "timeslot":timeslot,
        "date":date_class,
        "username":name
    }

    schedule.timeslots.push(slot);
}
