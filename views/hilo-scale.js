// hilo-scale.js
// contains the hilo-scale view

/*
<div class="hilo">
  <span class="high"></span>
  <span class="low"></span>
  <div class="marker">➡</div>
</div>
*/

console.log('hilo-scale');

if(! window.Views){
  Views = {};
}

Views.hilo_scale = function(model){
  if(!model)return false;
  this.model = model;
  // create the div
  this.element = document.createElement('div');
  this.element.className = 'hilo';
  this.element.setAttribute('id','hilo_'+model.Symbol)

  // create the high span
  this.hi = document.createElement('span');
  this.hi.className = 'high';
  this.hi.innerHTML = '$' + model.DaysHigh;
  this.element.appendChild(this.hi);

  // create the low span
  this.lo = document.createElement('span');
  this.lo.className = 'low';
  this.lo.innerHTML = '$' + model.DaysLow;
  this.element.appendChild(this.lo);

  // create the marker
  // 0px - 95px from bottom
  // where high value corresponds to 95
  // and low value corresponds to 0

  var d = model.DaysHigh*1 - model.DaysLow*1; // 1.0
  var v = model.LastTradePriceOnly - model.DaysLow*1; // 0.X
  var h = (95 / d)*v; //put into pixel/dollars, then back into pixels
  h = Math.round(h); //keep our marker crisp

  this.marker = document.createElement('span');
  this.marker.className = 'marker';
  this.marker.innerHTML = '▶';
  this.marker.setAttribute('value',model.LastTradePriceOnly);
  this.marker.style.bottom = h + 'px';
  this.element.appendChild(this.marker);

  // assemble and return

}

Views.hilo_scale.prototype = {
    render : function() {},
    set_position : function() {},
    set_high : function() {},
    set_low : function() {}
}
