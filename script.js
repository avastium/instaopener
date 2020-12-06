const textarea = document.getElementById("textarea_logins");
const radio1 = document.getElementById("radio1");
const radio2 = document.getElementById("radio2");
const radio3 = document.getElementById("radio3");
const startButton = document.getElementById("start_button");
const selectList = document.getElementById("users_amount");
const list = document.getElementById("links_list");

let requests = [];
let complete = 0;
let openConfig = 0;

const enableSelectList = () => (selectList.disabled = false);
const disableSelectList = () => (selectList.disabled = true);

addEventListener("DOMContentLoaded", function (event) {
  disableSelectList();
});

function startScript() {
  if (textarea.value == "") return alert("Список логинов пуст!");
  complete = 0;
  requests = textarea.value.split("\n");
  if (radio1.checked) openConfig = 0;
  else if (radio2.checked) {
    openConfig = Number(selectList[selectList.selectedIndex].value);
    textarea.disabled = true;
    startButton.setAttribute("onclick", "openByAmount()");
    startButton.value = `Следующие ${openConfig} пользователей`;
    radio1.disabled = true;
    radio2.disabled = true;
    radio3.disabled = true;
    selectList.disabled = true;
  } else if (radio3.checked) openConfig = -1;
  else return alert("radiobuttons error");
  return openRequests();
}

function openRequests() {
  switch (openConfig) {
    case 0: {
      for (let i in requests) {
        window.open(`https://instagram.com/${requests[i].slice(1)}`, "_blank");
      }
      break;
    }
    case 1:
    case 2:
    case 3:
    case 5:
    case 10:
      return openByAmount();
    case -1: {
      list.innerHTML = "";
      for (let i = 0; i < requests.length; i++) {
        let link = `https://instagram.com/${requests[i].slice(1)}`;
        let newElement = document.createElement("a");
        newElement.href = link;
        newElement.innerHTML = `[${i + 1}] ${link}`;
        newElement.target = "_blank";
        newElement.title = "Открыть ссылку в новой вкладке";
        list.appendChild(newElement);
        list.appendChild(document.createElement("br"));
      }
      break;
    }
    default:
      return alert(`switch openConfig error (${openConfig})`);
  }
}

function openByAmount() {
  if (complete + openConfig > requests.length)
    openConfig = requests.length - complete;
  for (let i = complete; i < complete + openConfig; i++) {
    window.open(`https://instagram.com/${requests[i].slice(1)}`, "_blank");
  }
  complete += openConfig;
  if (complete == requests.length) {
    startButton.setAttribute("onclick", "startScript()");
    textarea.disabled = false;
    startButton.value = "Старт";
    radio1.disabled = false;
    radio2.disabled = false;
    radio3.disabled = false;
    selectList.disabled = false;
  }
}