/**
* Admin Forms Controller
* @desc controls the Admin Forms View
* @param AdminService
* @return
*/

myApp.controller('AdminFormsController', ['AdminService',
function(AdminService){
  var forms = this;
  console.log('AdminFormsController sourced');

  AdminService.getAllForms();
  forms.allForms = AdminService.allForms;

  forms.query = {
    order: 'name',
    limit: 25,
    page: 1
  };

  //submits a new/edited item
  var formToSend = {};
  forms.sendForm = function() {
    //validates input. disgusting. needs refactor, bad -- push to array with forloop, instead, maybe?
    if (!forms.form_name) {
      console.log('need a name!');
      return;
    } else{
      formToSend.form_name = forms.form_name;
      if (forms.q1_prompt) {
        formToSend.q1_prompt = forms.q1_prompt;
      }else {
        console.log('need at least 1 question!');
      }//end q1 else
      if (forms.q2_prompt) {
        formToSend.q2_prompt = forms.q2_prompt;
        if (forms.q3_prompt) {
          formToSend.q3_prompt = forms.q3_prompt;
          if (forms.q4_prompt) {
            formToSend.q4_prompt = forms.q4_prompt;
            if (forms.q5_prompt) {
              formToSend.q5_prompt = forms.q5_prompt;
            }
          }
        }
      }
    }//end form_name else
    console.log("we're gonna send: ", formToSend);
      // if (editing) {
      //   editing = false;
      //   item.id = $scope.itemID;
      //   ItemService.updateItem(item);
      // } else {
        AdminService.addNewForm(formToSend);
      // }
      // $scope.clearFields();
  };


}]);
