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
      form_name: '',
      promptsArray: ['On a scale of 1-10 how would you rate your event today?'],
      id: '',
    };

    /**
     * @global tells the program whether we are editing the form or not.
     * If the form is being edited it sends the form on a different route.
     */
    forms.editingForm = false;
    /**
     * @desc Admin gets all the forms
     * @param
     * @return all forms object
     */
    AdminService.getAllForms(function(rows) {
      forms.allForms = rows;
      console.log("all forms controllers: ", forms.allForms);
    });
    /**
     * @desc clears all ng-model fields
     */
    forms.clearFields = function() {
      forms.prompts = {
        form_name: '',
        promptsArray: ['On a scale of 1-10 how would you rate your event today?'],
        id: '',
      };
    };

    /**
    * @function addQuestion
    * @desc adds a question to the form
    * @param empty question string
    * @return pushes new question into promptsArray
    */
    forms.addQuestion = function () {
      var newQuestion = '';
      forms.prompts.promptsArray.push(newQuestion);
    };

    /**
     * @function editForm
     * @desc displays an item for editing
     * @param {object} form
     * @return form that is being sent, changes editingForm to true
     */
    forms.editForm = function(form) {
      forms.clearFields();
      forms.editingForm = true;
      forms.prompts = {
        form_name: form.form_name,
        promptsArray: [form.q1_prompt, form.q2_prompt, form.q3_prompt, form.q4_prompt, form.q5_prompt],
        id: form.id
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
          form_name: form.form_name,
          prompts: [],
          id: form.id
        };
        for (var i = 0; i < form.promptsArray.length; i++) {
          formToSend.prompts.push(form.promptsArray[i]);
        }
      }
      if (forms.editingForm) {
        forms.editingForm = false;
        AdminService.updateForm(formToSend, function(rows) {
          forms.allForms = rows;
        });
      } else {
        AdminService.addNewForm(form, function(rows) {
          forms.allForms = rows;
        });
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
        AdminService.deleteForm(form.id, function(rows) {
          forms.allForms = rows;
        });
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
        console.log("onkeydown");
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
    forms.toggleForm = function() {
      var itemToOpen = document.getElementById('form-container');
      itemToOpen.classList.toggle("ng-hide");
    };

    forms.falseForm = function() {
      forms.editingForm = false;
    };


  }
]);
