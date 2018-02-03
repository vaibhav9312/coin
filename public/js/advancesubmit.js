var count = 1;

$("#addmember").click(function(){
    $("#mcount").val(count);
    // var uy=count-1;
    // var name=$("#fullname"+uy+"").val();
    // var img=$("#profileimg"+uy+"").val();
    // var posi=$("#position"+uy+"").val();
    // var short=$("#shortbio"+uy+"").val();
    // console.log(name!='')
    // console.log(name)
    // if(name!=''||img!=''||posi!=''||short!=''){
            $(".panel").append("<div class='formhandler' id='first"+count+"'><div class='panel-heading'><h4 class='teamheading'>Team Members</h4><span class='fa fa-times' id='"+count+"' onclick='myFunction("+count+")'></span></div><div class='col-md-12'><div class='col-md-2'><h4 class='teamhtag'>Full Name<span class='asterisk'>*</span></h4></div><div class='col-md-4'><input type='text' class='form-control' placeholder='Full Name' id='fullname"+count+"' required ></div><div class='col-md-2'></div><div class='clear'></div></div><div class='col-md-12'><div class='col-md-2'><h4 class='teamhtag'>Picture<span class='asterisk'>*</span></h4></div><div class='col-md-4'><input class='form-control' id='filedata"+count+"' onchange='submit1("+count+")' type='file' accept='image' required /></div><input type='text' style='display:none' id='profileimg"+count+"' name='profileimg' /><div class='col-md-2'></div><div class='clear'></div></div><div class='col-md-12'><div class='col-md-2'><h4 class='teamhtag'>Position<span class='asterisk'>*</span></h4></div><div class='col-md-4'><input type='text' id='position"+count+"' class='form-control' placeholder='Position' required ></div><div class='col-md-2'></div><div class='clear'></div></div><div class='col-md-12' style='margin-bottom:10px'><div class='col-md-2'><h4 class='teamhtag'>Short Bio<span class='asterisk'>*</span></h4></div><div class='col-md-4'><textarea class='form-control inputtag' maxlength='256'   rows='6'  id='shortbio"+count+"' placeholder='Short Bio' style='margin-bottom:0px' required></textarea> </div><div class='col-md-2'></div><div class='clear'></div></div><div class='col-md-12'><div class='col-md-2'><h4 class='teamhtag'>Linkedin</h4></div><div class='col-md-4'><input type='text' id='linkedin"+count+"' class='form-control' placeholder='linkedin link'></div><div class='col-md-2'></div><div class='clear'></div></div><div class='col-md-12'><div class='col-md-2'><h4 class='teamhtag'>Upload ID (Passport)</h4></div><div class='col-md-4'><input class='form-control' id='passportid"+count+"' onchange='passport("+count+")' type='file' accept='image' /></div><div class='col-md-2'></div><input type='text' style='display:none' id='passportimg"+count+"' name='passportimg' /><div class='clear'></div></div></div></div>")

            //allmembers(count);
            count++;
    // }else{
    //     alert('Please Fill Required Data of the Team Member')
    // }
});

function myFunction(id){

$("#first"+id).remove();
count--;
}