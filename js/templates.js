var templates = {};
templates.miheladera = '<div data-role="header" data-position="fixed" data-tap-toggle="false" data-id="foo"> \
            <a href="JavaScript:window.history.back();" data-icon="back" class="ui-btn-left">Atrás</a> \
            <h1>Mi Heladera</h1> \
        </div> \
        <div data-role="content" class="content-wrapper"  data-iscroll="{\"preventTouchHover\": false, \"vScroll\": false}"> \
    		<div class="listadoImanes listacomer"> \
				<ul data-role="listview" data-divider-theme="a"></ul> \
    		</div> \
        </div> \<div data-role="footer" data-position="fixed" data-tap-toggle="false" data-theme="a" data-id="foo"> \
		<div data-role="navbar" data-iconpos="top"> \
                    <ul> \
                        <li> \
                            <a href="#MiHeladera" data-theme="a" data-icon="heladera" class="ui-btn-active ui-state-persist"> \
                                Mi Heladera \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Explorar/cercanos" data-theme="a" data-icon="explorar"> \
                                Explorar \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Ofertas" data-theme="a" data-icon="ofertas"> \
                                Ofertas \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Cuenta" data-theme="a" data-icon="cuenta"> \
                                Mi Cuenta \
                            </a> \
                        </li> \
                    </ul> \
                </div> \
	</div>';
	/*
	<fieldset data-role="controlgroup" data-type="horizontal" > \
				     	<input type="radio" name="explorar-tipo" id="explorar-tipo-cercanos" value="cercanos" checked="checked" onclick="window.location.href=\'#Explorar\';" /> \
				     	<label for="explorar-tipo-cercanos">Cerca Tuyo</label> \
				     	<input type="radio" name="explorar-tipo" id="explorar-tipo-barrio" value="barrio" onclick="localStorage.volver_a=\'explorar-barrio.html\';window.location.href=\'explorar-barrio.html\';"  /> \
				     	<label for="explorar-tipo-barrio">Por Barrio</label> \
				</fieldset> \ 
	 * */
templates.explorar = '<div data-role="header" data-position="fixed" data-tap-toggle="false" data-id="foo"> \
			<a href="JavaScript:window.history.back();" data-icon="back" class="ui-btn-left">Atrás</a> \
            <h1>Explorar</h1> \
        </div> \
				<div class="ui-bar ui-bar-b"><fieldset data-role="controlgroup" data-type="horizontal" > \
				     	<input type="radio" name="explorar-tipo" id="explorar-tipo-cercanos" value="cercanos" checked="checked" onclick="window.location.href=\'#Explorar/cercanos\';" /> \
				     	<label for="explorar-tipo-cercanos">Cerca Tuyo</label> \
				     	<input type="radio" name="explorar-tipo" id="explorar-tipo-barrio" value="barrio" onclick="localStorage.volver_a=\'#Explorar/Barrio\';window.location.href=\'#Explorar/Barrio\';"  /> \
				     	<label for="explorar-tipo-barrio">Por Barrio</label> \
				</fieldset> \
				</div> \
        <div data-role="content" class="content-wrapper"  data-iscroll="{\"preventTouchHover\": false, \"vScroll\": false}"> \
    		<div class="listadoRubros"> \
				<ul data-role="listview" data-divider-theme="a"></ul> \
    		</div> \
        </div> \
		<div data-role="footer" data-theme="a" data-position="fixed" data-id="foo" > \
		<div data-role="navbar" data-iconpos="top"> \
                    <ul> \
                        <li> \
                            <a href="#MiHeladera" data-theme="a" data-icon="heladera"> \
                                Mi Heladera \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Explorar/cercanos" data-theme="a" data-icon="explorar" class="ui-btn-active ui-state-persist"> \
                                Explorar \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Ofertas" data-theme="a" data-icon="ofertas"> \
                                Ofertas \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Cuenta" data-theme="a" data-icon="cuenta"> \
                                Mi Cuenta \
                            </a> \
                        </li> \
                    </ul> \
                </div> \
	</div>';
