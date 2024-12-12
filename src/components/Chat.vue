<template>
    <!-- Chat Window -->
    <v-card
        v-show="chatVisible"
        class="chat"
        transition="fade"
        width="350"
    >
    <!-- Chat Header -->
    <div class="chat-title">
        <figure class="avatar">
        <img src="/robot.png" alt="Assistant Avatar" />
        </figure>
        <h1>Gonglin Chen's</h1>
        <h2>Assistant</h2>
        <h3>Powered by Gemini-1.5-Flash</h3>
    </div>

    <!-- Chat Messages -->
    <div class="messages" ref="messagesContainer">
        <div class="messages-content">
        <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message', { 'message-personal': message.personal }]"
        >
            {{ message.text }}
            <span class="timestamp">{{ message.timestamp }}</span>
        </div>
        </div>
    </div>

    <!-- Message Input -->
    <v-row class="message-box">
        <v-textarea
            v-model="newMessage"
            class="message-input"
            placeholder="Type message..."
            rows="1"
            outlined
            dense
            @keydown.enter="query(newMessage)"
        ></v-textarea>
        <v-btn
            class="message-submit"
            elevation="2"
            @click="query(newMessage)"
            :disabled="!newMessage"
        >
        Send
        </v-btn>
    </v-row>
    </v-card>
</template>

<script>
import { fa } from 'vuetify/locale';

export default {
data() {
    return {
    chatVisible: true,
    messages: [],
    newMessage: "",
    };
},
methods: {
    insertMessage() {
        if (this.newMessage.trim()) {
            const timestamp = new Date().toLocaleTimeString();
            this.messages.push({ text: this.newMessage, personal: true, timestamp });
            this.newMessage = "";
            this.updateScrollbar();
        }
    },
    fakeMessage(text) {
        const timestamp = new Date().toLocaleTimeString();
        this.messages.push({ text, personal: false, timestamp });
        this.updateScrollbar();
        },
        updateScrollbar() {
        // Scroll to the bottom of the messages
        this.$nextTick(() => {
            const container = this.$refs.messagesContainer;
            container.scrollTop = container.scrollHeight;
        });
    },
    async query(msg) {
        this.insertMessage();
        const template = `Please act as a personal assistant who is representing Gonglin and use the following pieces of context to answer the question.

            ${JSON.stringify(this.$mainData)}

            ${JSON.stringify(this.$detailsData)}

            Question: ${msg}

            Answer: `;
        const GEMINI_API_KEY = "AIzaSyD0G_35d9UxFv-0ylL0DqsDpLD7t57CmXE";

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                {
                    parts: [{ text: template }],
                },
                ],
            }),
            }
        );

        const result = await response.json();
        const text = result.candidates[0].content.parts[0].text;
        this.fakeMessage(text);
    },
},
mounted() {
    // Initialize the chat with a welcome message
    setTimeout(() => {
        this.fakeMessage("Ask me anything about Gonglin!");
    }, 50);
},
};
</script>

<style scoped>
.chat {
  position: fixed;
  bottom: 0;
  right: 20px;
  bottom: 70px;
  height: 80vh;
  max-height: 500px;
  z-index: 999;
  overflow: hidden;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #044f48, #2a7561);
  opacity: 1;
  border-radius: 20px;
  justify-content: space-between;
  flex-direction: column;
  transform: translateY(50px);
  transition: all 0.5s;
  box-shadow: 2px 3px 16px silver;
}

.chat:before {
  position: absolute;
  width: 1px;
  height: 1px;
  content: "";
  bottom: 10px;
  left: 50%;
  top: 95%;
  border-radius: 50%;
  -webkit-transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
  transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
}

.chat.active {
  display: block;
  visibility: visible;
  box-shadow: 2px 3px 16px silver;
  transition: all 600ms;
  transform: translateY(0px);
  transition: all 0.5s;
}

/*-------------------- Chat Title --------------------*/
.chat-title {
  flex: 0 1 45px;
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  height: fit-content;
  text-transform: uppercase;
  text-align: left;
  padding: 10px 10px 10px 50px;
}

.chat-title h1,
.chat-title h2,
.chat-title h3{
  font-weight: normal;
  font-size: 15px;
  margin: 0;
  padding: 0;
}

.chat-title h2 {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  letter-spacing: 1px;
}

.chat-title h3 {
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  text-transform: lowercase;
  letter-spacing: 1px;
}

.chat-title .avatar {
  position: absolute;
  z-index: 1;
  top: 8px;
  left: 9px;
  border-radius: 30px;
  width: 30px;
  height: 30px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  border: 2px solid rgba(255, 255, 255, 0.24);
}

.chat-title .avatar img {
  width: 100%;
  height: auto;
}

/*-------------------- Messages --------------------*/
.messages {
  color: rgba(255, 255, 255, 0.5);
  overflow-y: scroll;
  position: relative;
  width: 100%;
  padding-bottom: 40px;
  height: 70%;
  margin-bottom: 10px;
}

.messages::-webkit-scrollbar {
  display: none;
}

.messages .messages-content {
  position: absolute;
  top: 0;
  left: 0;
  height: 101%;
  width: 100%;
}

.messages .message {
  clear: both;
  float: left;
  padding: 6px 10px 7px;
  border-radius: 10px 10px 10px 0;
  background: rgba(0, 0, 0, 0.3);
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.4;
  margin-left: 12px;
  position: relative;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}

