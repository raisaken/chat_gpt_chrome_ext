

// Define variables and constants

const apiKey = process.env.OPENAI_API_KEY;

// const apiUrl = 'https://api.openai.com/v1/chat/completions';

const apiUrl = 'http://localhost:3000/api/send-message'

// Function to send a message to ChatGPT API
async function sendMessage(message) {
  console.log(message,'in UI')
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: message,
      max_tokens: 50, // Adjust as needed
    }),
  }); 
  const data = await response.json();
  console.log('data', data)
  return data.choices[0].text;
}

// Function to handle user input and chat interactions
async function handleUserInput() {
  const userInput = document.getElementById('user-input').value;
  document.getElementById('user-input').value = '';
  
  // Display user message
  displayMessage('You', userInput);

  // Send user message to ChatGPT API
  const botResponse = await sendMessage(userInput);

  // Display bot response
  displayMessage('ChatGPT', botResponse);
}

// Function to display messages in the chat area
function displayMessage(sender, message) {
  const chatArea = document.getElementById('chat-area');
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatArea.appendChild(messageElement);
}

// Event listener for the send button
document.getElementById('send-button').addEventListener('click', handleUserInput);
