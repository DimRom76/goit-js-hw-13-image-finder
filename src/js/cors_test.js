//------------------//
//https://www.npmjs.com/package/cors-anywhere

// Get an API key for your demos at https://unsplash.com/developers
var unsplashID =
  '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251';

var cors_api_url = 'https://obscure-citadel-20244.herokuapp.com/';
function doCORSRequest(options, printResult) {
  var x = new XMLHttpRequest();

  //x.setRequestHeader('origin', 'http://localhost); if i do this browser throwing exception.(Refused to set unsafe header "origin",in Google Chrome)
  //x.responseType = 'blob';

  x.open(options.method, cors_api_url + options.url);
  x.onload = x.onerror = function () {
    printResult(
      options.method +
        ' ' +
        options.url +
        '\n' +
        x.status +
        ' ' +
        x.statusText +
        '\n\n' +
        (x.responseText || ''),
    );
  };
  if (/^POST/i.test(options.method)) {
    x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  x.send(options.data);
}

doCORSRequest(
  {
    method: 'GET',
    url: url,
    data: '',
  },
  function printResult(result) {
    //console.log(result);
  },
);

// // Bind event
// (function () {
//   var urlField = document.getElementById('url');
//   var dataField = document.getElementById('data');
//   var outputField = document.getElementById('output');
//   document.getElementById('get').onclick = document.getElementById(
//     'post',
//   ).onclick = function (e) {
//     e.preventDefault();
//     doCORSRequest(
//       {
//         method: this.id === 'post' ? 'POST' : 'GET',
//         url: urlField.value,
//         data: dataField.value,
//       },
//       function printResult(result) {
//         outputField.value = result;
//       },
//     );
//   };
// })();
