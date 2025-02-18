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


const Models = "gpt-3.5-turbo | gpt-4o-mini | gpt-4o | gpt-4-trubo | dall-e-2 | dall-e-3";

const faviconUrl = "./Img/favicon.ico"; 

const ConnectionFailed='Opps!!! :)';


const modelName = "gpt-4o-mini"; 
const baseUrl = "https://api.avalai.ir/v1";
const apiUrl = "https://api.avalai.ir/v1/images/generations";
const apiKey = "YOUR_API_KEY";

let messages = [
    { role: "system", content: "You are a helpful assistant." }
];

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


async function SendMessage() {
  var userMessage = document.getElementById("user-input").value;
  const selectElement = document.getElementById("model-select");
  const selectedModel = selectElement.value;

  if (userMessage.trim() !== "") {
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

      document.getElementById("chat-list").appendChild(userMessageElement);

      document.getElementById("user-input").value = "";

if(selectedModel=='dall-e-3' || selectedModel=='dall-e-2')
{
  generateImage(userMessage,selectedModel);
}
else
{  
  const response = await Result(userMessage,selectedModel);

      if (response) {
          var assistantMessageElement = document.createElement("li");
          assistantMessageElement.classList.add(
              "p-2",
              "border-bottom",
              "bg-body-tertiary",
              "d-flex",
              "justify-content-start"
          );

          assistantMessageElement.innerHTML = `
          <div class="d-flex flex-row">
              <img
                  src="${Avatar_AI_Path}"
                  alt="assistant-avatar"
                  class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                  width="60"
              />
              <div class="pt-1">
                  <p class="fw-bold mb-0">${AIChatBotName}</p>
                  <p class="small text-muted">${response}</p>
              </div>
          </div>
          `;

          document.getElementById("chat-list").appendChild(assistantMessageElement);
      }}
    
  }
}

async function Result(prompt,Model) {
  const response = await getChatResponse(prompt,Model);
  if (response) {
      return response;
  } else {
      return "Sorry, something went wrong. Please try again.";
  }
}

async function getChatResponse(prompt,Model) {
  messages.push({ role: "user", content: prompt }); 
  try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
              model: Model,
              messages: messages,
              max_tokens: 1000,
          }),
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      messages.push({ role: "assistant", content: data.choices[0].message.content });
      return data.choices[0].message.content;
  } catch (error) {
      console.error("Error fetching response:", error);
      return null;
  }
}


  
  async function generateImage(prompt,model) {
    const requestBody = {
      model: model, 
      prompt: prompt,    
      size: "1024x1024", 
      n: 1,            
      quality: "standard",
    };

    try {

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.data[0].url;


        var assistantMessageElement = document.createElement("li");
        assistantMessageElement.classList.add(
          "p-2",
          "border-bottom",
          "bg-body-tertiary",
          "d-flex",
          "justify-content-start"
        );

        assistantMessageElement.innerHTML = `
          <div class="d-flex flex-row">
            <img src="${Avatar_AI_Path}" alt="assistant-avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
            <div class="pt-1">
              <p class="fw-bold mb-0">${AIChatBotName}</p>
              <img src="${imageUrl}" alt="Generated Image" style="max-width: 100%; height: auto;" />
            </div>
          </div>
        `;
        
        document.getElementById("chat-list").appendChild(assistantMessageElement);
      } else {
        console.error('Error generating image:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

 