/**
* Admin Forms Controller
* @desc controls the Admin Forms View
* @param AdminService
* @return
*/

myApp.controller('AdminFormsController', ['AdminService',
function(AdminService){
  var forms = this;
  var formToSend = {
    form_name: '',
    prompts: [],
  };
  forms.prompts = [];
  var editingForm = false;

  console.log('AdminFormsController sourced');

  AdminService.getAllForms();
  forms.allForms = AdminService.allForms;

  //delimits # forms/page
  forms.query = {
    order: 'name',
    limit: 25,
    page: 1
  };

  //clears all ng-model fields
  forms.clearFields = function() {
    forms.form_name = '';
    forms.prompts = [];
  };

  //displays an item for editing
  forms.editForm = function(form) {
    console.log("you editing now, on: ", form);
    editingForm = true;
    forms.form_name = form.form_name;
    forms.prompts[0] = form.q1_prompt;
    forms.prompts[1] = form.q2_prompt;
    forms.prompts[2] = form.q3_prompt;
    forms.prompts[3] = form.q4_prompt;
    forms.prompts[4] = form.q5_prompt;
    formToSend.id = form.id;
  };

  //submits a new/edited item
  forms.sendForm = function() {
    if (!forms.form_name || !forms.prompts[0]) {
      console.log('need a name and 1 q!');
      return;
    } else{
      formToSend.form_name = forms.form_name;
      for (var i = 0; i < forms.prompts.length; i++) {
        formToSend.prompts.push(forms.prompts[i]);
      }
    }
    if (editingForm) {
      editingForm = false;
      console.log('here the editing form:', formToSend);
      AdminService.updateForm(formToSend);
    } else {
      AdminService.addNewForm(formToSend);
    }
    forms.clearFields();
  };


}]);