templates.explorar_barrio = '<div data-role="header" data-position="fixed" data-tap-toggle="false" data-id="foo"> \
			<a href="JavaScript:window.history.back();" data-icon="back" class="ui-btn-left">Atrás</a> \
            <h1><%= barrio %></h1> \
            <a href="#Ciudad" data-icon="gear">Cambiar</a> \
        </div> \
		<div class="ui-bar ui-bar-b"><fieldset data-role="controlgroup" data-type="horizontal" > \
		     	<input type="radio" name="explorar-tipo" id="explorar-tipo-cercanos" value="cercanos" onclick="window.location.href=\'#Explorar/cercanos\';" /> \
		     	<label for="explorar-tipo-cercanos">Cerca tuyo</label> \
		     	<input type="radio" name="explorar-tipo" id="explorar-tipo-barrio" value="barrio" checked="checked" onclick="localStorage.volver_a=\'#Explorar/Barrio\';window.location.href=\'#Explorar/Barrio\';"  /> \
		     	<label for="explorar-tipo-barrio">Por barrio</label> \
		</fieldset></div> \
        <div data-role="content" class="content-wrapper"  data-iscroll="{\"preventTouchHover\": false, \"vScroll\": false}"> \
    		<div class="listadoRubros"> \
				<ul data-role="listview" data-divider-theme="a"></ul> \
    		</div> \
        </div> \
		<div data-role="footer" data-position="fixed" data-tap-toggle="false" data-theme="a" data-id="foo"> \
		<div data-role="navbar" data-iconpos="top"> \
                    <ul> \
                        <li> \
                            <a href="#MiHeladera" data-theme="a" data-icon="heladera"> \
                                Mi Heladera \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Explorar/cercanos" data-theme="a" data-icon="explorar" class="ui-btn-active ui-state-persist"> \
                                Explorar \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Ofertas" data-theme="a" data-icon="ofertas"> \
                                Ofertas \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Cuenta" data-theme="a" data-icon="cuenta"> \
                                Mi Cuenta \
                            </a> \
                        </li> \
                    </ul> \
                </div> \
	</div>';
templates.explorar_rubro = '<div data-role="header" data-position="fixed" data-tap-toggle="false" data-id="foo"> \
            <a href="JavaScript:window.history.back();" data-icon="back" class="ui-btn-left">Atrás</a> \
            <h1><%= rubroNombre %></h1> \
        </div> \
        <div data-role="content" class="content-wrapper"  data-iscroll="{\"preventTouchHover\": false, \"vScroll\": false}"> \
    		<div class="listadoComercios listacomer"> \
				<ul data-role="listview" data-divider-theme="a"></ul> \
    		</div> \
        </div> \
		<div data-role="footer" data-position="fixed" data-tap-toggle="false" data-theme="a" data-id="foo"> \
		<div data-role="navbar" data-iconpos="top"> \
                    <ul> \
                        <li> \
                            <a href="#MiHeladera" data-theme="a" data-icon="heladera"> \
                                Mi Heladera \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Explorar/cercanos" data-theme="a" data-icon="explorar" class="ui-btn-active ui-state-persist"> \
                                Explorar \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Ofertas" data-theme="a" data-icon="ofertas"> \
                                Ofertas \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Cuenta" data-theme="a" data-icon="cuenta"> \
                                Mi Cuenta \
                            </a> \
                        </li> \
                    </ul> \
                </div>\
	</div> ';
templates.ofertas ='<div data-role="header" data-position="fixed" data-tap-toggle="false" data-id="foo"> \
            <a href="JavaScript:window.history.back();" data-icon="back" class="ui-btn-left">Atrás</a> \
            <h1>Ofertas</h1> \
        </div> \
        <div data-role="content" class="content-wrapper"> \
            <div id="listadoImanesOfertas"></div> \
        </div> \
		<div data-role="footer" data-position="fixed" data-tap-toggle="false" data-theme="a" data-id="foo"> \
		<div data-role="navbar" data-iconpos="top"> \
                    <ul> \
                        <li> \
                            <a href="#MiHeladera" data-theme="a" data-icon="heladera"> \
                                Mi Heladera \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Explorar/cercanos" data-theme="a" data-icon="explorar"> \
                                Explorar \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Ofertas" data-theme="a" data-icon="ofertas" class="ui-btn-active ui-state-persist"> \
                                Ofertas \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Cuenta" data-theme="a" data-icon="cuenta"> \
                                Mi Cuenta \
                            </a> \
                        </li> \
                    </ul> \
                </div> \
	</div>';
