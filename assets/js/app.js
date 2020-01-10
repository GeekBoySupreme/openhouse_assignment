var page_param;
var last_value;
var subject_dump_tracker = new Array(0);

var name="Yoda";
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

function formatcode(day_name)
{
    var code;
    var day_truncate, icon;
    switch(day_name)
    {
        case "Monday":
            day_truncate="Mon";
            icon='<i class="fas fa-biking"></i>';
        break;
        case "Tuesday":
            day_truncate="Tue";
            icon='<i class="fas fa-hiking"></i>';
        break;
        case "Wednesday":
            day_truncate="Wed";
            icon='<i class="fa fa-shoe-prints"></i>';
        break;
        case "Thursday":
            day_truncate="Thu";
            icon='<i class="fas fa-skiing"></i>';
        break;
        case "Friday":
            day_truncate="Fri";
            icon='<i class="fas fa-skating"></i>';
        break;
        case "Saturday":
            day_truncate="Sat";
            icon='<i class="fas fa-running"></i>';
        break;
        case "Sunday":
            day_truncate="Sun";
            icon='<i class="fas fa-bicycle"></i>';
        break;
    }

    code = icon+'<br>'+day_truncate;
    return code;
}

//fetches the json and renders data in the page
var sub_counter=0;
function showdemo()
{
        
    document.getElementById('container-subject').innerHTML='';

                function getTemplate(subject) {

                    var subject_id_1 = subject.subject_name + subject.timing.batch_1[0];
                    var subject_id_2 = subject.subject_name + subject.timing.batch_2[0];
                    var subject_id_3 = subject.subject_name + subject.timing.batch_3[0];

                    var just_subject="'"+subject.subject_name+"'"

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
                    <button class="tablinks '+ subject.subject_name +'" id="'+ subject.subject_name+subject.timing.batch_1[0]+subject.timing.batch_1[1] +'" onclick="showWidgetPanel('+just_subject+','+sub_1+','+sub_2+','+sub_3+',event)"><b>'+ formatcode(subject.timing.batch_1[0]) +'<br><br>'+ subject.timing.batch_1[1] +'</b></button>\
                    <button class="tablinks '+ subject.subject_name +'" id="'+ subject.subject_name+subject.timing.batch_1[0]+subject.timing.batch_2[1] +'" onclick="showWidgetPanel('+just_subject+','+sub_2+','+sub_1+','+sub_3+',event)"><b>'+ formatcode(subject.timing.batch_2[0]) +'<br><br>'+ subject.timing.batch_2[1] +'</b></button>\
                    <button class="tablinks '+ subject.subject_name +'" id="'+ subject.subject_name+subject.timing.batch_1[0]+subject.timing.batch_3[1] +'" onclick="showWidgetPanel('+just_subject+','+sub_3+','+sub_2+','+sub_1+',event)"><b>'+ formatcode(subject.timing.batch_3[0]) +'<br><br>'+ subject.timing.batch_3[1] +'</b></button>\
                    </div>\
                    \
                    <div id="'+ subject_id_1 +'" class="widget_panel">\
                    '+ gettime(subject.timing.batch_1, subject.subject_name) +'\
                    </div>\
                    <div id="'+ subject_id_2 +'" class="widget_panel">\
                    '+ gettime(subject.timing.batch_2, subject.subject_name) +'\
                    </div>\
                    <div id="'+ subject_id_3 +'" class="widget_panel">\
                    '+ gettime(subject.timing.batch_3, subject.subject_name) +'\
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

//Storing Subjects in an array. Declaring a Static Array Here, but we can also write a simple loop to count the number of 
//subjects m,entioned in the input json. 
//The array will have one row per subject

function gettime(timing, subject)
{
    var code='';
    for(var i=2; i<timing.length; i++){
        var parameters="'"+subject+"','"+timing[0]+"','"+timing[1]+"','"+timing[i]+"','"+key+"'";
        code +='<button class="btn btn-round time_pill '+ subject +'_1" id="'+ subject +'/'+ timing[0] + key +'" onclick="addToConfirmation('+ parameters +', event)"><b>'+ timing[i] +'</b></button>';
        key++;
    }
    return code;
}

//Shows widget panel
function showWidgetPanel(subject, widget_id_1, widget_id_2, widget_id_3, evt)
{
    var tablinks, i;
    tablinks = document.getElementsByClassName(subject);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";


  document.getElementById(widget_id_1).style.display="block";
  document.getElementById(widget_id_2).style.display="none";
  document.getElementById(widget_id_3).style.display="none";
}


var holder=0;
//Sends data to Validation Form
function addToConfirmation(subject, day, time, date, key, evt)
{
    var date_pill, i;
    date_pill = document.getElementsByClassName(subject+"_1");
    for (i = 0; i < date_pill.length; i++) {
      date_pill[i].className = date_pill[i].className.replace(" active", "");
      date_pill.disabled=false;
    }

    evt.currentTarget.className += " active";
    document.getElementById(subject+"/"+day+key).disabled = true;

    html='';


    var subject_id=subject+"_0"+key+holder;
    var sub_param="'"+subject+"'";
    var keyid="'"+key+"'";
    var hold_pill=holder;
    html='<div id='+ subject_id +'><h4 class="description">'+ subject+'<span onclick="removeToDump('+ sub_param +', '+ keyid +', '+ hold_pill +')" class="topright">&times</span></h4><h5>'+day+' '+time +'<br>' + date + '</h5><p>&nbsp;</p></div>';

    document.getElementById("schedule_container").innerHTML += html;
    jsonBuilder(subject, day, time, date, subject_id);

    holder++;
    return false;

}

function removeToDump(another_parameter, keyid, hold)
{
    //Removing from List
    another_parameter_1=another_parameter+"_0"+keyid+hold;
    subject_dump_tracker.push(another_parameter_1);

    //document.getElementById(another_parameter_1).style.display="none";
    var element = document.getElementById(another_parameter_1);
    element.parentNode.removeChild(element);



    //Removing Active from Pill
    date_pill = document.getElementsByClassName(another_parameter+"_1");
    for (var i = 0; i < date_pill.length; i++) {
      date_pill[i].className = date_pill[i].className.replace(" active", "");
    }

    //Removing Active from Tablink
    date_pill = document.getElementsByClassName(another_parameter);
    for (var i = 0; i < date_pill.length; i++) {
      date_pill[i].className = date_pill[i].className.replace(" active", "");
    }
}


//sends timelsot data to server
function sendToServer()
{
    //Redirecting to Success Page
    //window.location = 'appointment.html', true;//disable to see the json data being dumped in console
    console.log(timeslots);
    console.log(subject_dump_tracker);

    for(var a=0; a<schedule.timeslots.length; a++)
    {
        if(subject_dump_tracker.indexOf((schedule.timeslots[a]).subject_id)!=-1)
            schedule.timeslots.splice(a,1);

    }
    

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

  subject_dump_tracker = new Array(0);

}



//To Build Final Information JSON
var schedule = {};
var timeslots = []
schedule.timeslots = timeslots;

//builds the json with preferred timeslots
function jsonBuilder(subject, day, time, date, subjectid)
{
    var subject_name = subject;
    var day_of_week = day;
    var timeslot= time;
    var date_class = date;

    var slot={
        "subject_id": subjectid,
        "subject_name": subject_name,
        "day_of_week": day_of_week,
        "timeslot":timeslot,
        "date":date_class,
        "username":name
    }

    schedule.timeslots.push(slot);
}
