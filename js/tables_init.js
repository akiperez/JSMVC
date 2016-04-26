$(function () {
    var data ='{"theFinData":[{"ticker": "APPL","volume": 6},{"ticker": "MSFT","volume": 8},{"ticker": "GE","volume": 10},{"ticker": "DIS","volume": 2},{"ticker": "PEP","volume": 1},{"ticker": "T","volume": 5}]}';

    var model = new TableModel(data),
        view = new TableView(model, {
            'table': $('#financialDataTable'),
                'ticker': $('#ticker'),
                'volume': $('#volume'),
                'submitButton': $('#submitButton')
        }),
        controller = new TableController(model, view);

    view.show();
});