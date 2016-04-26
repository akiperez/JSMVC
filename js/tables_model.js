/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
function TableModel(data) {
  this._data = data;
  this._jsonData = JSON.parse(data);
  this._tickers = this._jsonData.theFinData;
  this.tickerAdded = new Event(this);
}

TableModel.prototype = {
  getTickers: function(){
    return this._tickers;
  },

  setTickers: function(tickers){
    this._tickers = tickers;
  },

  addTicker: function(ticker){
    //check if ticker exists
    var hasTicker = this.hasTicker(ticker.ticker);
    if (hasTicker){
      this.updateExistingTicker(ticker);
    } else {
      this.createNewTicker(ticker);
    }

  },

  hasTicker: function (ticker){
    var tickers = this.getTickers();
    for (i = 0; tickers.length > i; i += 1) {
        if (tickers[i].ticker === ticker) {
            return true;
        }
    }
    return false;

  },
  
  updateExistingTicker:function (ticker){
    var tickerVolumeToAdd = ticker.volume;
    var tickers = this.getTickers();
    var currentTickerValue = this.getTickerValue(ticker.ticker);
    var newTickerVolume = tickerVolumeToAdd + currentTickerValue;
    this.updateTickerValue(ticker.ticker,newTickerVolume);
  },

  updateTickerValue: function(tickerName,newVolume){
    var tickers = this.getTickers();
    for (i = 0; tickers.length > i; i += 1) {
      if (tickers[i].ticker === tickerName) {
        tickers[i].volume = newVolume;
      }
    }
    this.setTickers(this._tickers);
    this.tickerAdded.notify({
      ticker: ticker
    });
  },

  getTickerValue : function(ticker){
   var tickers = this.getTickers();
    for (i = 0; tickers.length > i; i += 1) {
      if (tickers[i].ticker === ticker) {
        var existingTickervalue = tickers[i].volume;
        return existingTickervalue;
      }
    }
  },

  createNewTicker: function (ticker){
    this._tickers.push(ticker);
    this.setTickers(this._tickers);
    this.tickerAdded.notify({
      ticker: ticker
    });
  }
};