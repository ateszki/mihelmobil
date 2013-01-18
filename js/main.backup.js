//variables globales
 var ciudades;
 var barrios;
 var rubros; 
 var Comercios;
 var rubrosLista;
 var miAgenda;

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
    
    initialize: function(){
    	this.url = "http://miheladera-ateszki.dotcloud.com/api.php/rubro.json?lat="+app.lat+"&long="+app.lng+"&api_key="+app.api_key+"&id=";	
    }
 });

//listado multi rubros
 var listadoRubros = Backbone.Collection.extend({
 	model: rubro,
    url: function(){
    	return "http://miheladera-ateszki.dotcloud.com/api.php/rubros.json?lat="+app.lat+"&long="+app.lng+"&api_key="+app.api_key;
    } ,
    
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
		this.template = _.template('<div style="color:black;"><%= razon_social %> <a href="tel:<% (telefono == "") ? print(telefono_alternativo) : print(telefono); %>"><% (telefono == "") ? print(telefono_alternativo) : print(telefono); %></a></div><div>Calificacion: <% (Calificacion.length > 0) ? print (Calificacion[0].punto) : print("-");  %><div>Precio: <% (Calificacion.length > 0) ? print (Calificacion[0].precio) : print("-");  %><div>Rapidez: <% (Calificacion.length > 0) ? print (Calificacion[0].rapidez) : print("-");  %><div>Calidad: <% (Calificacion.length > 0) ? print (Calificacion[0].calidad) : print("-");  %></div><div><button class="botonPegar" data-comercioid="<%= id %>">Pegar en mi Heladera</button></div><div><%= domicilio %></div>');
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
		this.template = _.template('<span style="color:black;"><a href="#" class="imanLink" data-agendaId="<%= id %>" ><%= Comercio.razon_social %></a> <a href="tel:<% (Comercio.telefono == "") ? print(Comercio.telefono_alternativo) : print(Comercio.telefono); %>"><% (Comercio.telefono == "") ? print(Comercio.telefono_alternativo) : print(Comercio.telefono); %></a></span>');
     },

    render: function() {
    	
      this.$(this.el).attr('data-role','listviewitem').html(this.template(this.model.toJSON()));
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
      this.$(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var BarrioView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
		this.template = _.template('<a href="#" data-id="<%= id %>" class="barrioselect"><%= nombre %></a>');
     },

    render: function() {
      this.$(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

	//vista de comercios en listado
  var ComerciosView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
		this.template = _.template('<span style="color:black;"><a href="#" class="comercioLink" data-comercioId="<%= id %>" ><%= razon_social %></a>(<% (Calificacion.length > 0) ? print (Calificacion[0].punto) : print("-");  %>) <a href="tel:<% (telefono == "") ? print(telefono_alternativo) : print(telefono); %>"><% (telefono == "") ? print(telefono_alternativo) : print(telefono); %></a></span>');
     },

    render: function() {
      this.$(this.el).html(this.template(this.model.toJSON()));
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
      this.$(this.el).html(this.template(this.model.toJSON()));
      return this;
    }

  });

  // vista listado de rubros
  var listaRubrosView = Backbone.View.extend({
  	tagName: 'li',
    initialize: function() {
		this.template = _.template('<a href="#ExplorarRubro/<%= id %>/<%= nombre %>/cercanos" class="rubroLink" data-rubroId="<%= id %>"><%= nombre %> (<%= Comercios %>)</a>');
     },

    render: function() {
      this.$(this.el).html(this.template(this.model.toJSON()));
      return this;
    }

  });  

window.genericView = Backbone.View.extend({
	//eventos del contenedor
    events: { 
      'click div.salir':  'salir',
      'click #ingresar':  'validar',
      'click label[for="explorar-tipo-barrio"]': 'checkBarrio'
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
    
    //metodo barrio
    checkBarrio: function(){
    	if (localStorage.barrio == '' || typeof localStorage.barrio === 'undefined'){
    		//app.Ciudad();
    		window.location.href="#Ciudad"; 
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
    template:_.template($('#login').html()),


    render:function (eventName) {
    	localStorage.clear();
        $(this.el).html(this.template());
        return this;
    }
});

window.CiudadesView = genericView.extend({
    template:_.template($('#Ciudad').html()),

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
    template:_.template($('#Barrio').html()),
	
	initialize: function(ciudad_id){
		this.ciudad_id = ciudad_id;
	},

    render:function (eventName) {
        $(this.el).html(this.template());
        this.verBarrios();
        return this;
    },
    verBarrios: function(){
    	console.debug(this.ciudad_id);
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

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
    
});

window.MiHeladeraView = genericView.extend({ // Backbone.View.extend({

    template:_.template($('#MiHeladera').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        this.verAgenda();
        return this;
    },

	verAgenda: function(){
	//	console.debug(new agenda());
	  miAgenda = new agenda();	
	  miAgenda.fetch({success:function(){
	  $("#listadoImanes").empty();
	  $("#listadoImanes").append("<ul data-role='listview'></ul>");
		if (miAgenda.length) {     	
	     	miAgenda.each(function(n,o,l){
	     			var view = new AgendasView({model: n});
		     		$("#listadoImanes > ul").append(view.render().el);
		     	});
     	}



	  },error:function(){alert('Error');}});
		
	},

});

window.ExplorarView = genericView.extend({// Backbone.View.extend({

    template:_.template($('#Explorar').html()),
	initialize: function(rTipo){
		this.rTipo = rTipo; 
	},

    render:function (eventName) {
        $(this.el).html(this.template());
        this.listarRubros();
        return this;
    },

	listarRubros: function(){
	  var self = this;
	  rubrosLista = new listadoRubros();
	  rubrosLista.fetch({success:function(){
	  	if (rubrosLista.length) {     	
	     	$("#listadoRubros").empty();
	     	$("#listadoRubros").append("<ul></ul>");
		    rubrosLista.each(function(n,o,l){
	     		var viewListaRubros = new listaRubrosView({model:n});
	     		$("#listadoRubros > ul").append(viewListaRubros.render().el);
	     	});
     	}



	  },error:function(){alert('Error');}});
		
	},

});

window.ExplorarRubroView = genericView.extend({// Backbone.View.extend({

    template:_.template($('#ExplorarRubro').html()),

	initialize: function(rId,rNombre){
		this.rId = rId; 
		this.rNombre = rNombre; 
	},

    render:function (eventName) {
        $(this.el).html(this.template({'rubroNombre':this.rNombre}));
        this.listarComercios();
        //console.log(this.rId);
        return this;
    },

	listarComercios: function(){

	  rubros = new rubroList();	
	  rubros.url += this.rId;
	  rubros.fetch({success:function(){
	  	if (rubros.length) {     	
	     	rubros.each(function(n,o,l){
	     		//var viewRubro = new RubrosView({model:n});
	     		$("#listadoComercios").empty();
	     		//$("#listadoComercios").append(viewRubro.render().el);
     			Comercios = new ComerciosList(n.get('Comercios'));
		     if (Comercios.length) {     	
		     	$("#listadoComercios").append("<ul></ul>");
		      	Comercios.each(function(n,o,l){
		     		var view = new ComerciosView({model: n});
		     		$("#listadoComercios > ul").append(view.render().el);
		     	});
		      }
 	     		
	     	});
	     	
     	}



	  },error:function(){alert('Error');}});
		
	},

});

window.OfertasView = genericView.extend({// Backbone.View.extend({

    template:_.template($('#Ofertas').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.CuentaView = genericView.extend({// Backbone.View.extend({

    template:_.template($('#Cuenta').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

var AppRouter = Backbone.Router.extend({

    routes:{
    	"":"MiHeladera",
        "home":"home",
        "login":"login",
        "MiHeladera":"MiHeladera",
        "Explorar/:tipo":"Explorar",
        "ExplorarRubro/:rId/:rNombre":"ExplorarRubro",
        "Ofertas": "Ofertas",
        "Cuenta":"Cuenta",
        "Ciudad":"Ciudad",
        "Barrio/:ciudad_id":"Barrio", 
    },

    initialize:function () {
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
        this.api_key = localStorage.apikey;//'75cexc6z9hp3j7dbfm7ou238uanm0kjy';
 		this.lat = -34.574182;
 		this.lng = -58.475118;

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

    Explorar:function (tipo) {
        console.log('#Explorar');
        (typeof tipo === 'undefined')? rTipo = 'cercano':rTipo = tipo;
        this.changePage(new ExplorarView(rTipo));
    },

    ExplorarRubro:function (rId,rNombre) {
        console.log('#ExplorarRubro');
        this.changePage(new ExplorarRubroView(rId,rNombre));
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
    	console.log('#Ciudad');
    	this.changePage(new BarriosView(ciudad_id));
    },
    changePage:function (page) {
      if (this.api_key == '' || typeof this.api_key === 'undefined'){
	  	page = new LoginView();
	  	
	  }        
       	$.mobile.loading('show',{'theme':'b'});	
        $(page.el).attr('data-role', 'page').attr('id','wrapper');
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
});


$(document).ready(function () {
    console.log('document ready');
    $('div[data-role="page"]').live('pageshow', function(event, ui) {
          iscrollRefresh();
        });

        function iscrollRefresh() {
        	if (window.location.hash != '#login'){
				myScroll = new iScroll('wrapper');
				console.debug(myScroll);
				myScroll.refresh();
        	}
        }
   // app = new AppRouter();
   // Backbone.history.start();
});