.messages .message .timestamp {
  position: relative;
  bottom: -25px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
}

.messages .message::before {
  content: "";
  position: absolute;
  bottom: -6px;
  border-top: 6px solid rgba(0, 0, 0, 0.3);
  left: 0;
  border-right: 7px solid transparent;
}

.messages .message .avatar {
  position: absolute;
  z-index: 1;
  bottom: -15px;
  left: -35px;
  border-radius: 30px;
  width: 30px;
  height: 30px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  border: 2px solid rgba(255, 255, 255, 0.24);
}

.messages .message .avatar img {
  width: 100%;
  height: auto;
}

.messages .message.message-personal {
  float: right;
  right: 12px;
  color: #fff;
  text-align: left;
  background: linear-gradient(120deg, #248a52, #257287);
  border-radius: 10px 10px 0 10px;
}

.messages .message.message-personal::before {
  left: auto;
  right: 0;
  border-right: none;
  border-left: 5px solid transparent;
  border-top: 4px solid #257287;
  bottom: -4px;
}

.messages .message:last-child {
  margin-bottom: 30px;
}

.messages .message.new {
  transform: scale(0);
  transform-origin: 0 0;
  animation: bounce 500ms linear both;
}

.messages .message.loading::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: "";
  display: block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 2;
  margin-top: 4px;
  animation: ball 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
  border: none;
  animation-delay: 0.15s;
}

.messages .message.loading span {
  display: block;
  font-size: 0;
  width: 20px;
  height: 10px;
  position: relative;
}

.messages .message.loading span::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: "";
  display: block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 2;
  margin-top: 4px;
  animation: ball 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
  margin-left: -7px;
}

.messages .message.loading span::after {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: "";
  display: block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 2;
  margin-top: 4px;
  animation: ball 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
  margin-left: 7px;
  animation-delay: 0.3s;
}

/*-------------------- Message Box --------------------*/
.message-box {
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  position: relative;
  height: 75px;
}

.message-box .message-input {
  background: none;
  border: none;
  outline: none !important;
  resize: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
  padding-right: 80px;
  padding-left: 10px;
}

.message-box textarea:focus:-webkit-placeholder {
  color: transparent;
}

.message-box .message-submit {
  position: absolute;
  z-index: 1;
  top: 9px;
  right: 18px;
  color: #fff;
  height: 35px;
  border: none;
  background: #248a52;
  font-size: 14px;
  text-transform: uppercase;
  line-height: 1;
  padding: 6px 10px;
  border-radius: 10px;
  outline: none !important;
  transition: background 0.2s ease;
}

.message-box .message-submit:hover {
  background: #1d7745;
}

/*-------------------- Custom Srollbar --------------------*/
.mCSB_scrollTools {
  margin: 1px -3px 1px 0;
  opacity: 0;
}

.mCSB_inside>.mCSB_container {
  margin-right: 0px;
  padding: 0 10px;
}

.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

/*-------------------- Bounce --------------------*/
@keyframes bounce {
  0% {
    transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  4.7% {
    transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  9.41% {
    transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  14.11% {
    transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  18.72% {
    transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  24.32% {
    transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  29.93% {
    transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  35.54% {
    transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  41.04% {
    transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  52.15% {
    transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  63.26% {
    transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  85.49% {
    transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}

@keyframes ball {
  from {
    transform: translateY(0) scaleY(0.8);
  }

  to {
    transform: translateY(-10px);
  }
}

.menu {
  --s: 100px; /* control the size */
  --c: black; /* the color */
  position: absolute;
  bottom: 10%;
  z-index: 999;
  height: var(--s);
  aspect-ratio: 1;
  border: none;
  padding: 0;
  border-inline: calc(var(--s)/2) solid #0000; 
  box-sizing: content-box;
  --_g1: linear-gradient(var(--c) 20%,#0000 0 80%,var(--c) 0) 
         no-repeat content-box border-box;
  --_g2: radial-gradient(circle closest-side at 50% 12.5%,var(--c) 95%,#0000) 
         repeat-y content-box border-box;
  background: 
    var(--_g2) left  var(--_p,0px) top,
    var(--_g1) left  calc(var(--s)/10 + var(--_p,0px)) top,
    var(--_g2) right var(--_p,0px) top,
    var(--_g1) right calc(var(--s)/10 + var(--_p,0px)) top;
  background-size: 
    20% 80%,
    40% 100%;
  position: relative;
  clip-path: inset(0 25%);
  -webkit-mask: linear-gradient(90deg,#0000,#000 25% 75%,#0000);
  cursor: pointer;
  transition: 
    background-position .3s var(--_s,.3s), 
    clip-path 0s var(--_s,.6s);
  -webkit-appearance:none;
  -moz-appearance:none;
  appearance:none;
}
.menu:before,
.menu:after {
  content:"";
  position: absolute;
  border-radius: var(--s);
  inset: 40% 0;
  background: var(--c);
  transition: transform .3s calc(.3s - var(--_s,.3s));
}

.menu:checked {
  clip-path: inset(0);
  --_p: calc(-1*var(--s));
  --_s: 0s;
}
.menu:checked:before {
  transform: rotate(45deg);
}
.menu:checked:after {
  transform: rotate(-45deg);
}
.menu:focus-visible {
  clip-path: none;
  -webkit-mask: none;
  border: none;
  outline: 2px solid var(--c);
  outline-offset: 5px;
}
</style>
  