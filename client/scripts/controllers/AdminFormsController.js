/**
 * Admin Forms Controller
 * @desc controls the Admin Forms View
 * @param AdminService
 */
myApp.controller('AdminFormsController', ['$mdDialog', 'AdminService',
  function($mdDialog, AdminService) {
    var forms = this;

    /**
     * @global object that limits table's display length
     */
     forms.query = {
      order: 'name',
      limit: 25,
      page: 1
    };

    /**
     * @global object that gets populated with form-data to add/edit
     */
    var formToSend = {
      form_name: '',
      prompts: [],
    };

    /**
     * @global array that gets populated with ng-model question prompts
     */
    forms.prompts = [];

    /**
     * @global variable that functions use to determine whether to
     * create a new form in the db (or edit a prexisting one)
     */
    var editingForm = false;

    AdminService.getAllForms();
    forms.allForms = AdminService.allForms;

    /**
     * @desc clears all ng-model fields
     */
    function clearFields() {
      forms.form_name = '';
      forms.prompts = [];
    }

    /**
     * @desc displays an item for editing
     * @param {object} form the form to be edited
     */
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

    /**
     * @desc composes and submits a new/edited item
     */
    forms.sendForm = function() {
      if (!forms.form_name || !forms.prompts[0]) {
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
    };

    /**
     * @desc displays an alert dialog if a form is incomplete
     */
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

    /**
     * @desc displays a popup when 'delete' button is clicked, then
     * deletes specific form if popup is confirmed
     * @param {object} form the form to be deleted
     */
    forms.confirmDelete = function(form) {
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
