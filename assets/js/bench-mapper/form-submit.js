// help via: https://gohkhoonhiang.github.io/2016/05/simple-contact-form-on-jekyll/
$('#contact-form-submit').click(function(e) {
    e.preventDefault();
    var contactName = $('#contact-name').val();
    var contactEmail = $('#contact-email').val();
    var contactBug = $('#contact-bug').val();
    var contactExpected = $('#contact-expected').val();
    var contactBrowser = $('#contact-browser').val();

    // data validation code here
    var invalid_input = false;

    if (contactName == null) {
      console.log("name is empty.");
      invalid_input = true;
    }

    if (contactEmail.indexOf('@') == -1) {
        console.log("please enter a valid email address.");
        invalid_input = true;
    }

    if (contactBug == null) {
        console.log("Please describe the bug.");
        invalid_input = true;
    }

    if (invalid_input !== true) {
        var url = "//docs.google.com/forms/d/1FBtvNj_spVex3Yyv1-qTSnUN1N9_Bzf9d6GnnNodPUU/formResponse";
        var data = {
            'entry.1362652741': contactName,
            'emailAddress': contactEmail,
            'entry.1479706352': contactBug,
            'entry.1612507678': contactExpected,
            'entry.1876506331': contactBrowser
        };
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: data,
            statusCode: {
                0: function() {
                    console.log("unknown");
                    window.location.href = "bug-report-success.html";
                },
                200: function() {
                    console.log("success");
                    window.location.href = "bug-report-success.html";
                }
            }
        });
    }
    else {
        console.log("form fields are required.");
    }
});

$('#bug-report-form').on("input", function() {
  // var contactName = $('#contact-name').val().trim();
  // console.log( "contact name: " + contactName);
  // if (contactName.length > 1) {
  //   $('#contact-name').parent().addClass('valid');
  // }
  // else {
  //   $('#contact-name').parent().removeClass('valid');
  // }


  if ($('#contact-email:valid').length > 0) {
    $('#contact-email').parent().removeClass('invalid');
    $('#contact-email').parent().addClass('valid');
  }
  else {
    $('#contact-name').parent().removeClass('valid');
    $('#contact-name').parent().addClass('invalid');
  }
});

$('#bug-report-form').on("textarea", function() {
  // var contactName = $('#contact-name').val().trim();
  // console.log( "contact name: " + contactName);
  // if (contactName.length > 1) {
  //   $('#contact-name').parent().addClass('valid');
  // }
  // else {
  //   $('#contact-name').parent().removeClass('valid');
  // }


  if ($('#contact-email:valid').length > 0) {
    $('#contact-email').parent().removeClass('invalid');
    $('#contact-email').parent().addClass('valid');
  }
  else {
    $('#contact-name').parent().removeClass('valid');
    $('#contact-name').parent().addClass('invalid');
  }
});



// use UAparser.js: https://codepen.io/martinkrulltott/pen/KmJmVm
function getDebugInfo() {
  var infoSections = [];
  var parser = new UAParser();
  var userOs = parser.getOS();
  var userDevice = parser.getDevice();
  var userBrowser = parser.getBrowser();
  var debugContainer = document.getElementById("debug-container");

  if (userOs && userOs.name && userOs.version) {
    infoSections.push({ name: 'OS', value: userOs.name + ' ' + userOs.version});
  }

  if (userBrowser && userBrowser.name && userBrowser.version) {
    infoSections.push({ name: 'Browser', value: userBrowser.name + ' ' + userBrowser.version});
  }

  if (userDevice && userDevice.vendor && userDevice.model) {
    infoSections.push({ name: 'Device', value: userBrowser.vendor + ' ' + userBrowser.model});
  } else {
    infoSections.push({ name: 'Device', value: 'N/A'});
  }

  if (window) {
    if (window.screen) {
      infoSections.push({ name: 'Screen resolution', value: window.screen.width + 'x' + window.screen.height});
      infoSections.push({ name: 'Available screen space', value: window.screen.availWidth + 'x' + window.screen.availHeight});
    }

    infoSections.push({ name: 'Browser window size', value: window.innerWidth + 'x' + window.innerHeight});
    infoSections.push({ name: 'Device pixel ratio', value: window.devicePixelRatio });
  }

  //Old-school JS without jQuery or another framework, just for fun
  // while (debugContainer.hasChildNodes()) {
  //   debugContainer.removeChild(debugContainer.lastChild);
  // }

  $('#contact-browser').val('');
  for (var i = 0; i < infoSections.length; i++) {
    var current_value = $('#contact-browser').val();
    current_value += infoSections[i].name + ": " + infoSections[i].value + '\r';
    $('#contact-browser').val(current_value);
  }
}

window.addEventListener("resize", function () {
  // This will fire each time the window is resized
  // Usually a good idea to wrap this in a debounce method, like http://underscorejs.org/#debounce
  getDebugInfo();
}, false);

window.addEventListener("orientationchange", function () {
  getDebugInfo();
}, false);

getDebugInfo();
