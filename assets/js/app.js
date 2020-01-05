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
    
                    var template = '<div class="col-lg-6 wow fadeIn" data-wow-delay="0.2s">\
                        <div class="card">\
                            <h3 class="description>' + subject.subject_name +'</h3>\
                            <div class="card-body" style="margin-top:-10px;">\
                                <h4 class="description" style="font-weight:600; color:rgb(69, 150, 231);">' +
                        subject.name + '</h4>\
                        <h5 class="title" style="font-weight:600; color:rgb(69, 150, 231);"><b>' + (new Date(subject.local_date).toString()).substring(0,15) + '</b>&nbsp;&nbsp;<span style="font-weight:600; color:white;">' + subject.local_time + '</span></h5>\
                        <h5 class="title" style="color:white;">' + subject.venue.name + ', <span style="color:white;">'+ subject.venue.address_1 +'</span></h5>\
                        <a target="blank" style="background:rgb(0,101,202);" class="btn" href="'+ subject.link +'"> <b>RSVP</b> &nbsp;&nbsp;<span class="number_badge">&nbsp;'+ subject.yes_rsvp_count +'&nbsp;</span></a>\
                            </div>\
                        </div>\
                    </div>';
                    return template;
                }
                var cards = ''; 
                var i=1;        
                var temp = '' ;
                var size = 0; //to check the size of the file
                var html = '';

                var queryUrl='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

    
                $.getJSON(queryUrl, function (subjects) {
                    subjects.forEach(function (){
                        size += 1
                    });
                });
                $.getJSON(queryUrl, function (subjects) {
                    subjects.forEach(function (subject) {
                        cards += getTemplate(subject);
                        if(i%3 == 0){
                            temp=
                            '<div class="row equal mt-5 wow">' + cards + '</div>' ;
                            cards = '';
                        };
                        html += temp;
                        temp = '';
                        if(i==size){
                            html += '<div class="row equal mt-5 wow">' + cards + '</div>' ;
                        };
                        i += 1;
                    });

                    $('#container-subject').append(html);

                
                });
        
}