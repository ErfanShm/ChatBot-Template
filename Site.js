const ChatTitle="چت بات امیر وزیری"; 
const FooterAreaTitle="متعلق به امیر وزیری";
const PagebarTitle="چباو";

const AIChatBotName="هویج";
const UserName="امیر";

const Avatar_User_Path='./Img/User-Avatar.png';
const Avatar_AI_Path='./Img/Ai-Avatar.avif';

const Button_Send_BackgroundColor='#000';
const Button_Send_Color='#fff';
const Button_Send_Text='ارسال';


const Models = "GPT3 | GPT4 | GTP Turbo";

const faviconUrl = "./Img/favicon.ico"; 

window.onload = function () {
    document.getElementById("ChatBarTitle").textContent = ChatTitle;
    document.getElementById("FooterArea").textContent = FooterAreaTitle;
    document.getElementById('PagebarTitle').textContent=PagebarTitle;

    const button = document.getElementById("send-btn");
    button.style.backgroundColor = Button_Send_BackgroundColor;
    button.style.color=Button_Send_Color;
    button.innerText=Button_Send_Text;
};

const modelsArray = Models.split(' | ');

document.addEventListener("DOMContentLoaded", function() {
    
    const selectElement = document.querySelector("select");

    modelsArray.forEach(model => {
        const option = document.createElement("option");
        option.value = model.trim(); 
        option.textContent = model.trim(); 
        selectElement.appendChild(option);
    });
});


document.addEventListener("DOMContentLoaded", function() {
  const link = document.querySelector("link[rel*='icon']");

  if (link) {
    link.href = faviconUrl; 
  } else {
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.href = faviconUrl;
    document.head.appendChild(newLink); 
  }
});


document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); 
      SendMessage();
    }
  });


  function SendMessage(){
    var userMessage = document.getElementById("user-input").value;
    if (userMessage.trim() !== "") {
      // Add user message to chat list
      var userMessageElement = document.createElement("li");
      userMessageElement.classList.add(
        "p-2",
        "border-bottom",
        "bg-body-tertiary",
        "d-flex",
        "justify-content-end"
      );

      userMessageElement.innerHTML = `
      <div class="d-flex flex-row-reverse">
            <img
          src="${Avatar_User_Path}"
          alt="user-avatar"
          class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
          width="60"
        />
        <div class="pt-1">
          <p class="fw-bold mb-0">${UserName}</p>
          <p class="small text-muted">${userMessage}</p>
        </div>
      
      </div>
    `;
      document
        .getElementById("chat-list")
        .appendChild(userMessageElement);

      // Clear input field
      document.getElementById("user-input").value = "";

      // Automatically reply from system after a short delay
      setTimeout(function () {
        var systemReplyElement = document.createElement("li");
        systemReplyElement.classList.add(
          "p-2",
          "border-bottom",
          "bg-body-tertiary",
          "d-flex",
          "justify-content-start"
        );

        systemReplyElement.innerHTML = `
        <div class="d-flex flex-row">
          <img
            src="${Avatar_AI_Path}"
            alt="system-avatar"
            class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
            width="60"
          />
          <div class="pt-1">
            <p class="fw-bold mb-0">${AIChatBotName}</p>
            <p class="small text-muted">Thanks for your message! How can I assist further?</p>
          </div>
        </div>
      `;
        document
          .getElementById("chat-list")
          .appendChild(systemReplyElement);
      }, 1000); // 1 second delay before system reply
    }
  }
