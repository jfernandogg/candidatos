/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        this.usePath();
        if (id=='deviceready') {
        	//$('#gridB').hide();        	
        	descargar_partidos();
        	cargar("http://www.congresovisible.org/api/apis/candidatos/?format=json");
        	$('#partido').change(
        			function() {
        				var url = "http://www.congresovisible.org/api/apis/candidatos/?format=json";
        				var sel = $('#partido').val();
        				if (sel!=null && sel!=0) {
							$('div[data-role="content"]').empty();
							$('div[data-role="content"]').html("<p>Cargando...</p>");
							console.log('Cargando con filtro: '+next);        					
        					cargar(url+'&partido_politico='+sel);
        				}
        				if (sel==0) {
							$('div[data-role="content"]').empty();
							$('div[data-role="content"]').html("<p>Cargando...</p>");
							console.log('Cargando con filtro: '+next);
							cargar(url);
        				}
        			}
        	);
        }
        			
    },
    
    usePath:
     function() {
    	console.log('UsePath: obteniendo temp path');
    	window.requestFileSystem( LocalFileSystem.TEMPORARY, 0, 
			function(f){
				console.log('Temp Path is: '+f.root.fullPath);
				app.tmpPath = f.root.fullPath;
    		}, 
    		function(e){
    			console.log('Error al obtener el path temporal: '+e.target.error.code);
    		}
    	);
    	console.log('usePath: Temp Path debio quedarn en '+app.tmpPath);
     },
     tmpPath: ""
};
