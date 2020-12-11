const socket = io('http://localhost:3000', { secure: false, reconnection: true})
const chatContainer = document.getElementById('chat-container')
const messageForm = document.getElementById('form-container')
const messageInput = document.getElementById('form-input')

const name = prompt('What is your name?')
appendMessage('You joined!', false)
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`, false)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`, false)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`, false)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`, true)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message, currentUser) {
  const messageElement = document.createElement('div')
  const className = currentUser ? 'current-user' : 'other-user'
  messageElement.className += " " + className;
  messageElement.innerText = message
  chatContainer.append(messageElement)
}