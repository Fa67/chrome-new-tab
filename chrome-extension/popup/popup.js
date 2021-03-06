// let changeColor = document.getElementById('changeColor');
let button = document.getElementById('submit');
let saveButton = document.getElementById('save');

let path = './images/icons/16/icon2-2-16.png';

// chrome.browserAction.setBadgeText({ text: '' });

// chrome.storage.sync.get("color", function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
//   console.log("color changed!");
// });

chrome.storage.sync.get('guid', function(data) {
  console.log('your guid is: ' + JSON.stringify(data.guid));
});

function changeIcon(tabId) {
  console.log(tabId);
  if (path === './images/icons/16/icon2-2-16.png') {
    path = './images/icons/16/icon2-16.png';
  } else {
    path = './images/icons/16/icon2-2-16.png';
  }
  chrome.pageAction.setIcon({
    tabId,
    path,
  });
}

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     chrome.tabs.executeScript(tabs[0].id, {
//       code: 'document.body.style.backgroundColor = "' + color + '";',
//     });
//     changeIcon(tabs[0].id);
//   });
// };

chrome.storage.sync.get(['subject', 'body', 'from'], function(data) {
  document.getElementById('subject').value = data.subject;
  document.getElementById('body').value = data.body;
  document.getElementById('from').value = data.from;
  console.log('Yay!');
});
// chrome.storage.sync.get('body', function(data) {
//   document.getElementById('body').value = data.body;
// });
// chrome.storage.sync.get('from', function(data) {
//   document.getElementById('from').value = data.from;
// });

saveButton.onclick = () => {
  const subject = document.getElementById('subject').value;
  const body = document.getElementById('body').value;
  const from = document.getElementById('from').value;
  chrome.storage.sync.set({ from, subject, body }, function() {
    console.log('Saved!');
  });
};

button.onclick = () => {
  const form = document.getElementById('form');

  const isValidElement = element => {
    return element.name && element.value;
  };

  const formToJSON = elements =>
    [].reduce.call(
      elements,
      (data, element) => {
        if (isValidElement(element)) {
          data[element.name] = element.value;
        }
        return data;
      },
      {},
    );

  const data = formToJSON(form.elements);

  chrome.storage.sync.get('guid', function(store) {
    data.userGuid = store.guid;
    data.isPhishing = 0;
    data.notPhishing = 0;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      console.log(this.readyState + ' ' + this.status);
      if (this.readyState == 4 && this.status === 201) {
        alert('Thanks for sharing this email!');
        chrome.storage.sync.set(
          { from: '', subject: '', body: '' },
          function() {
            console.log('Clear!');
          },
        );
      }
    };

    xhttp.open(
      'POST',
      'https://chrome-new-tab.herokuapp.com/api/v1/emails',
      true,
    );
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));

    form.reset();
  });
};
