///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
      'dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/_base/array', 
		'dojo/_base/html',
		'dojo/_base/query',
		'dojo/_base/config',
		'dojo/on',
		'dojo/Deferred',
		"dojo/dom-construct",
		'dijit/_WidgetsInTemplateMixin',
		'jimu/BaseWidgetSetting',
	    'jimu/dijit/URLInput',
		'jimu/dijit/Message',
		'jimu/portalUtils',
		'dijit/form/NumberSpinner',
		'dijit/form/ValidationTextBox',
		'dijit/form/Select',
		'dijit/form/CheckBox',
		"dojo/query",
		'dojo/NodeList-traverse',
 
  
  ],
  function(  declare, lang, array, html, query, dojoConfig, on, Deferred, domConstruct,
  _WidgetsInTemplateMixin, BaseWidgetSetting, URLInput,  Message, portalUtils,
  NumberSpinner, ValidationTextBox, Select, CheckBox, query ) {
     return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
     
      baseClass: 'jimu-widget-directions-setting',

	  
	  postCreate: function(){
		  this.inherited(arguments);
		  this.poral = portalUtils.getPortal(this.appConfig.portalUrl);
		  console.log('post CREATE');
		  var lyrs =this.map.graphicsLayerIds;
		  if(lyrs.length<=0) {
			  alert('no layers');
		  }else for (var l=0; l<lyrs.length; l++){
			  if ('fields' in  this.map.getLayer()lyrs[l])){
				  var optionl = { value: lyrs[l], label: lyrs[l], selected: false};
				  this.layerURL.addOption([optionl]);
			  }
		  };
		  that = this;
		  this.layerURL.on('change', function(e){
			  //console.log(e);
			  domConstruct.empty()that.checkBoxRow);
			  var chLyr = that.map.getLayer(e);
			  console.log(chLyr);
			  for(var f= 0; f<chLyr.fields.length; f++){
				  if (chLyr.fields[f].type == "esriFieldTypeInteger" ||chLyr.fields[f].type == "esriFieldTypeDouble"){
					  var fieldName =  chLyr.fields[f].name;
					  var inp = dojo.create("input", {id: "CB"+f, value:chLyr.fields[f].name, type: "checkbox", 'data-dojo-type':'dijit/form/CheckBox'});
					  domConstruct.place(inp, that.checkBoxRow, 'last');
					  var lab = dojo.create("label", {"for":"CB"+f, innerHTML:fieldName+'<br>'}) ;
					  domConstruct.place(lab, that.checkBoxRow, 'last');
				  }
			  }
		  }) 
	  },
	  
			  
		
	  	  
      startup: function() {
        this.inherited(arguments);
        this.setConfig(this.config);
		console.log('START');
      },

	  
 
	  
      setConfig: function(config) {
        this.config = config;
		if(!this.config){
			return;
		}
		
		this._getlayerURL().then(lang.hitch(this,function(layerURL){
			this.layerURL.set('value', layerURL);
		}));
	  },
	  
	  _getlayerURL:function(){
		  var def = new Deferred();
		  if(this.config.layerURL){
			  def.resolve(this.config.layerURL);
		  }
		  else{
			  this.poral.loadSelfInfo().then(lang.hitch(this, function(response){
				  if response && response.helperServices && response.helperServices.route){
					  def.resolve(response.helperServices.route.url);
				  }
				  else{
					  def.resolve(this._layerURL);
				  }
			  }), lang.hitch (this, function(err){
						  console.error(err);
						  def.resolve(this._layerURL);
			  }));
		  }
		  return def;
	  },
      
	  
	  
	  
      getConfig: function() {
   
		if(!this.layerURL.validate()){
			this._showValodationErrorTip(this.layerURL);
			this._showParametrsTip();
			return false;
		}
		
		var myField;
		var childsChBox = query(this.checkBoxRow).children();
		for(var i=0; i< childsChBox.length; i++) {
			if (childsChBox[i].checked) {
				myField = childsChBox[i].value;
			}
		}
		
		this.config = {
			layerURL: this.layerURL.get('value'),
			checkedField: myField,
		}
		console.log("OK")

		return this.config;
        
      },

	  _showValodationErrorTip:function(_dijit){
		  
	  },
	  
	  _showParametrsTip:function(){
	  },
   
    });
  });