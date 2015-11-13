require(['jquery'], function($, Cookies) {
  var fetch_params = function() {
    var params = window.location.hash.replace(/^#/, '').split(/,/);
    if(params.length == 2) {
      return { version: params[0], datatype: params[1] };
    } else {
      return {};
    }
  };

  // We'll use this function to update the filters and buttons
  var refresh = function(params) {
    // Update our UI
    $('.filter-options .version').removeClass('btn-info');
    if(params.version) {
      $('.filter-options .version[data-version="' + params.version + '"]').addClass('btn-info');
    }

    if(params.datatype) {
      $('.filter-options .datatypes .title').text(params.datatype);
      $('.filter-options .datatypes .btn').addClass('btn-info');
    } else {
      $('.filter-options .datatypes .title').text('Datatypes');
      $('.filter-options .datatypes .btn').removeClass('btn-info');
    }

    // Filter our records
    $('.function-listing .function').each(function() {
      if(($(this).attr('data-versions') === undefined || $(this).attr('data-versions').match(params.version))
          && ($(this).attr('data-datatypes') === undefined || $(this).attr('data-datatypes').match(params.datatype))) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    
    // Update the hash
    window.location.hash = '#' + (params.version || '') + ',' + (params.datatype || '');
  };
  
  // Endpoint filter
  $('.filter-options .versions .version').click(function(e) {
    e.preventDefault();
    if($(this).hasClass('btn-info')) {
      // Toggle off
      refresh($.extend(fetch_params(), { version: '' }));
    } else {
      // Toggle on
      refresh($.extend(fetch_params(), { version: $(this).attr('data-version') }));
    }
  });

  // Datatype filter
  $('.filter-options .datatypes .datatype').click(function(e) {
    e.preventDefault();
    if($(this).attr('data-datatype') == "all") {
      // Clear filter
      refresh($.extend(fetch_params(), { datatype: '' }));
    } else {
      // Filter by this datatype
      refresh($.extend(fetch_params(), { datatype: $(this).attr('data-datatype') }));
    }
  });

  // On initial load, update based on our hash
  $(document).ready(function() {
    refresh(fetch_params());
  });
});
