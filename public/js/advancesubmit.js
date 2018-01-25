var count = 1;
$("#addmember").click(function(){
    $("#mcount").val(count);
$(".panel").append("<div class='formhandler' id='first"+count+"'><div class='panel-heading'><h4 class='teamheading'>Team Members</h4><span class='fa fa-times' id='"+count+"' onclick='myFunction("+count+")'></span></div><div class='col-md-12'><div class='col-md-2'><h4 class='teamhtag'>Full Name<span class='asterisk'>*</span></h4></div><div class='col-md-4'><input type='text' class='form-control' placeholder='Full Name' id='fullname"+count+"' ></div><div class='col-md-2'></div><div class='clear'></div></div><div class='col-md-12'><div class='col-md-2'><h4 class='teamhtag'>Picture<span class='asterisk'>*</span></h4></div><div class='col-md-4'><input class='form-control' id='filedata"+count+"' onchange='submit1()' type='file' accept='image/png, application/pdf' /></div><input type='text' style='display:none' id='profileimg"+count+"' name='profileimg' /><div class='col-md-2'></div><div class='clear'></div></div><div class='col-md-12'><div class='col-md-2'><h4 class='teamhtag'>Position<span class='asterisk'>*</span></h4></div><div class='col-md-4'><input type='text' class='form-control' placeholder='Position'></div><div class='col-md-2'></div><div class='clear'></div></div><div class='col-md-12'><div class='col-md-2'><h4 class='teamhtag'>Short Bio<span class='asterisk'>*</span></h4></div><div class='col-md-4'><input type='text' class='form-control' placeholder='Short Bio'></div><div class='col-md-2'></div><div class='clear'></div></div><div class='col-md-12'><div class='col-md-2'><h4 class='teamhtag'>Linkedin</h4></div><div class='col-md-4'><input type='text' class='form-control' placeholder='linkedin link'></div><div class='col-md-2'></div><div class='clear'></div></div><div class='col-md-12'><div class='col-md-2'><h4 class='teamhtag'>Upload ID (Passport)</h4></div><div class='col-md-4'><input class='form-control' type='file' accept='image/png, application/pdf' /></div><div class='col-md-2'></div><div class='clear'></div></div></div></div>")

allmembers(count);
count++;

});

function myFunction(id){
 
$("#first"+id).remove();
count--;
}