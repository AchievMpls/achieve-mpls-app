/**
 * Admin Forms Controller
 * @desc controls the Admin Forms View
 * @param AdminService
 */
myApp.controller('AdminFormsController', ['$mdDialog', 'AdminService', '$mdPanel', '$sce',
  function($mdDialog, AdminService, $mdPanel, $mdPanelRef, $sce) {
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
     * @global array that gets populated with ng-model question prompts
     */
    forms.prompts = {
      form_name : 'New Form',
      promptsArray : [1,2,3],
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
      form
      if (!form.form_name || !form.promptsArray[0]) {
        completeFields();
        return;
      } else {
        form.form_name = forms.form_name;
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

    //the rest of this is code to get $mdPanel to work.
    this._mdPanel = $mdPanel;


    forms.showDialog = function(object) {
      var wrapper = document.getElementById('main');
      console.log(wrapper);
      var position = this._mdPanel.newPanelPosition()
          .absolute()
          .center();
      var url = 'views/partials/newFormForm.html';
      var config = {
        attachTo: angular.element(wrapper),
        templateUrl: url,
        controller: 'AdminFormsController',
        controllerAs: 'forms',
        panelClass: 'demo-dialog-example',
        position: position,
        trapFocus: true,
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true,
        parent: wrapper
      };

      this._mdPanel.open(config);
    };


    forms._mdPanelRef = $mdPanelRef;


    forms.closeDialog = function() {
      this._mdPanelRef = forms._mdPanelRef;
      this._mdPanelRef && this._mdPanelRef.close();
      };
    forms.toggleForm = function () {
      forms.form = !forms.form;
    };
  }
]);
