Vue.directive('highlightjs', {
	deep: true,
	bind: function(el, binding) {
		// on first bind, highlight all targets
		let targets = el.querySelectorAll('code')
		targets.forEach((target) => {
			// if a value is directly assigned to the directive, use this
			// instead of the element content.
			if (binding.value) {
				target.textContent = binding.value
			}
			hljs.highlightBlock(target)
		})
	},
	componentUpdated: function(el, binding) {
		// after an update, re-fill the content and then highlight
		let targets = el.querySelectorAll('code')
		targets.forEach((target) => {
			if (binding.value) {
				target.textContent = binding.value
				hljs.highlightBlock(target)
			}
		})
	}
})

var app = new Vue({
	el: "#main",
	data: {
		view_file_filename: "",
		view_file_contents: "",
		view_file_type: "text",
		extension_zip_data: false,
		extension_id: false,
		extension_loaded: false,
		menu: "unstarted",
		extension_name: "Untitled Extension",
		report_data: {},
		visible_risky_javascript_functions: [],
		visible_web_entrypoints: [],
		static_risky_javascript_functions: [],
		static_web_entrypoints: [],
	},
	methods: {
		initialize_visible: function(event) {
			var filterables = ["risky_javascript_functions", "web_entrypoints"];
			for (var q = 0; q < filterables.length; q++) {
				var indicator_names_array = [];
				for (var i = 0; i < app.report_data[filterables[q]].length; i++) {
					var current_name = app.report_data[filterables[q]][i].indicator.name;
					if (!indicator_names_array.includes(current_name) && current_name != "") {
						indicator_names_array.push(current_name);
					}
				}
				this["visible_" + filterables[q]] = indicator_names_array;
				this["static_" + filterables[q]] = indicator_names_array;
			}
		},
		hide_visible: function(event) {
			console.log("Hide visible event: ");
			var visible_class = event.srcElement.getAttribute("filterclass");
			var indicator_name = event.srcElement.getAttribute("name");
			console.log("Class: " + visible_class + " Name: " + indicator_name);
			this["visible_" + visible_class] = this["visible_" + visible_class].filter(function(e) {
				return e !== indicator_name
			});
			menu_update();
		},
		show_visible: function(event) {
			console.log("Show visible event: ");
			var visible_class = event.srcElement.getAttribute("filterclass");
			var indicator_name = event.srcElement.getAttribute("name");
			console.log("Class: " + visible_class + " Name: " + indicator_name);
			this["visible_" + visible_class].push(
				indicator_name
			);
			console.log(this["visible_" + visible_class]);
			menu_update();
		}
	}
});

// Constantly update feather icons to combat bug with Vue integration
// Hacky, but low cost.
setInterval(function() {
	// Re-add feather icons
	feather.replace();
}, 500);

function menu_update() {
	window.scrollTo( 0, 0 );
}

function _initialize() {
	console.log("App initialized!");

	app.initialize_visible();

	// Set extension loaded status
	app.extension_loaded = true;

	Vue.nextTick(function() {
		$(".known-vulnerable-libraries-nav").click(function( event ) {
			event.preventDefault();
			app.menu = "known-vulnerable-libraries";
			menu_update();
		});

		$(".manifest-viewer-link-nav").click(function( event ) {
			event.preventDefault();
			app.menu = "manifest";
			menu_update();
		});

		$(".permissions-nav").click(function( event ) {
			event.preventDefault();
			app.menu = "permissions";
			menu_update();
		});

		$(".fingerprintable-resources-nav").click(function( event ) {
			event.preventDefault();
			app.menu = "fingerprintable-resources";
			menu_update();
		});

		$(".dangerous-functions-nav").click(function( event ) {
			event.preventDefault();
			app.menu = "dangerous-functions";
			menu_update();
		});

		$(".manifest-viewer-link-nav").click(function( event ) {
			event.preventDefault();
			app.menu = "manifest";
			menu_update();
		});

		$(".entry-points-nav").click(function( event ) {
			event.preventDefault();
			app.menu = "entry-points";
			menu_update();
		});

		$(".csp-nav").click(function( event ) {
			event.preventDefault();
			app.menu = "csp";
			menu_update();
		});

		$(".potential-clickjacking-nav").click(function( event ) {
			event.preventDefault();
			app.menu = "potential-clickjacking";
			menu_update();
		});
	});
}

function initialize() {
	app.menu = "pulling-zip-load-screen";

	app.report_data = ___REPORT_DATA___;
	_initialize();
}

initialize();
