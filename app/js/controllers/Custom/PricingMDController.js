app.config(['$httpProvider', function ($httpProvider) {
	  //Reset headers to avoid OPTIONS request (aka preflight)
	
	  $httpProvider.defaults.headers.common = {};
	  $httpProvider.defaults.headers.post = {};
	  $httpProvider.defaults.headers.put = {};
	  $httpProvider.defaults.headers.patch = {};
	  $httpProvider.defaults.headers.prototype = {};
	  
	  
	
	  //$httpProvider.defaults.headers['Access-Control-Allow-Origin'] = '*'
	  //$httpProvider.defaults.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
	  //$httpProvider.defaults.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
	    
	}]); 

app.controller('PricingController', function($scope, $http, $filter ) {
	
	$scope.MysqlRecords;
	$scope.MysqlRecords;
	$scope.allMdRecords
	$scope.formattedDate;
	$scope.percentage;
	$scope.todayDate = new Date();
	
	
	
	$scope.options = {
            animate:false,
            barColor:'#2C3E50',
            scaleColor:false,
            lineWidth:20,
            lineCap:'circle'
        };
	
	$scope.load = function () {
        console.log("load event detected!");
		
		$scope.formattedDate = $filter('date')($scope.todayDate, "yyyyMMdd");
		
			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Pricing\"  }";
		        console.log(msgdata);
		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
					console.log(response.data[0][0]);
					
					$scope.mdRecordsArray = response.data[0][0];
					$scope.allMdRecords = response.data[0][0];
					$scope.MysqlRecords = response.data[0][0].length;
					$scope.QueryNotMatching = jsonsql.query("select * from json where (Entry2==Entry3)", response.data[0][0]);
					$scope.missingRows = $scope.QueryNotMatching.length;
					console.log($scope.missingRows);
					$scope.percentage = parseFloat(( $scope.missingRows / $scope.MysqlRecords ) * 100).toFixed(1);
					console.log($scope.percentage);
					
					//console.log($('#aa').get(0).id);
					
					//update instance after 1 sec
						setTimeout(function() {
							$('.chart').data('easyPieChart').update($scope.percentage);
						}, 1000);
					
					
					
					
					});
    }
	
	
			$scope.CalculateLasSynch = function () {
				
				
				
			}
	
	
	
	
			    
			
			
			$scope.optionsChart = "{ easing: 'easeOutBounce', barColor: 'orange', trackColor: '#f5f5f5', scaleColor: '#eaeaea', lineCap: 'square', lineWidth: 15, size: 130,animate: 1000,percent: 66.7 }"
	
	
	
		  
		  // Post Web CALL
		  $scope.postMessage = function() {
		        //var msg = document.getElementById('message').value;
			  	
		    }
			
			$scope.filterResult = '';
			
			$scope.FilterOnlySynced = function() {
				 $scope.mdRecordsArray = $scope.allMdRecords;
		        $scope.mdRecordsArray = jsonsql.query("select * from json where (Entry2==Entry3)", $scope.mdRecordsArray);
			  	
		    }
			
			$scope.FilterOnlyNotSynced = function() {
				console.log("Filter Not Synced");
			   $scope.mdRecordsArray = $scope.allMdRecords;
		       $scope.mdRecordsArray = jsonsql.query("select * from json where (Entry2!=Entry3)", $scope.mdRecordsArray);
			  	
		    }
			
			$scope.FilterAll = function() {
				
				console.log($('#aa').get(0));
			

		        $scope.mdRecordsArray = $scope.allMdRecords;
			  	
		    }
			
			/*
			jQuery.get('http://127.0.0.1:8080/app/testText.dat', function(data) {
				$scope.lines = data.split("\n").length;
				console.log($scope.lines)
			});
			*/
			
			
			 $scope.exportData = function () {
				 
				 
				$scope.queryExport = 'SELECT Entry1 as Interface_Name, Entry2 as File_Count, Entry3 as Records_in_MYSQL, case when Entry2 = Entry3 then \'Synced\' else \'Not Synced\' end as Status INTO XLSX("Report_All.xlsx",{}) FROM ?';
			
		  
				 
				 console.log($scope.queryExport);
      alasql($scope.queryExport,[$scope.mdRecordsArray]);
  };
		 
		  
		  
			
		  
			
		
});


