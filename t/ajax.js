QUnit.test( "Working", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "query", function( assert ) {
  // assess connectivity with the API
  assert.ok(
    query_stocks('GOOG',function(res){
      assert.ok( true, "Request made" );
      assert.ok( res, "Result returned" );
      assert.ok( res.response, "Response included" );
      var json = JSON.parse(res.response);
      assert.ok( json, "JSON parsed" );
      assert.ok( json.query, "Query found" );
      assert.ok( json.query.results, "Results found");
      var quote = json.query.results.quote;
      assert.ok( quote.Symbol === 'GOOG', "Symbol matches" );
      assert.ok( quote.StockExchange === 'NMS' );
  }), 'query made');
});
