function runSimulation(envProps, simulationSummary) {
	var initialState = engine.createState(0, 5, envProps.initialSpeed, 0, envProps.mass);
	var environment = engine.createEnvironment(envProps.gCoefficient, initialState);
	if (envProps.needToTrace) {
		var states = engine.calculateSimulation(environment, 0.5);
		simulationSummary.states = states;
		drawTrace(states);
	}
}

function initializerController($scope) {
	$scope.envProps = {};
	initModel($scope.envProps);
	$scope.envProps.needToTrace = true;
	$scope.simulationSummary = {};
	$scope.runSimulation = runSimulation;
	var modelChangeWatcher = function() {
		runSimulation($scope.envProps, $scope.simulationSummary);
	};
	$scope.$watch('envProps', modelChangeWatcher, true);
	initViewport();
	runSimulation($scope.envProps, $scope.simulationSummary);
}

angular.module("physicsSimulator", [])
       .controller("InitializerController", ["$scope", initializerController]);
