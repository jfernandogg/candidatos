


function cargar(url) {
	var fp = '/sdcard/'+makeid()+'.json';
	if (url==null || url=="candidatos.json") {
		descargar_json("candidatos.json",fp);
		fp="candidatos.json";
	}
	else
		descargar_json(url,fp);
	//Load json via files plugin	

	
}

function descargar_json(url,filePath) {
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
			$.getJSON( 'file://'+filePath,{
				tagmode: "any",
				format: "json",
			}).done(
				function(data){
					console.log("cargando json");
					results = data.results;
					next = results.next;
					prev = results.prev;
					var titles='<div data-role="collapsible-set">\n';
					for (i=0; i<results.length; i++) {
						titles+='<div data-role="collapsible" data-collapsed="false">\n'+
							'<h3><img src="'+results[i].images.small+'"> '+
							results[i].party.name+' - '+
							results[i].first_name+' '+results[i].last_name+'</h3>\n';
						//hv
						inv_lgl =results[i].investigations;
						biog = results[i].biography;
						sup_top = biog.supported_topics; //array
						tray = results[i].trajectory;
						posi = results[i].topics_positions;
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
					//TODO agregar evento cargar a los botones anterior y siguiente
					$('#sig').click( function(){ 
							$('div[data-role="content"]').empty();
							$('div[data-role="content"]').html("<p>Cargando...</p>");
							cargar(next); 
						} );
					$('#prev').click( function(){ 
							$('div[data-role="content"]').empty();
							$('div[data-role="content"]').html("<p>Cargando...</p>");
							cargar(prev);	
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



function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}