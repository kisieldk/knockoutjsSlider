ko.bindingHandlers.jqSliderLoanAmount = {
	init: function (element, valueAccessor, allBindingsAccessor) {
		//initialize the control
		var options = allBindingsAccessor().jqOptions || {};
		$(element).slider(options).slider("pips").slider("float", {suffix:"k$"});

		//handle the value changing in the UI
		ko.utils.registerEventHandler(element, "slidechange", function () {
			//would need to do some more work here, if you want to bind against non-observables
			var observable = valueAccessor();
			observable($(element).slider("value"));
		});

	},
	//handle the model value changing
	update: function (element, valueAccessor) {
		var value = ko.utils.unwrapObservable(valueAccessor());
		$(element).slider("value", value);

	}


};
ko.bindingHandlers.jqSliderPeriodValue = {
	init: function (element, valueAccessor, allBindingsAccessor) {
		//initialize the control
		var options = allBindingsAccessor().jqOptions || {};
		$(element).slider(options).slider("pips").slider("float");

		//handle the value changing in the UI
		ko.utils.registerEventHandler(element, "slidechange", function () {
			//would need to do some more work here, if you want to bind against non-observables
			var observable = valueAccessor();
			observable($(element).slider("value"));
		});

	},
	//handle the model value changing
	update: function (element, valueAccessor) {
		var value = ko.utils.unwrapObservable(valueAccessor());
		$(element).slider("value", value);

	}


};

var viewModel = {
	loanAmount: ko.observable(300),
	periodValue: ko.observable(15),
	instalment: function () {
		var month = this.periodValue() * 12;
		var intrestRate = 0.0259;
		var capitalInstallment = this.loanAmount() *1000 / month;
		var intrestInstalment = (this.loanAmount()*1000 * intrestRate) / 360 * 30;
		var installmentValue = capitalInstallment + intrestInstalment;
		return roundNumber(installmentValue,2);
	}
};

ko.applyBindings(viewModel);

function roundNumber(num, scale) {
	var number = Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
	if (num - number > 0) {
		return (number + Math.floor(2 * Math.round((num - number) * Math.pow(10, (scale + 1))) / 10) / Math.pow(10, scale));
	} else {
		return number;
	}
};
