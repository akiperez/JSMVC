/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function TableController(model, view) {
  this._model = model;
  this._view = view;

  var _this = this;
  
  this._view.submitButtonClicked.attach(function(){
    _this.addTicker();
  })

}

TableController.prototype = {

  addTicker: function(){
    //call to the add function in the model
    var tickerValue = $('#ticker').val().toUpperCase();
    var volumeValue = $('#volume').val();

    if(tickerValue != "" && volumeValue != ""){
      var tickerToAdd = {"ticker":tickerValue,"volume":parseInt(volumeValue)};  
    }

    if(tickerToAdd){
      this._model.addTicker(tickerToAdd);
    }

  }
    
};