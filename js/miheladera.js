

(function($){
//variables globales
 var api_key = localStorage.apikey;//'75cexc6z9hp3j7dbfm7ou238uanm0kjy';
 var lat = -34.574182;
 var lng = -58.475118;
 var rubros; 
 var Comercios;
 var rubrosLista;
 var miAgenda;
 
//models 
 
 // item de comercio
 var Comercio = Backbone.Model.extend({
 	//url: "http://127.0.0.1/api.php/comercios.json?id="+this.id+"&api_key="+api_key
 });
 
 var iman = Backbone.Model.extend({
 });
 
 // item de rubro
 var rubro = Backbone.Model.extend({
 	//url: "http://127.0.0.1/api.php/comercios.json?id="+this.id+"&api_key="+api_key
 });
 
//collections 
 
 //agenda del usuario
 var agenda = Backbone.Collection.extend({
 	model: iman,
    url: function(){
    	return "http://127.0.0.1/api.php/agendas.json?api_key="+api_key;
    } ,
/*	initialize: function (models, options) {
        //this.bind("add", options.view.addPeliculaLi); 
        this.bind("remove", options.view.despegarHtml); 
	},
*/
 });
 
 
 //listado monorubro
 var rubroList = Backbone.Collection.extend({
 	model: rubro,
    url: function(){
    	return "http://127.0.0.1/api.php/rubro.json?id="+this.rubro+"&lat="+lat+"&long="+lng+"&api_key="+api_key;
    } ,
    
    initialize: function(r){
    	this.rubro = r;
    }
 });

//listado multi rubros
 var listadoRubros = Backbone.Collection.extend({
 	model: rubro,
    url: function(){
    	return "http://127.0.0.1/api.php/rubros.json?lat="+lat+"&long="+lng+"&api_key="+api_key;
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
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    
  });


	//vista de comercios en listado
  var ComerciosView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
		this.template = _.template('<span style="color:black;"><a href="#" class="comercioLink" data-comercioId="<%= id %>" ><%= razon_social %></a>(<% (Calificacion.length > 0) ? print (Calificacion[0].punto) : print("-");  %>) <a href="tel:<% (telefono == "") ? print(telefono_alternativo) : print(telefono); %>"><% (telefono == "") ? print(telefono_alternativo) : print(telefono); %></a></span>');
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
    initialize: function() {
		this.template = _.template('<a href="#" class="rubroLink" data-rubroId="<%= id %>"><%= nombre %> (<%= Comercios %>)</a>');
     },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });
  //vista de la aplicacion  
  var AppView = Backbone.View.extend({
	
	//tag contenedor
    el: $("#MiHeladera"),
	
	//eventos del contenedor
    events: { 
      'click div.salir':  'salir',
      'click #ingresar':  'validar',
      'click a.rubroLink': 'verRubro',
      'click a.comercioLink': 'verComercio',
      'click a.imanLink': 'verIman',
      'click a.volverRubros': 'atrasRubros',
      'click button.botonPegar': 'pegar',
      'click button.botonDesPegar': 'despegar',
      'click a.botMenuItem': 'menuItem',
      
    },    

	//inicializa y asigna algunas variables
    initialize: function() {
      this.footer = this.$('footer');
      this.login = this.$('#login');
      this.comercio = this.$('#comercio');
      this.rubro = this.$('#rubro');
      this.rubros = this.$('#rubros');
      this.imanes = this.$('#imanes');
      this.cuenta = this.$('#cuenta');
      this.anterior = null;
      this.actual = null;
      var self = this;
     
      //_.bindAll(this, 'render', 'validar', 'verRubro', 'salir'); // every function that uses 'this' as the current object should be in here
	  this.footer.show();
	  this.footer.html('(ubicacion) lat: '+lat+" lng: "+lng);
	  
	  //pregunta por el api_key y muertra el login
	  if (api_key == '' || typeof api_key == 'undefined'){
	  	self.login.show();
	  	return;
	  }	else {
	  	//caso contrario muestra pantalla defecto rubros
	  	self.render();
	  	//self.listarRubros();
	  	self.verAgenda();
	  }

 
    },

	//function de render vacia de momento
    render: function() {

    },
    
    //metodo de logout
    salir: function(){
    	var self = this;
		localStorage.apikey = '';
		localStorage.email = '';
		self.ocultarTodo();
    	self.login.show();
    },
    
    //metodo login o registro
    validar: function(){
		var self = this;
	    e = $('#f_email').val();
		p = $('#f_password').val();
		n = $('#nuevoUsuario');
		
		if(n.is(':checked')){
			 $.post('http://127.0.0.1/api.php/registrar.json',{'email':e,'password':p},function(data){
				localStorage.apikey = data;
				localStorage.email = e;
				api_key = localStorage.apikey;
				self.login.hide();
				self.listarRubros();
			});			
		} else {
			 $.post('http://127.0.0.1/api.php/validar.json',{'email':e,'password':p},function(data){
				if(data==0){
					alert('ERROR: usuario o contraseña erroneos, intente nuevamente.');
				} else {
					localStorage.apikey = data;
					localStorage.email = e;
					api_key = localStorage.apikey;
					self.login.hide();
					self.verAgenda();
				}
				
			});	
			
		}
		
	},
	//oculta todas las solapas
	menuItem: function(ev){
		ev.preventDefault();
		
		switch($(ev.target).data('cb'))
			{
			case 'verRubros':
			  this.listarRubros();
			  break;
			case 'verAgenda':
			  this.verAgenda();
			  break;
			default:
			  return false;
			}
	},
	ocultarTodo: function(){
	  var self = this;
	  self.$("section").hide();
	},
	//vuelve del listado de comercios al de rubros
	atrasRubros: function(){
	  var self = this;
	  self.ocultarTodo();
	  self.rubros.show();
	},

	//listar los imanes de la agenda
	verAgenda: function(){
	  	
	  var self = this;
	  self.ocultarTodo();
	  miAgenda = new agenda();	
	  miAgenda.fetch({success:function(){
	  self.$("#listadoImanes").empty();
	  self.$("#listadoImanes").append("<ul></ul>");
		if (miAgenda.length) {     	
	     	miAgenda.each(function(n,o,l){
	     			var view = new AgendasView({model: n});
		     		self.$("#listadoImanes > ul").append(view.render().el);
		     	});
		    self.anterior = self.actual;
		    self.actual = self.imanes;
		    self.imanes.show();
     	}



	  },error:function(){alert('Error');}});
		
	},


	//listar los comercios de un rubro
	verRubro: function(ev){
	  ev.preventDefault();
	  rId = $(ev.target).data('rubroid');
	  var self = this;
	  self.ocultarTodo();
	  rubros = new rubroList(rId);	
	  rubros.fetch({success:function(){
	  	if (rubros.length) {     	
	     	rubros.each(function(n,o,l){
	     		var viewRubro = new RubrosView({model:n});
	     		self.$("#listadoComercios").empty();
	     		self.$("#listadoComercios").append(viewRubro.render().el);
     			Comercios = new ComerciosList(n.get('Comercios'));
		     if (Comercios.length) {     	
		     	self.$("#listadoComercios").append("<ul></ul>");
		      	Comercios.each(function(n,o,l){
		     		var view = new ComerciosView({model: n});
		     		self.$("#listadoComercios > ul").append(view.render().el);
		     	});
		        
      
			    self.anterior = self.actual;
			    self.actual = self.rubro;
		        self.rubro.show();
		      }
 	     		
	     	});
	     	
     	}



	  },error:function(){alert('Error');}});
		
	},

	//ver un comercio por su id
	verComercio: function(ev){
	  ev.preventDefault();
	  comercioId = $(ev.target).data('comercioid');
	  var self = this;
	  self.ocultarTodo();
	  comercioSel = Comercios.get(comercioId);	
	  var viewComercio = new ComercioView({model: comercioSel});
	  self.$("#comercio").empty();
      self.$("#comercio").append(viewComercio.render().el);
      self.comercio.show();
		
	},
	//ver un iman por su id
	verIman: function(ev){
	  ev.preventDefault();
	  agendaId = $(ev.target).data('agendaid');
	  var self = this;
	  self.ocultarTodo();
	  agendaItem = miAgenda.get(agendaId);	
	  var viewIman = new ImanView({model: agendaItem});
	  self.$("#comercio").empty();
      self.$("#comercio").append(viewIman.render().el);
      self.comercio.show();
		
	},

	//listar los comercios de un rubro
	listarRubros: function(){
	  var self = this;
	  rubrosLista = new listadoRubros();	
	  rubrosLista.fetch({success:function(){
	  	if (rubrosLista.length) {     	
	     	self.$("#listadoRubros").empty();
	     	self.$("#listadoRubros").append("<ul></ul>");
		    rubrosLista.each(function(n,o,l){
	     		var viewListaRubros = new listaRubrosView({model:n});
	     		self.$("#listadoRubros > ul").append(viewListaRubros.render().el);
	     	});
      		self.ocultarTodo();
		    self.rubros.show();
     	}



	  },error:function(){alert('Error');}});
		
	},
	
	
	pegar: function(ev){
	  ev.preventDefault();
	  var self = this;
	  comercioId = $(ev.target).data('comercioid');
	  	  $.post('http://127.0.0.1/api.php/agendas.json',{'content': '{"comercioId": '+comercioId+', "Posicion": 1}',"api_key":api_key },function(data){
		  $(ev.target).parent().append('<button class="botonDesPegar" data-agendaid="'+data+'">Quitar de mi Heladera</button>');
		  $(ev.target).remove();
		});

	},

    despegarHtml: function(agendaItem){
    	var self = this;
    	$("a.imanLink[data-agendaid='"+agendaItem.id+"']").parents("li").remove();
    },
    
	despegar: function(ev){
	  ev.preventDefault();
	  var self = this;
	  var agendaId = $(ev.target).data('agendaid');
		$.ajax(
            {
              url:"http://127.0.0.1/api.php/agendas.json",
      			 data: 'api_key='+api_key+'&id='+agendaId+'&_method=DELETE',
                type: 'POST',
                async: false,
                complete: function(response, status) {
                    if (status == 'success'){
                        agendaItem = miAgenda.get(agendaId);
                        console.debug(agendaItem);
                        comercioId = agendaItem.get('comercio_id');	
	  					miAgenda.remove(agendaItem);
					    $(ev.target).parent().append('<button class="botonPegar" data-comercioid="'+comercioId+'">Pegar en mi Heladera</button>');
						$(ev.target).remove();
	  					self.despegarHtml(agendaItem);
                    }else
                        alert('Error: ' + response.status + '\n' + response.responseText)
                }
            }
        )


	}

  });

	//inicia la app
	  var App = new AppView;  
  
})(jQuery);
