//variables globales
 var ciudades;
 var barrios;
 var rubros; 
 var Comercios;
 var rubrosLista;
 var miAgenda;
 var scrolling = false;

//models 
 // item de barrio
 var Barrio = Backbone.Model.extend({
 	//url: "http://miheladera-ateszki.dotcloud.com/api.php/comercios.json?id="+this.id+"&api_key="+api_key
 });
 
 var Ciudad = Backbone.Model.extend({
 	//url: "http://miheladera-ateszki.dotcloud.com/api.php/comercios.json?id="+this.id+"&api_key="+api_key
 });
 // item de comercio
 var Comercio = Backbone.Model.extend({
 	//url: "http://miheladera-ateszki.dotcloud.com/api.php/comercios.json?id="+this.id+"&api_key="+api_key
 });
 
 var iman = Backbone.Model.extend({
 });
 
 // item de rubro
 var rubro = Backbone.Model.extend({
 	//url: "http://miheladera-ateszki.dotcloud.com/api.php/comercios.json?id="+this.id+"&api_key="+api_key
 });
 
//collections 
 
 //agenda del usuario
 var agenda = Backbone.Collection.extend({
 	model: iman,
    url: function(){
    	return "http://miheladera-ateszki.dotcloud.com/api.php/agendas.json?api_key="+app.api_key;
    } ,
    initialize: function(){
    	
    },
/*	initialize: function (models, options) {
        //this.bind("add", options.view.addPeliculaLi); 
        this.bind("remove", options.view.despegarHtml); 
	},
*/
 });
 
 //listado de ciudades
 var ciudadList = Backbone.Collection.extend({
 	model: Ciudad,
     comparator: function(model) {
    	return model.get('nombre');
	 },
    
    initialize: function(){
    	this.url = "http://miheladera-ateszki.dotcloud.com/api.php/ciudad.json?api_key="+app.api_key;	
    }
 });

 //listado de ciudades
 var barrioList = Backbone.Collection.extend({
 	model: Barrio,
    
     comparator: function(model) {
    	return model.get('nombre');
	 },

    initialize: function(vars){
    	//console.log(vars.ciudad_id);
    	this.url = "http://miheladera-ateszki.dotcloud.com/api.php/barrio.json?api_key="+app.api_key;	
    	if (typeof vars.ciudad_id !== 'undefined'){
    		this.url += '&ciudad_id='+vars.ciudad_id;
    	}
    }
 });
 
 //listado monorubro
 var rubroList = Backbone.Collection.extend({
 	model: rubro,
    
    initialize: function(vars){
    	var url ="http://miheladera-ateszki.dotcloud.com/api.php/rubro.json?api_key="+app.api_key;
    	if (typeof(vars.bId) != 'undefined'){
    		url += "&barrios="+vars.bId+"&id="+vars.rId;
    	} else {
    		url += "&lat="+app.lat+"&long="+app.lng+"&id="+vars.rId;	
    	}
    	this.url = url;
    }
 });

//listado multi rubros
 var listadoRubros = Backbone.Collection.extend({
 	model: rubro,
    /* comento el comparador
      comparator: function(model) {
    	return [(model.get("nivel")==1)?2:1, model.get("nombre")];
	 },
	 */
    initialize: function(vars){
    	if(typeof vars.barrio === 'undefined'){
	    	this.url = "http://miheladera-ateszki.dotcloud.com/api.php/rubros.json?nivel="+vars.nivel+"&lat="+app.lat+"&long="+app.lng+"&api_key="+app.api_key;
    	} else {
	    	this.url= "http://miheladera-ateszki.dotcloud.com/api.php/rubros.json?nivel="+vars.nivel+"&barrios="+vars.barrio+"&api_key="+app.api_key;
    	}
    },
    
    url: null,
    
 });
  
  //listado de comercios
  var ComerciosList = Backbone.Collection.extend({
    model: Comercio,
   
  });
  
