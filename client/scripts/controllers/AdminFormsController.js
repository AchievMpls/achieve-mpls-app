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

}]);
