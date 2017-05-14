/**
 * Admin Forms Controller
 * @desc controls the Admin Forms View
 * @param AdminService
 * @return
 */

myApp.controller('AdminFormsController', ['$mdDialog', 'AdminService',
  function($mdDialog, AdminService) {
    var forms = this;
    var formToSend = {
      form_name: '',
      prompts: [],
    };
    forms.prompts = [];
    var editingForm = false;

    AdminService.getAllForms();
    forms.allForms = AdminService.allForms;

    //delimits # forms/page
    forms.query = {
      order: 'name',
      limit: 25,
      page: 1
    };

    //clears all ng-model fields
    function clearFields() {
      forms.form_name = '';
      forms.prompts = [];
    }

    //displays an item for editing
    forms.editForm = function(form) {
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
        console.log('need a name and at least 1 q!');
        completeFields();
        return;
      } else {
        formToSend.form_name = forms.form_name;
        for (var i = 0; i < forms.prompts.length; i++) {
          formToSend.prompts.push(forms.prompts[i]);
        }
      }
      if (editingForm) {
        editingForm = false;
        AdminService.updateForm(formToSend);
      } else {
        AdminService.addNewForm(formToSend);
      }
      clearFields();
    }; // end sendForm

    function completeFields() {
      $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Incomplete form!')
        .textContent('Please include a form name and at least one question.')
        .ariaLabel('Alert Dialog')
        .ok('OK!')
      );
    }

    //popup when 'delete' button is clicked
    forms.confirmDelete = function(form) {
      console.log("this is the data you working with: ", form);
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this form?')
        .textContent('This will remove the form forever.')
        .ok('Yes')
        .cancel('No');
      $mdDialog.show(confirm).then(function() {
        AdminService.deleteForm(form.id);
      });
    };




  }
]);