//views
	//vista de iman unico
  var ImanView = Backbone.View.extend({
    tagName: 'div',
    initialize: function() {
		this.template = _.template('<div style="color:black;"><%= Comercio.razon_social %> <a href="tel:<% (Comercio.telefono == "") ? print(Comercio.telefono_alternativo) : print(Comercio.telefono); %>"><% (Comercio.telefono == "") ? print(Comercio.telefono_alternativo) : print(Comercio.telefono); %></a></div><div>Calificacion: <% (Calificacion.length > 0) ? print (Calificacion[0].punto) : print("-");  %><div>Precio: <% (Calificacion.length > 0) ? print (Calificacion[0].precio) : print("-");  %><div>Rapidez: <% (Calificacion.length > 0) ? print (Calificacion[0].rapidez) : print("-");  %><div>Calidad: <% (Calificacion.length > 0) ? print (Calificacion[0].calidad) : print("-");  %></div><div><button class="botonDesPegar" data-agendaid="<%= id %>">Quitar de mi Heladera</button></div><div><%= Comercio.domicilio %></div>');
     },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

	//vista de comercio unico
  var ComercioView = Backbone.View.extend({
    tagName: 'div',
    initialize: function() {
		this.template = _.template('<div style="color:black;"><%= razon_social %> <a href="tel:<% (telefono == "") ? print(telefono_alternativo) : print(telefono); %>"><img src="img/llamar.png" border="0" alt="llamar"></a></div><div>Calificacion: <% (Calificacion.length > 0) ? print (Calificacion[0].punto) : print("-");  %><div>Precio: <% (Calificacion.length > 0) ? print (Calificacion[0].precio) : print("-");  %><div>Rapidez: <% (Calificacion.length > 0) ? print (Calificacion[0].rapidez) : print("-");  %><div>Calidad: <% (Calificacion.length > 0) ? print (Calificacion[0].calidad) : print("-");  %></div><div><button class="botonPegar" data-comercioid="<%= id %>">Pegar en mi Heladera</button></div><div><%= domicilio %></div>');
     },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

	//vista de comercios en agenda
  var AgendasView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
//		this.template = _.template('<span style="color:black;"><a href="#" class="imanLink" data-agendaId="<%= id %>" ><%= Comercio.razon_social %></a> <a href="tel:<% (Comercio.telefono == "") ? print(Comercio.telefono_alternativo) : print(Comercio.telefono); %>"><% (Comercio.telefono == "") ? print(Comercio.telefono_alternativo) : print(Comercio.telefono); %></a></span>');
		this.template = _.template('<div class="comercio-logo"><% (Comercio.logo != "")? print("<img src=\'http://miheladera-ateszki.dotcloud.com/uploads/comercio_logos/"+Comercio.logo+"\' >"):print("logo"); %></div><div class="comercio-detalle"><a href="#" class="comercioLink nombre" data-comercioId="<%= Comercio.id %>" ><%= Comercio.razon_social %></a><br><% (Calificacion.length > 0) ? print (printCalificacion(Calificacion[0].punto)) : print(printCalificacion(0));  %></div><div class="comercio-llamar"><a href="tel:<% (Comercio.telefono == "") ? print(Comercio.telefono_alternativo) : print(Comercio.telefono); %>"><img src="img/llamar.png" width="40" height="40" align="center" border="0"></a></div><div class="comercio-pegardespegar despegar"><a href="#"><img src="img/despegar.png" data-agendaid="<%= id %>" align="center" width="40" height="40" border="0"></a></div>');
     },

    render: function() {
      //console.log(this.template(this.model.toJSON()));
      //console.log(this.el);
      //this.$(this.el).attr('data-role','listviewitem').html(this.template(this.model.toJSON()));
      this.$el.attr('data-role','listviewitem').html(this.template(this.model.toJSON()));
      return this;
    },
    
  });

	//vista de ciudad en listado
  var CiudadView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
		this.template = _.template('<a href="#Barrio/<%= id %>"><%= nombre %></a>');
     },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var BarrioView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
		this.template = _.template('<div onclick="barrioSelect(\'<%= id %>\',\'<%= nombre %>\')" data-id="<%= id %>" class="barrioselect"><%= nombre %></div>');
     },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

	//vista de comercios en listado
  var ComerciosView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
		this.template = _.template('<div class="comercio-logo"><% (logo != "")? print("<img src=\'http://miheladera-ateszki.dotcloud.com/uploads/comercio_logos/"+Comercio.logo+"\' >"):print("logo"); %></div><div class="comercio-detalle"><a href="#" class="comercioLink nombre" data-comercioId="<%= id %>" ><%= razon_social %></a><br><% (Calificacion.length > 0) ? print (printCalificacion(Calificacion[0].punto)) : print(printCalificacion(0));  %></div><div class="comercio-llamar"><a href="tel:<% (telefono == "") ? print(telefono_alternativo) : print(telefono); %>"><img src="img/llamar.png" width="40" height="40" align="center" border="0"></a></div><div class="comercio-pegardespegar <% (Agenda == null)? print(\'pegar\'):print(\'despegar\'); %>"><img data-comercioId="<%= id %>" data-agendaId="<%= Agenda %>" src="img/<% (Agenda == null)? print(\'pegar\'):print(\'despegar\'); %>.png" align="center" width="40" height="40" border="0"></div>');
     },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
    
    
    
  });
  
  // vista mono rubro como titulo de listado de comercios
  var RubrosView = Backbone.View.extend({
    tagName: 'h1',
    initialize: function() {
		this.template = _.template('<a href="#" class="volverRubros">&lt;</a>&nbsp;<%= nombre %> (<% print(Comercios.length); %>)');
     },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  // vista listado de rubros
  var listaRubrosView = Backbone.View.extend({
  	tagName: 'li',
    initialize: function(vars) {
    	if (typeof(vars.barrio_id) != 'undefined' ){
    		barrio = vars.barrio;
    		barrio_id = vars.barrio_id;
    	} else {
    		barrio = '';
    		barrio_id = '';
    	}
    	
    	if (vars.toNivel == 2){
    		cssNombre = "rubroLinkComidas";
    	} else {
    		cssNombre = "rubroLink";
    	}
		//con links
		//this.template = _.template('<a href="explorar-rubro.html?id=<%= id %>&nombre=<%= nombre %>" class="rubroLink" data-rubroId="<%= id %>"><%= nombre %> (<%= Comercios %>)</a>');
		// sin links para performance test 
		this.template = _.template('<div data-rubroNombre="<%= nombre %>" class="'+cssNombre+'" data-barrio="'+barrio+'" data-barrioid="'+barrio_id+'" data-rubroId="<%= id %>"><%= nombre %> (<%= Comercios %>)</div>');
     },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });  

window.genericView = Backbone.View.extend({
	//eventos del contenedor
    events: { 
      'click div.salir':  'salir',
      'click #ingresar':  'validar',
     /* 'click a.rubroLink': 'verRubro',
      'click a.comercioLink': 'verComercio',
      'click a.imanLink': 'verIman',
      'click a.volverRubros': 'atrasRubros',
      'click button.botonPegar': 'pegar',
      'click button.botonDesPegar': 'despegar',
      'click a.botMenuItem': 'menuItem',*/
      
    },    

	//inicializa y asigna algunas variables
    initialize: function() {
 		//this.salir();
    },

	//function de render vacia de momento
    render: function() {
		this.salir();
    },
   
    //pegar y despegar en rubro cercano y rubro barrio
 	pegar: function(ev){
		  ev.preventDefault();
		  var self = this;
		  comercioId = $(ev.target).attr('data-comercioId');
		  	  $.post('http://miheladera-ateszki.dotcloud.com/api.php/agendas.json',{'content': '{"comercioId": '+comercioId+', "Posicion": 1}',"api_key":app.api_key },function(data){
			  $(ev.target).attr('src','img/despegar.png').parent().removeClass('pegar').addClass('despegar');
			  showPopup('El imán del comercio se pego en tu heladera');
			  //$(ev.target).parent().append('<button class="botonDesPegar" data-agendaid="'+data+'">Quitar de mi Heladera</button>');
			  //$(ev.target).remove();
			});
	
	}, 
	despegar: function(ev){
		ev.preventDefault();
		  var self = this;
		  var agendaId = $(ev.target).attr('data-agendaid');
			$.ajax(
	            {
	              url:"http://miheladera-ateszki.dotcloud.com/api.php/agendas.json",
	      			 data: 'api_key='+app.api_key+'&id='+agendaId+'&_method=DELETE',
	                type: 'POST',
	                async: false,
	                complete: function(response, status) {
	                    if (status == 'success'){
	                       $(ev.target).attr('data-agendaid','');
	                       $(ev.target).attr('src','img/pegar.png').parent().removeClass('despegar').addClass('pegar');
						   showPopup('El imán del comercio se despegó de tu heladera');
	                    }else
	                        alert('Error: ' + response.status + '\n' + response.responseText)
	                }
	            }
	        );
	        
	},

 
    //metodo barrio
    checkBarrio: function(){
    	if (localStorage.barrio == '' || typeof localStorage.barrio === 'undefined'){
    		//app.Ciudad();
    		window.location.href="#Ciudad"; 
    	}
    },
    getBarrio: function(){
    	if (localStorage.barrio != '' && typeof localStorage.barrio !== 'undefined'){
    		//app.Ciudad();
    		return {barrio_id: localStorage.barrio_id, barrio: localStorage.barrio};
    	} else {
    		return false;
    	}
    },
 
    //metodo de logout
    salir: function(){
    	var self = this;
		localStorage.apikey = '';
		localStorage.email = '';
		
    },
    
    //metodo login o registro
    validar: function(){
		var self = this;
	    e = $('#f_email').val();
		p = $('#f_password').val();
		n = $('#nuevoUsuario');
		
		if(n.is(':checked')){
			 $.post('http://miheladera-ateszki.dotcloud.com/api.php/registrar.json',{'email':e,'password':p},function(data){
				localStorage.apikey = data;
				localStorage.email = e;
				app.api_key = localStorage.apikey;
				app.MiHeladera();
			});			
		} else {
			 $.post('http://miheladera-ateszki.dotcloud.com/api.php/validar.json',{'email':e,'password':p},function(data){
				if(data==0){
					alert('ERROR: usuario o contraseña erroneos, intente nuevamente.');
				} else {
					localStorage.apikey = data;
					localStorage.email = e;
					app.api_key = localStorage.apikey;
					app.MiHeladera();
				}
				
			});	
			
		}
		
	},

});

//window.LoginView = Backbone.View.extend({
window.LoginView = genericView.extend({
    //template:_.template($('#login').html()),
	template:_.template(templates.login),

    render:function (eventName) {
    	localStorage.clear();
        $(this.el).html(this.template());
        return this;
    }
});

window.CiudadesView = genericView.extend({
    //template:_.template($('#Ciudad').html()),
	template:_.template(templates.ciudad),
    render:function (eventName) {
        $(this.el).html(this.template());
        this.verCiudades();
        return this;
    },
    verCiudades: function(){
    	miCiudades = new ciudadList();
		miCiudades.fetch({success:function(){
		 // $("#listaCiudades > ul").empty();
		  if (miCiudades.length) {     	
		     	miCiudades.each(function(n,o,l){
		     			var view = new CiudadView({model: n});
			     		
			     		$("#listaCiudades > ul").append(view.render().el);
			     	});
	     	}
	
			$("#listaCiudades > ul").listview('refresh');
	
		  },error:function(){alert('Error');}});
	  }
	
});

window.BarriosView = genericView.extend({
    //template:_.template($('#Barrio').html()),
	template:_.template(templates.barrio),
	
	initialize: function(ciudad){
		this.ciudad_id = ciudad.ciudad_id;
	},

    render:function (eventName) {
        $(this.el).html(this.template());
        this.verBarrios();
        return this;
    },
    verBarrios: function(){
    	//////console.debugug(this.ciudad_id);
    	miBarrios = new barrioList({ciudad_id: this.ciudad_id});
		
		miBarrios.fetch({success:function(){
		 // $("#listaCiudades > ul").empty();
		  if (miBarrios.length) {     	
		     	miBarrios.each(function(n,o,l){
		     			var view = new BarrioView({model: n});
			     		
			     		$("#listaBarrios > ul").append(view.render().el);
			     	});
	     	}
	
			$("#listaBarrios > ul").listview('refresh');
	
		  },error:function(){alert('Error');}});
	  }
	
});

window.HomeView = genericView.extend({//Backbone.View.extend({

    //template:_.template($('#home').html()),
	template:_.template(templates.miheladera),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
    
});

window.MiHeladeraView = genericView.extend({ // Backbone.View.extend({

  	events: {
  		"click div.despegar": "despegar"
  	},
    //template:_.template($('#MiHeladera').html()),
	template:_.template(templates.miheladera),
	miAgenda: new agenda(),
    render:function (eventName) {
        $(this.el).html(this.template());
        this.verAgenda();
        return this;
    },
	despegar: function(ev){
		ev.preventDefault();
		  var self = this;
		  var elem = $(ev.target).parents('li');
		  var agendaId = $(ev.target).attr('data-agendaid');
			$.ajax(
	            {
	              url:"http://miheladera-ateszki.dotcloud.com/api.php/agendas.json",
	      			 data: 'api_key='+app.api_key+'&id='+agendaId+'&_method=DELETE',
	                type: 'POST',
	                async: false,
	                complete: function(response, status) {
	                    if (status == 'success'){
	                        agendaItem = self.miAgenda.get(agendaId);
	                        self.miAgenda.remove(agendaItem);
						    elem.fadeOut('slow', function(){elem.remove();showPopup('El imán del comercio se despegó de tu heladera');});
		  					//alert('Imán despegado');
	                    }else
	                        alert('Error: ' + response.status + '\n' + response.responseText)
	                }
	            }
	        );
	        
	},

	verAgenda: function(){
	//	////console.debug(new agenda());
	  var miAgenda = this.miAgenda;
	  //miAgenda = new agenda();	
	  miAgenda.fetch({success:function(){
	  $(".listadoImanes > ul").empty();
	  //$("#listadoImanes").append("<ul data-role='listview'></ul>");
		if (miAgenda.length) {     	
	     	miAgenda.each(function(n,o,l){
	     			var view = new AgendasView({model: n});
	     			console.debug(view.render());
	     			$(".listadoImanes > ul").append(view.render().el);
		     	});
     	}
    	$(".listadoImanes > ul").listview('refresh');
		$(".content-wrapper").jqmData("iscrollview").refresh();

	var vista = $('.content-wrapper').jqmData('iscrollview');
	    vista.$wrapper.bind("iscroll_onscrollmove", function ()  {
	      scrolling = true;
	      });
	    vista.$wrapper.bind("iscroll_onscrollend", function ()  {
	      scrolling = false;
	      });


	  },error:function(collection,xhr,options){
	  			console.log(xhr.state());
	  			if(xhr.state() == 'rejected'){
	  				app.navigate("login",{trigger: true});
	  			}
	  			
			}
	});
	  
		
	},

});

window.ExplorarView = genericView.extend({// Backbone.View.extend({

    //template:_.template($('#Explorar').html()),
  	events: {
  		"click div.rubroLink": "rubroLink",
  		"click div.rubroLinkComidas": "rubroLinkComidas"
  	},
    
	initialize: function(tipo){
		console.log(tipo);
		if (typeof(tipo) != 'undefined' && tipo.rTipo=='Barrio'){
			this.checkBarrio();
			b = this.getBarrio();
			console.log(b);
			this.barrio = b.barrio; 
			this.barrio_id = b.barrio_id; 
		} 
		this.nivel = tipo.nivel;
	},

	template: _.template(templates.explorar),

    render:function (eventName) {
        if (typeof(this.barrio_id) != 'undefined' ){
        	this.template = _.template(templates.explorar_barrio);
        	$(this.el).html(this.template({'barrio': b.barrio}));
        } else {
        	$(this.el).html(this.template());
        
        }
        this.listarRubros(this.nivel);
        return this;
    },

	listarRubros: function(nivel){
	  var self = this;
	  if(typeof(this.barrio_id) != 'undefined'){
	  	rubrosLista = new listadoRubros({'nivel':nivel,'barrio': this.barrio_id});
	  } else{
	  	rubrosLista = new listadoRubros({'nivel':nivel});
	  }

	  rubrosLista.fetch({success:function(){
	  	if (rubrosLista.length) {     	
	     	$(".listadoRubros > ul").empty();
	     	rubrosLista.each(function(n,o,l){
		    	console.log(n.get('nivel')+' '+n.get('nombre'));
	     		if (n.get("nombre") == 'Comidas'){
	     			toNivel = 2;
	     		} else {
	     			toNivel = 1;
	     		}
	     		var viewListaRubros = new listaRubrosView({model:n,barrio:self.barrio,barrio_id:self.barrio_id,'toNivel':toNivel});
	     		$(".listadoRubros > ul").append(viewListaRubros.render().el);
	     		
	     	});
     	}
/*
 * para volver atras descomentar el comparador 
 	  rubrosLista.fetch({success:function(){
	  	if (rubrosLista.length) {     	
	     	$(".listadoRubros > ul").empty();
	     	//$("#scroller.listadoRubros").append("<ul></ul>");
	     	$(".listadoRubros > ul").append('<li data-role="list-divider" data-theme="a">COMIDAS</li>');
	     	var cambio = false;
		    rubrosLista.each(function(n,o,l){
		    	console.log(n.get('nivel')+' '+n.get('nombre'));
	     		if (n.get("nombre") != 'Comidas'){
		     		if (cambio == false && n.get('nivel')==1){
		     			$(".listadoRubros > ul").append('<li data-role="list-divider" data-theme="a">OTROS</li>');
		     			cambio = true;
		     		}
		     		var viewListaRubros = new listaRubrosView({model:n,barrio:self.barrio,barrio_id:self.barrio_id});
		     		$(".listadoRubros > ul").append(viewListaRubros.render().el);
	     		}
	     	});
     	}
*/
    	$(".listadoRubros > ul").listview('refresh');
    	$(".content-wrapper").jqmData("iscrollview").refresh();

	var vista = $('.content-wrapper').jqmData('iscrollview');
    vista.$wrapper.bind("iscroll_onscrollmove", function ()  {
      scrolling = true;
      });
    vista.$wrapper.bind("iscroll_onscrollend", function ()  {
      scrolling = false;
      });
      
	  },error:function(collection,xhr,options){
	  			console.log(xhr.state());
	  			if(xhr.state() == 'rejected'){
	  				app.navigate("login",{trigger: true});
	  			}
	  			
			}
	});
	},
    rubroLink: function(ev){
    	if (!scrolling){
    	nombre = $(ev.target).attr("data-rubroNombre");
    	id = $(ev.target).attr("data-rubroId");
    	barrio = $(ev.target).attr("data-barrio");
    	barrio_id = $(ev.target).attr("data-barrioid");
    	var destino = "ExplorarRubro/"+id+"/"+nombre;
    	if (barrio_id != ''){
    		destino += "/"+barrio_id+"/"+barrio;
    	}
    	app.navigate(destino,{trigger: true});
    	}
    },
    rubroLinkComidas: function(ev){
    	if (!scrolling){
    	if (typeof(this.barrio_id) != 'undefined' ){
        	t = 'Barrio';
       } else {
       		t = 'cercanos';
       }
    	var destino = "Explorar/"+t+"/"+2;
    	app.navigate(destino,{trigger: true});
    	}
    },

});

window.ExplorarRubroView = genericView.extend({// Backbone.View.extend({

  	events: {
  		"click div.pegar": "pegar",
  		"click div.despegar": "despegar"
  	},

   // template:_.template($('#ExplorarRubro').html()),
	template:_.template(templates.explorar_rubro),
	initialize: function(r){
		this.rId = r.rId; 
		this.rNombre = decodeURIComponent(r.rNombre);
		this.bId = r.bId; 
		this.bNombre = decodeURIComponent(r.bNombre);
	},

    render:function (eventName) {
        $(this.el).html(this.template({'rubroNombre':this.rNombre}));
        this.listarComercios();
        console.log(this.rId);
        return this;
    },

	listarComercios: function(){
	  var self = this;
	  rubros = new rubroList({"rId": this.rId, "bId": this.bId});	
	  //rubros.url += this.rId;
	  console.log(rubros.url);
	  rubros.fetch({success:function(){
	  	if (rubros.length) {     	
	     	rubros.each(function(n,o,l){
	     		//var viewRubro = new RubrosView({model:n});
	     		$(".listadoComercios > ul").empty();
	     		//$("#listadoComercios").append(viewRubro.render().el);
     			Comercios = new ComerciosList(n.get('Comercios'));
		     if (Comercios.length) {     	
		     	//$(".listadoComercios > ul").append("<ul></ul>");
		      	Comercios.each(function(n,o,l){
		     		var view = new ComerciosView({model: n});
		     		$(".listadoComercios > ul").append(view.render().el);
		     	});
		      }
 	     		
	     	});
	     	
	     
	     	
     	}

    	$(".listadoComercios > ul").listview('refresh');
		$(".content-wrapper").jqmData("iscrollview").refresh();

	var vista = $('.content-wrapper').jqmData('iscrollview');
	    vista.$wrapper.bind("iscroll_onscrollmove", function ()  {
	      scrolling = true;
	      });
	    vista.$wrapper.bind("iscroll_onscrollend", function ()  {
	      scrolling = false;
	      });


	  },error:function(collection,xhr,options){
	  			console.log(xhr.state());
	  			if(xhr.state() == 'rejected'){
	  				app.navigate("login",{trigger: true});
	  			}
	  			
			}
	});
		
	},

});

window.OfertasView = genericView.extend({// Backbone.View.extend({

    //template:_.template($('#Ofertas').html()),
	template:_.template(templates.ofertas),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.CuentaView = genericView.extend({// Backbone.View.extend({

    //template:_.template($('#Cuenta').html()),
	template:_.template(templates.cuenta),

    render:function (eventName) {
        $(this.el).html(this.template({"email": localStorage.email,"lat":app.lat,"lng": app.lng, "barrio": localStorage.barrio}));
        return this;
    }
});
var index = window.location.href.lastIndexOf("/") + 1;
var filename = window.location.href.substr(index).replace('.html','');



var AppRouter = Backbone.Router.extend({

    routes:{
    	//"":"MiHeladera",
        "":"MiHeladera",
        "home":"home",
        "login":"login",
        "MiHeladera":"MiHeladera",
        "Explorar/:tipo":"Explorar",
        "Explorar/:tipo(/:nivel)":"Explorar",
        "ExplorarRubro/:rId/:rNombre(/:bId/:bNombre)":"ExplorarRubro",
        "Ofertas": "Ofertas",
        "Cuenta":"Cuenta",
        "Ciudad":"Ciudad",
        "Barrio/:ciudad_id":"Barrio", 
    },

    initialize:function () {
    	// Handle back button throughout the application
        this.firstPage = true;
        this.api_key = localStorage.apikey;//'75cexc6z9hp3j7dbfm7ou238uanm0kjy';
 		this.lat = -34.58528483;
 		this.lng = -58.43655580;
    },

    login:function () {
        console.log('#login');
        this.changePage(new LoginView());
    },

    home:function () {
        console.log('#home');
        this.changePage(new HomeView());
    },

    MiHeladera:function () {
        console.log('#MiHeladera');
        this.changePage(new MiHeladeraView());
    },

    Explorar:function (tipo,nivel) {
        console.log('#Explorar');
        if (typeof (nivel) == 'undefined'){
        	nivel = 1;
        }
        console.log('Nivel: '+nivel);
        (typeof tipo == 'undefined')? rTipo = 'cercanos':rTipo = tipo;
        this.changePage(new ExplorarView({"rTipo":rTipo,"nivel":nivel}));
    },

    ExplorarBarrio:function () {
        console.log('#ExplorarBarrio');
        this.changePage(new ExplorarBarrioView());
    },

    ExplorarRubro:function (rId,rNombre,bId,bNombre) {
        console.log('#ExplorarRubro');
        //console.log({"rId": rId,"rNombre": rNombre});
        this.changePage(new ExplorarRubroView({"rId":rId,"rNombre":rNombre,"bId":bId,"bNombre":bNombre}));
    },

    Ofertas:function () {
        console.log('#Ofertas');
        this.changePage(new OfertasView());
    },
    
    Cuenta:function () {
        console.log('#Cuenta');
        this.changePage(new CuentaView());
    },
    Ciudad: function(){
    	console.log('#Ciudad');
    	this.changePage(new CiudadesView());
    },
    Barrio: function(ciudad_id){
    	console.log('#Barrio');
    	this.changePage(new BarriosView({"ciudad_id": ciudad_id}));
    },
    changePage:function (page) {
     //console.debug(page);
     if (this.api_key == '' || typeof this.api_key === 'undefined'){
	  	//page = new LoginView();
	  	if (window.location.href.indexOf('#login') == -1){
	  		//this.navigate('login');
	  		page = new LoginView();
	  	}
	  }        
        
        $(page.el).attr('data-role', 'page')
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
		//myScroll = new iScroll('div[data-role="content"]');
		//myScroll.refresh();
    },
 	setBarrio: function(barrio_id,barrio){
 		localStorage.barrio = barrio;
 		localStorage.barrio_id = barrio_id;
 	},   
});

function barrioSelect(barrio_id,barrio){
	app.setBarrio(barrio_id,barrio);
	window.location.href="#Explorar/Barrio";
}

function getQueryString() {
  var result = {}, queryString = location.search.substring(1),
      re = /([^&=]+)=([^&]*)/g, m;

  while (m = re.exec(queryString)) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return result;
}

var qs = getQueryString();

var myScroll;

   // To make inputs focusable,
   // you can rebind their touchend's event to trigger their focus




function loaded() {
	var myScroll = $(".content-wrapper").jqmData("iscrollview");
    if(typeof myScroll != 'undefined') {myScroll.refresh();}
    //console.debug(myScroll);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

/* * * * * * * *
 *
 * Use this for high compatibility (iDevice + Android)
 *
 */
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);	
$(document).ready(function () {
    console.log('document ready');


    $('div[data-role="page"]').live('pageshow', function(event, ui) {
          iscrollRefresh();
        });

        function iscrollRefresh() {
        	if (window.location.href.indexOf('login.html') == -1){
				//myScroll = new iScroll('wrapper');
				//loaded();
				
        	}
        }
   app = new AppRouter();

     
      /*$(document).delegate("div.contacts-page", "pageinit", function () {
      this.find(".content-wrapper").bind("iscroll_onmove", function () {
        alert("move gesture was completed");
        });
    });	*/		
   Backbone.history.start();
   
   
});
 function printCalificacion(puntos){
    	var p = Math.floor(parseFloat(puntos));
    	var salida = '';
    	var puntosEstrellas = [2,4,6,8,10];
    	if (p == 0){
    		for (i=0;i<5;i++){
    			salida += '<img width="16" height="16" src="img/estrella-off.png" border="0">';
    		} 
    		return salida;
    	} else {
    		var onoff;
    		for (i=0;i<5;i++){
    			if (p >= puntosEstrellas[i]){
    				onoff = 'on';
    			} else {
    				if (p < puntosEstrellas[i] && p == puntosEstrellas[i]-1){
    					onoff = 'on';
    				} else {
    					onoff = 'off';
    				}
    			}
    			salida += '<img width="16" height="16" src="img/estrella-'+onoff+'.png" border="0">';
    		} 
    		return salida;
    	}
    	
    }
    
    function showPopup(texto){
    	$("body").append('<div data-role="popup" id="popupBasic"><p>'+texto+'<p></div>');
	   $( "#popupBasic" ).popup();
	   $( "#popupBasic" ).bind({
	  	   popupafteropen: function(event, ui) { 
				var t=setTimeout(function(){$( "#popupBasic" ).popup('close');},3000)
		   }
		});    
    	$( "#popupBasic" ).popup('open');
	}

