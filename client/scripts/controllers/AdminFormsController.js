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


  forms.clearFields = function() {
    forms.form_name = '';
    forms.prompts = [];
  };

  //submits a new/edited item
  forms.sendForm = function() {
    if (!forms.form_name || !forms.prompts[0]) {
      console.log('forms now is: ', forms);
      console.log('need a name and 1 q!');
      return;
    } else{
      formToSend.form_name = forms.form_name;
      for (var i = 0; i < forms.prompts.length; i++) {
        formToSend.prompts.push(forms.prompts[i]);
      }
    }
    console.log("we're gonna send: ", formToSend);
      // if (editing) {
      //   editing = false;
      //   item.id = $scope.itemID;
      //   ItemService.updateItem(item);
      // } else {
        AdminService.addNewForm(formToSend);
      // }
      forms.clearFields();
  };


}]);
