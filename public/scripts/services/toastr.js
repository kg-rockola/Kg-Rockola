rockola.factory('toastr', [ // Dependencies
                          function (
                            // Dependencies
                          ){

    // Main object.
    var toastr_service = {};

    // Options.
    toastr.options = {
      positionClass   : 'toast-top-full-width',
      extendedTimeOut : 5000, //1000;
      progressBar     : true,
      timeOut         : 1000
    };

    // Methods.
    function Toast(type, css, msg){
      this.type = type;
      this.css  = css;
      this.msg  = msg;
    }

    toastr_service.toast = function(type, css, msg){
      var new_toast = new Toast(type, css, msg);

      toastr.options.positionClass = new_toast.css;
      toastr[new_toast.type](new_toast.msg);

    };


    // Return object.
    return toastr_service;
  
}]);