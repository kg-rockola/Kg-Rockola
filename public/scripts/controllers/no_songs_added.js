(function(){

'use strict';

rockola.controller('no_songs_added', [  'party',
                                      function(
                                         $party
                                      ) {

    // Controller alias.
    var _this = this;

    // Controller members.
    _this.party  = $party;

}]);


})();