function authenticate()
{
    var phone_number=document.getElementById("exampleInputPhone").value;
    var password=document.getElementById("exampleInputPassword1").value;
    console.log(phone_number);

    if ( phone_number == "000000" && password == "helloworld"){
        //alert("Successful");
        window.location = "onboard.html"; // Redirecting to other page.
        return false;
        }
        else{
            //document.getElementById("validate_message").style.display="block";
            document.getElementById("validate_message").innerHTML="Wrong Inputs! Try again."
        }
    
}