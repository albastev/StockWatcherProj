// tile.js
// contains the tile view

/*
<section class="tile">
  <h1 class="name"></h1>
  <h2 class="symbol"></h2>
  <section class="change"></section>
  <section class="value"></section>
  <section class="hilo-wrap"></section>
</section>
*/

console.log('tile')

if(! window.Views){
  Views = {};
}

// The tile view returns a tile element
Views.tile = function(model){
  if(!model)return false;
  this.model = model;

  // this object it the cannonical representation of a symbol in this app
  this.id = model.Symbol;

  // create the section
  this.element = document.createElement('section');
  this.element.className = 'tile';
  this.element.setAttribute('id','symbol_'+model.Symbol)

  this.ls = document.createElement('div');
  this.ls.className = 'left-side';
  this.element.appendChild(this.ls);

  this.rs = document.createElement('div');
  this.rs.className = 'right-side';
  this.element.appendChild(this.rs);

  // create the name header
  this.nm = document.createElement('h1');
  this.nm.className = 'name';

  this.nm.innerHTML = model.Name;
  this.ls.appendChild(this.nm);

  // create the symbol header
  this.symbol = document.createElement('h2');
  this.symbol.className = 'symbol';
  this.symbol.innerHTML = model.Symbol;
  this.ls.appendChild(this.symbol);

  // create the change section

  var d = model.Change;
  var nu = model.LastTradePriceOnly;
  var old = nu - d;
  var pct = nu / old;
  var color = 'red';
  var sign = '▼';
  if(d*1 > 0){
    color = 'green';
    pct = pct - 1;
    sign = '▲';
  }
  pct = Math.round(pct*100) / 100;

  this.change = document.createElement('section');
  this.change.className = 'change';
  this.change.innerHTML = sign + ' ' + Math.abs(d*1) + ' (%'+pct+')';
  this.change.style.color = color;
  this.ls.appendChild(this.change);

  // create the price section
  this.price = document.createElement('section');
  this.price.className = 'price';
  this.price.innerHTML = '$'+model.LastTradePriceOnly;
  this.ls.appendChild(this.price);

  this.closer = document.createElement('button');
  this.closer.className = 'closer';
  this.closer.innerHTML = '✖';
  this.closer.setAttribute('onclick','Manager.remove_stock(\'' + model.Symbol + '\');');
  this.rs.appendChild(this.closer);

  // call the hilo-scale template
  this.hilo = new Views.hilo_scale(model);
  this.rs.appendChild(this.hilo.element);

  document.getElementById('display').appendChild(this.element);

}

Views.tile.prototype = {
  render_to : function(target){
    target.appendChildNode(this.element)
  }
}
