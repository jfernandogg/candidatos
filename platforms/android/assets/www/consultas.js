
function cargar(url) {
		app.usePath();
		descargar_candidatos( url,app.tmpPath+'/'+makeid() );
	//Load json via files plugin	

	
}

function descargar_candidatos(url,filePath) {
	// !! Assumes filePath is a valid path on the device
	if (url=="candidatos.json")
		return "candidatos.json";
	var fileTransfer = new FileTransfer();
	var uri = encodeURI(url);
	
	fileTransfer.download(
	    uri,
	    filePath,
	    function(entry) {
	        console.log("download complete: " + entry.fullPath);
			$.getJSON( filePath,{
				tagmode: "any",
				format: "json",
			}).done(
				function(data){
					console.log("cargando json");
					results = data.results;
					next = data.next;
					prev = data.previous;
					var titles='<div data-role="collapsible-set">\n';
					for (i=0; i<results.length; i++) {
						titles+='<div data-role="collapsible" data-collapsed="false">\n'+
							'<h3><img src="'+results[i].images.small+'"> '+
							results[i].first_name+' '+results[i].last_name+'</h3>\n';
						//hv
						inv_lgl =results[i].investigations;
						biog = results[i].biography;
						sup_top = biog.supported_topics; //array
						tray = results[i].trajectory;
						posi = results[i].topics_positions;
						titles+='<h4>'+results[i].party.name+'</h4>\n';
						titles+='<h4>'+results[i].first_name+' '+results[i].last_name+'</h4>\n';
						titles+="<h4>Fecha de Nac: </h4>"+biog.born_date+"&nbsp;\n";
						titles+="<h4>Experiencia Profesional</h4>\n";
						titles+="<p>"+biog.professional_experience+"</p>\n";
						titles+="<h4>Propuestas</h4>\n";
						titles+="<ul>\n";
						for(j=0;j<sup_top.length;j++) {
							titles+="<li>"+sup_top[j]+"</li>\n";
						}
						titles+="</ul>\n";
						titles+='</div>\n';
					}
					titles+="</div>\n";
					$('div[data-role="content"]').empty();
					$('div[data-role="content"]').append(titles).trigger("create");
					
					$('#next').click( function(){ 
							$('div[data-role="content"]').empty();
							$('div[data-role="content"]').html("<p>Cargando...</p>");
							console.log('Cargando en next: '+next);
							cargar(next); 
						} );
					$('#prev').click( function(){ 
							if (prev!=null) {
								$('div[data-role="content"]').empty();
								$('div[data-role="content"]').html("<p>Cargando...</p>");
								console.log('Cargando en prev: '+prev);
								cargar(prev);	
							}
							else console.log("No hay mas paginas");
						} );
					//TODO agregar un buscador.
				} //function(data)
			); //$.getJSON	   
			entry.remove();
			
	    },
	    function(error) {
	        console.log("download error source " + error.source);
	        console.log("download error target " + error.target);
	        console.log("upload error code" + error.code);
	    },
	    false
	);	
}

function descargar_partidos() {

	var fileTransfer = new FileTransfer();
	var uri = encodeURI("http://www.congresovisible.org/api/apis/partidos/?format=json");
	app.usePath();
	var filePath = app.tmpPath+'/'+makeid();

	fileTransfer.download(
	    uri,
	    filePath,
	    function(entry) {
	        console.log("download complete: " + entry.fullPath);
			$.getJSON( filePath,{
				tagmode: "any",
				format: "json",
			}).done(
				function(data){
					var results = data.results;
					console.log("cargando json partidos");
					$('#partido').children('option').remove();
					$('#partido').append('<option value="0">Todos</option>').trigger("create");
					for (i=0; i<results.length;i++){
						$('#partido').append('<option value="'+results[i].id+'">'+results[i].name+'</option>\n').trigger("create");
					}
				} //function(data)
			); //$.getJSON	   
			entry.remove();
	    },
	    function(error) {
	        console.log("download error source " + error.source);
	        console.log("download error target " + error.target);
	        console.log("upload error code" + error.code);
	    },
	    false
	);	
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}