templates.cuenta = '<div data-role="header" data-position="fixed" data-tap-toggle="false" data-id="foo"> \
            <a href="JavaScript:window.history.back();" data-icon="back" class="ui-btn-left">Atrás</a> \
            <h1>Mi Cuenta</h1> \
            <a href="#login" data-icon="delete">Salir</a> \
        </div> \
        <div data-role="content" class="content-wrapper"> \
            <div>Mi cuenta: </div> \
            <div><%= email %></div> \
            <div>&nbsp;</div> \
            <div>Lat. Long: </div> \
            <div><%= lat %>, <%= lng %></div> \
            <div>&nbsp;</div> \
            <div>Barrio:</div> \
            <div><%= barrio %></div> \
            <div>[<a href="#Ciudad">cambiar</a>]</div> \
            <div>&nbsp;</div> \
            <div><a href="sms:01156336257?body=776655">Prueba Oferta SMS</a></div> \
        </div> \
		<div data-role="footer" data-position="fixed" data-tap-toggle="false" data-theme="a" data-id="foo"> \
		<div data-role="navbar" data-iconpos="top"> \
                    <ul> \
                        <li> \
                            <a href="#MiHeladera" data-theme="a" data-icon="heladera"> \
                                Mi Heladera \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Explorar/cercanos" data-theme="a" data-icon="explorar"> \
                                Explorar \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Ofertas" data-theme="a" data-icon="ofertas"> \
                                Ofertas \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Cuenta" data-theme="a" data-icon="cuenta" class="ui-btn-active ui-state-persist"> \
                                Mi Cuenta \
                            </a> \
                        </li> \
                    </ul> \
                </div> \
	</div>';
templates.login = '<div data-role="content"> \
    	<label>Email</label><input id="f_email" type="text" /> \
    	<Label>Contraseña</Label><input id="f_password" type="password"  /> \
    	<button id="ingresar">Ingresar</button> \
    	<input type="checkbox" id="nuevoUsuario" /> <label for="nuevoUsuario">Soy un nuevo usuario</label> \
        </div>';
templates.ciudad = '<div data-role="header" data-position="fixed" data-tap-toggle="false" data-id="foo"> \
            <a href="JavaScript:window.history.back();" data-icon="back" class="ui-btn-left">Atrás</a> \
            <h1>Ciudad</h1> \
        </div> \
        <div data-role="content" class="content-wrapper"> \
        	<div id="listaCiudades"> \
        		<ul data-role="listview"> \
        		</ul> \
        	</div> \
        </div> \
		<div data-role="footer" data-position="fixed" data-tap-toggle="false" data-theme="a" data-id="foo"> \
		<div data-role="navbar" data-iconpos="top"> \
                    <ul> \
                        <li> \
                            <a href="#MiHeladera" data-theme="a" data-icon="heladera"> \
                                Mi Heladera \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Explorar/cercanos" data-theme="a" data-icon="explorar"> \
                                Explorar \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Ofertas" data-theme="a" data-icon="ofertas"> \
                                Ofertas \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Cuenta" data-theme="a" data-icon="cuenta"> \
                                Mi Cuenta \
                            </a> \
                        </li> \
                    </ul> \
                </div> \
	</div>';
templates.barrio = '<div data-role="header" data-position="fixed" data-tap-toggle="false" data-id="foo"> \
            <a href="JavaScript:window.history.back();" data-icon="back" class="ui-btn-left">Atrás</a> \
            <h1>Barrio</h1> \
        </div> \
        <div data-role="content" class="content-wrapper"> \
        	<div id="listaBarrios"> \
        		<ul data-role="listview"> \
        		</ul> \
        	</div> \
        </div> \
		<div data-role="footer" data-position="fixed" data-tap-toggle="false" data-theme="a" data-id="foo"> \
		<div data-role="navbar" data-iconpos="top"> \
                    <ul> \
                        <li> \
                            <a href="#MiHeladera" data-theme="a" data-icon="heladera"> \
                                Mi Heladera \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Explorar/cercanos" data-theme="a" data-icon="explorar"> \
                                Explorar \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Ofertas" data-theme="a" data-icon="ofertas"> \
                                Ofertas \
                            </a> \
                        </li> \
                        <li> \
                            <a href="#Cuenta" data-theme="a" data-icon="cuenta"> \
                                Mi Cuenta \
                            </a> \
                        </li> \
                    </ul> \
                </div> \
	</div>';
