/**
* Admin Forms Controller
* @desc controls the Admin Forms View
* @param AdminService
*/
myApp.controller('AdminFormsController', ['$mdDialog', 'AdminService', '$mdPanel', '$sce',
function($mdDialog, AdminService, $mdPanel, $mdPanelRef, $sce) {
  var forms = this;
console.log('forms controller sourced');
  /**
  * @global object that limits table's display length
  */
  forms.query = {
    order: 'name',
    limit: 25,
    page: 1
  };

  /**
  * @global array that gets populated with ng-model question prompts
  */
  forms.prompts = {
    form_name : '',
    promptsArray : [],
    id : '',
  };

  /**
  * @global tells the program whether we are editing the form or not.
  * If the form is being edited it sends the form on a different route.
  */
  var editingForm = false;

  AdminService.getAllForms();
  forms.allForms = AdminService.allForms;

  /**
  * @desc clears all ng-model fields
  */
  forms.clearFields = function () {
    forms.prompts = {
      form_name : '',
      promptsArray : [],
      id : '',
    };
  };

  /**
  * @desc displays an item for editing
  * @param {object} form the form to be edited
  */
  forms.editForm = function(form) {
    forms.clearFields();
    editingForm = true;
    forms.prompts = {
      form_name : form.form_name,
      promptsArray : [form.q1_prompt, form.q2_prompt, form.q3_prompt, form.q4_prompt, form.q5_prompt],
      id : form.id
    };
  };

  /**
  * @desc composes and submits a new/edited item
  */
  forms.sendForm = function(form) {
    console.log(form);
    var formToSend = {};
    if (!form.form_name || !form.promptsArray[0]) {
      completeFields();
      return;
    } else {
      formToSend = {
        form_name : form.form_name,
        prompts : [],
        id : form.id
      };
      for (var i = 0; i < form.promptsArray.length; i++) {
        formToSend.prompts.push(form.promptsArray[i]);
      }
    }
    if (editingForm) {
      editingForm = false;
      AdminService.updateForm(formToSend);
    } else {
      AdminService.addNewForm(formToSend);
    }
    forms.toggleForm();
    forms.clearFields();
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


  /**
  * @function On Key Press
  * @desc when the focus is on the window and the escape key is pressed, the form
  * is closed.
  * @param event
  * @return the @class ng-hide and aria-hidden are added to the form-container.
  * the @function clearFields is called to clear the fields on the form.
  */
  window.onkeydown = function(event) {
    var itemToClose = document.getElementById('form-container');
    if (event.keyCode === 27) {
      itemToClose.classList.add("ng-hide");
      itemToClose.setAttribute("aria-hidden", true);
      forms.clearFields();
    }
  };

  /**
  * @function On click
  * @desc closes popup when clicked outside
  * @param click
  * @return hides the popup form
  */
  document.getElementById('forms-background-darken').onclick = function() {
    var itemToClose = document.getElementById('form-container');
    itemToClose.classList.add('ng-hide');
    itemToClose.setAttribute('aria-hidden', true);
    forms.clearFields();
  };

  /**
  * @function Toggle form
  * @desc toggles the form from visible to hidden.
  * @param used on the ng-click of both the add form and edit form.
  * @return toggles the class ng-hide on form-container.
  */
  forms.toggleForm = function () {
    var itemToOpen = document.getElementById('form-container');
    itemToOpen.classList.toggle("ng-hide");
  };



}
]);
