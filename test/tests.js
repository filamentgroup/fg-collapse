(function(window) {
	/*
		======== A Handy Little QUnit Reference ========
		http://api.qunitjs.com/

		Test methods:
			module(name, {[setup][ ,teardown]})
			test(name, callback)
			expect(numberOfAssertions)
			stop(increment)
			start(decrement)
		Test assertions:
			ok(value, [message])
			equal(actual, expected, [message])
			notEqual(actual, expected, [message])
			deepEqual(actual, expected, [message])
			notDeepEqual(actual, expected, [message])
			strictEqual(actual, expected, [message])
			notStrictEqual(actual, expected, [message])
			throws(block, [expected], [message])
    */

   var collapseA = document.querySelector("fg-collapse");

   

   test( "general API checks", function(){
        ok( customElements.get("fg-collapse"), "collapse custom element class is defined" );

        ok( collapseA.classList.contains("collapse"), "collapse one has collapse class" )

        ok( collapseA.connectedCallback, "collapseA connected callback is defined")
        ok( collapseA.disconnectedCallback, "collapseA disconnected callback is defined")

        ok( collapseA.expand, "collapse one has expand method" )
        ok( collapseA.collapse, "collapse one has collapse method" )
   });

   test(  "button is present", function(){
    ok( collapseA.querySelector("button"), "collapse has button element" );
});


    test(  "open and close methods trigger events", function(){
        collapseA.addEventListener("expand", function(e){
            ok("expand event fired");
        });
        collapseA.addEventListener("collapse", function(e){
            ok("collapse event fired");
        });
        collapseA.expand();
        collapseA.collapse();
    } );




}(window));
