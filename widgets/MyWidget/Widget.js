
define([
    'dojo/_base/declare',  
	'dojo/_base/html', 
	'dijit/_WidgetsInTemplateMixin', 
	'jimu/BaseWidget',
	"esri/Color",
	"dojo/string",
	"dojo/topic",
	"dijit/registry",
	"ersi/config",
	"ersi/map",
	"ersi/SpatialReference",
	"ersi/graphic",
	"esri/layers/FeatureLayer",
	"ersi/tasks/query",
	"ersi/toolbars/draw",
	'esri/symbols/jsonUtils',
	"esri/symbols/SimpleLineSymbol",
	"esri/symbols/SimpleFillSymbol",
	"dojo/on",
	"dojo/dom",
    "dojo/domReady!",
	"https://code.highcharts.com/highcharts.js"
	
  ],
  function(declare, html, _WidgetsInTemplateMixin, BaseWidget, Color, string, topic, registry, ersiConfig, Map, SpatialReference, Graphic,
  FeatureLayer, Query, Draw, SimpleLineSymbol,  SimpleFillSymbol, on, dom
  ) {
	  return declare([BaseWidget],{
		  name: 'MyWidget',
		  
		  
		  postCreate: function(){
			var layerId = this.config.layerURL;
			var fieldName = this.config.checkedField;
			console.log(fieldName);
			var lyr = this.map.getLayer(layerId);
		
			var selectsymbol = new SimpleFillSymbol(
				SimpleFillSymbol.STYLE_SOLID,
				new SimpleLineSymbol(
					SimpleLineSymbol.STYLE_SOLID,
					new Color([0,255, 0, 1]),
					2
				),
				new Color([0,255,0,0.5])
			);
			
			lyr.setSelectionSymbol(selectsymbol);
			
			var chartData = [];
			for ( var i=0; i<lyr.graphics.length; i++){
				console.log(lyr.graphics[i].attributes.fieldName);
				chartData.push([lyr.graphics[i].attributes['STATE_NAME'], lyr.graphics[i].attributes[fieldName]]);
			};
			console.log(chartData);
			var chart = new Highcharts.Chart({
				chart:{
						events: {
							selection:function(event){
								console.log(event);
							}
						},
					renderTo: this.containerHC,
					type: 'column',
				},
				title:{
					text: 'Chart rot demo'
				},
				
				subtitle:(
					text: 'Test'
				},
				plotOptions:{
					series:{
						allowPointSelect: true
					},
					column:{
						point:{
							events:{
								select:function(e){
									var qvery = new Query();
									qvery.where = "STATE_NAME = '" + e.target.name+"'";
									console.log(e);
									if(e.type == 'select'){
										lyr.selectFeatures(qvery, FeatureLayer.SELECTION_ADD);
											qvery.where='';
									}
								},
								unselect:function(evt){
									if (evt.type == 'unselect'){
										lyr.clearSelection();
									}
								}
							}
						}
					}
				},
				
				series:[{
					name: fieldName,
					data:chartData,
						states:{
							select:{
								color: 'green'
							}
						}
				}]
		  });
		  
		  
		  
		  
			var map, gr, toolbar;
			this.inherited(arguments);
			
	  },
	  
	  
	  
	  
		  
		  
		  
		  
		  
		  
				
						
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
			
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
					