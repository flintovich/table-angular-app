var app = angular.module('App',[]);

app.controller('TableData', function($rootScope) {
	var vm = this;
	vm.addNew = function() {
        vm.rowData = [];
		vm.rowData.push({
            id: new Date().getTime(),
			name: vm.name,
			secondName: vm.secondName,
			phone: vm.phone,
			gender : vm.gender,
			age : vm.age
		});
		vm.name = '';
		vm.secondName = '';
		vm.phone = '';
		vm.gender = '';
		vm.age = '';
		
        $rootScope.$broadcast('newRowData', vm.rowData);
    };
});

app.controller('TableFunc', function($scope){
    var vm = this;
    vm.rowData = [];

    if(localStorage.getItem('table_data') !== null){
        vm.rowData = JSON.parse(localStorage.getItem('table_data'));
    }

    vm.removeData = function(id){
        for(var i = 0; i < vm.rowData.length; i++){
            if(vm.rowData[i].id === id){
                vm.rowData.splice(i, 1);
                localStorage.setItem('table_data', angular.toJson(vm.rowData));
                break;
            }
        }
    };

    $scope.$on('newRowData', function(event, data) {
        vm.rowData.push(data[0]);
        localStorage.setItem('table_data', angular.toJson(vm.rowData));
    });

    vm.reverse = true;
    vm.type = 'name';
    vm.sortBy = function(type) {
        vm.reverse = (vm.type === type) ? !vm.reverse : false;
        vm.type = type;
    };
});

