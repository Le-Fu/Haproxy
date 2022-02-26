// let changeColor = document.getElementById("changeColor");

// // changeColor.onclick = function (el) {
// //     chrome.storage.sync.get("color", function (data) {
// //         changeColor.style.backgroundColor = data.color;
// //     });
// // };

// changeColor.onclick = function (el) {
//     chrome.storage.sync.get("color", function (data) {
//         let { color } = data;
//         console.log(color);
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             chrome.tabs.executeScript(tabs[0].id, {
//                 code: 'document.body.style.backgroundColor = "' + color + '";',
//             });
//         });
//     });
// };

import React from 'react'
import ReactDOM from 'react-dom'

function App() {
    return <div>APP</div>
}

ReactDOM.render(<App />, document.getElementById('root'))