app.controller('PreviousDayPricingController', function ($scope, $http, $filter, uibDateParser) {

	$scope.showDiv = false;
	$scope.maxDate = new Date();

	// Post Web CALL
	$scope.CallWebService = function () {

		$scope.showDiv = true;

		console.log("load event detected!");
		
		$scope.formattedDate = $filter('date')($scope.todayDate, "yyyyMMdd");
		
			    console.log($scope.formattedDate);
		        var msgdata = "{\"Var1\": " + "\"" + $scope.formattedDate + "\", \"Prefix\":\"Pricing\"  }";
		        console.log(msgdata);
		        var res = $http.post('http://117.55.209.110:9080/ws/simple/getMysqlTest;boomi_auth=YXZheGlhLTlGQ0pJRjo3ZDA1NzAwZC1mODM1LTQ4NTUtOThjNC03OWFlMTc1OGRkYWI=',msgdata ).
		        then(function (response) {
					console.log(response.data[0][0]);
					
					$scope.mdRecordsArray = response.data[0][0];
					$scope.allMdRecords = response.data[0][0];
					$scope.MysqlRecords = response.data[0][0].length;
					$scope.QueryNotMatching = jsonsql.query("select * from json where (Entry2==Entry3)", response.data[0][0]);
					$scope.missingRows = $scope.QueryNotMatching.length;
					console.log($scope.missingRows);
					$scope.percentage = parseFloat(( $scope.missingRows / $scope.MysqlRecords ) * 100).toFixed(1);
					console.log($scope.percentage);
					
					//console.log($('#aa').get(0).id);
					
					//update instance after 1 sec
						setTimeout(function() {
							$('.chart').data('easyPieChart').update($scope.percentage);
						}, 1000);
					
					
					
					
					});

	}

	$scope.filterResult = '';
			
			$scope.FilterOnlySynced = function() {
				 $scope.mdRecordsArray = $scope.allMdRecords;
		        $scope.mdRecordsArray = jsonsql.query("select * from json where (Entry2==Entry3)", $scope.mdRecordsArray);
			  	
		    }
			
			$scope.FilterOnlyNotSynced = function() {
				console.log("Filter Not Synced");
			   $scope.mdRecordsArray = $scope.allMdRecords;
		       $scope.mdRecordsArray = jsonsql.query("select * from json where (Entry2!=Entry3)", $scope.mdRecordsArray);
			  	
		    }
			
			$scope.FilterAll = function() {
				
				console.log($('#aa').get(0));
			

		        $scope.mdRecordsArray = $scope.allMdRecords;
			  	
		    }

	$scope.exportData = function () {

		$scope.queryExport = '';
		if ($scope.filterResult == '')
			$scope.queryExport = 'SELECT Entry2 as IDoc_Number, Entry3 as IDoc_Type, Entry1 as Date, case when Entry5 = \'0\' then \'Synced\' else \'Not Synced\' end as Status INTO XLSX("Report_All.xlsx",{}) FROM ?';
		else
			$scope.queryExport = 'SELECT Entry2 as IDoc_Number, Entry3 as IDoc_Type, Entry1 as Date, case when Entry5 = \'0\' then \'Synced\' else \'Not Synced\' end as Status INTO XLSX("Report_Filtered.xlsx",{}) FROM ? where Entry5 = \'' + $scope.filterResult + '\'';

		console.log($scope.queryExport);
		alasql($scope.queryExport, [$scope.mdRecordsArray]);
	};

});
