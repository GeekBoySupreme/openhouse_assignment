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
                    var template = '<div class="col-lg-4 wow fadeIn" data-wow-delay="0.2s">\
                        <div class="card_subject">\
                            <h3 class="description>' + subject.subject_name +'</h3>\
                            <div class="card-body">\
                                <h4 class="description">Fees : Rs.' +
                        subject.fees + '</h4>\
                        \
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

                var queryUrl='https://openhouseparent.netlify.com/subject_details.json';

    
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