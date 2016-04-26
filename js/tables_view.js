/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
function TableView(model, elements) {
  this._model = model;
  this._elements = elements; 

  this.submitButtonClicked = new Event(this);

  var _this = this;

  //attach model listeners
  this._model.tickerAdded.attach(function(){
    _this.rebuildTable();
  });

  // this._model.tickerUpdated.attach(function(){
  //   _this.rebuildTable();
  // });

  //atach listeners to HTML controls
  this._elements.submitButton.click(function(){
    _this.submitButtonClicked.notify();
  })
    
}

TableView.prototype = {
  show: function(){
    this.rebuildTable();
  },

  rebuildTable: function(){
    var table, tickers, sortedTickers;
    table = this._elements.table;
    table.html('');
    tickers = this._model.getTickers();
    sortedTickers = tickers.sort(this.sortByProperty('volume'));
    this.buildHtmlTable(sortedTickers);
  },

  //Sort The Values
  sortByProperty: function(property) {
    return function (a, b) {
      var sortStatus = 0;
      if (a[property] > b[property]) {
        sortStatus = -1;
      } else if (a[property] < b[property]) {
        sortStatus = 1;
      }
      return sortStatus;
    };
  },

  // Builds the HTML Table out of jsonData json data from a restful service.
  buildHtmlTable: function(tickers){
    var columns = this.createColumnHeaders(tickers);
    for (var i = 0 ; i < tickers.length ; i++) {
      var row$ = $('<tr/>');
      for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
        var cellValue = tickers[i][columns[colIndex]];
        if (cellValue == null) {
          cellValue = "";
        }
        row$.append($('<td/>').html(cellValue));
      }
      $("#financialDataTable").append(row$);
    }
  },

  // Adds a header row to the table and returns the set of columns.
  // Need to do union of keys from all records as some records may not contain
  // all records
  createColumnHeaders: function(tickers) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');
    for (var i = 0 ; i < tickers.length ; i++) {
      var rowHash = tickers[i];
      for (var key in rowHash) {
        if ($.inArray(key, columnSet) == -1){
          columnSet.push(key);
          headerTr$.append($('<th/>').html(key));
        }
      }
    }
    $("#financialDataTable").append(headerTr$);
    return columnSet;
  } 
};