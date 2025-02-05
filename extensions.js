import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

export const OpenAIAssistantsV2Extension = {
  name: "OpenAIAssistantsV2",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_openai_assistants_v2" ||
    (trace.payload && trace.payload.name === "ext_openai_assistants_v2"),

  render: async ({ trace, element }) => {
    const { payload } = trace || {};
    const { apiKey, assistantId, threadId, userMessage, text } = payload || {};

    function removeCitations(text) {
      return text
        .replace(/【\d+:\d+†[^】]+】/g, "")
        .replace(/\[\d+:\d+\]/g, "");
    }

    const messageElement = element.closest(
      ".vfrc-message--extension-OpenAIAssistantsV2"
    );
    if (messageElement) {
      messageElement.classList.add("thinking-phase");
    }

    const waitingContainer = document.createElement("div");
    waitingContainer.innerHTML = `
    <style>
      /* Remove background for the thinking phase */
      .vfrc-message--extension-OpenAIAssistantsV2.thinking-phase {
        background: none !important;
      }

      .waiting-animation-container {
        font-family: Open Sans;
        font-size: 14px;
        font-weight: normal;
        line-height: 1.25;
        color: rgb(0, 0, 0);
        -webkit-text-fill-color: transparent;
        animation-timeline: auto;
        animation-range-start: normal;
        animation-range-end: normal;
        background: linear-gradient(
          to right,
          rgb(232, 232, 232) 10%,
          rgb(153, 153, 153) 30%,
          rgb(153, 153, 153) 50%,
          rgb(232, 232, 232) 70%
        )
        0% 0% / 300% text;
        animation: shimmer 6s linear infinite;
        text-align: left;
        margin-left: -10px;
        margin-top: 10px;
      }

      @keyframes shimmer {
        0% {
          background-position: 300% 0;
        }
        100% {
          background-position: -300% 0;
        }
      }
    </style>
    <div class="waiting-animation-container">
      ${text || "Thinking..."}
    </div>
  `;

    element.appendChild(waitingContainer);

    // Remove the waiting container function
    const removeWaitingContainer = () => {
      if (element.contains(waitingContainer)) {
        element.removeChild(waitingContainer);
      }

      // Restore the background when the message starts streaming
      if (messageElement) {
        messageElement.classList.remove("thinking-phase");
      }
    };

    const responseContainer = document.createElement("div");
    responseContainer.classList.add("response-container");
    element.appendChild(responseContainer);

    // Function to handle retries
    const fetchWithRetries = async (
      url,
      options,
      retries = 3,
      delay = 1000
    ) => {
      for (let attempt = 0; attempt < retries; attempt++) {
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response;
        } catch (error) {
          if (attempt < retries - 1) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          } else {
            throw error;
          }
        }
      }
    };

    try {
      let sseResponse;

      if (!threadId || !threadId.match(/^thread_/)) {
        // No threadId provided, or it doesn't match 'thread_...', so create a new one
        sseResponse = await fetchWithRetries(
          "https://api.openai.com/v1/threads/runs",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "OpenAI-Beta": "assistants=v2",
            },
            body: JSON.stringify({
              assistant_id: assistantId,
              stream: true,
              thread: {
                messages: [{ role: "user", content: userMessage }],
              },
            }),
          }
        );
      } else {
        // Existing threadId, so just continue that conversation
        await fetchWithRetries(
          `https://api.openai.com/v1/threads/${threadId}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "OpenAI-Beta": "assistants=v2",
            },
            body: JSON.stringify({ role: "user", content: userMessage }),
          }
        );

        sseResponse = await fetchWithRetries(
          `https://api.openai.com/v1/threads/${threadId}/runs`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "OpenAI-Beta": "assistants=v2",
            },
            body: JSON.stringify({ assistant_id: assistantId, stream: true }),
          }
        );
      }

      const reader = sseResponse.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let done = false;
      let partialAccumulator = "";
      let firstTextArrived = false;

      // Store the newly created thread ID if we see it in the SSE.
      let extractedThreadId = threadId || null;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line.startsWith("data:")) {
              continue;
            }

            const dataStr = line.slice("data:".length).trim();
            if (dataStr === "[DONE]") {
              done = true;
              break;
            }

            let json;
            try {
              json = JSON.parse(dataStr);
            } catch {
              continue;
            }

            if (json.object === "thread.run" && json.thread_id) {
              extractedThreadId = json.thread_id;
            }

            if (json.object === "thread.message.delta" && json.delta?.content) {
              for (const contentItem of json.delta.content) {
                if (contentItem.type === "text") {
                  partialAccumulator += contentItem.text?.value || "";

                  if (!firstTextArrived && partialAccumulator) {
                    firstTextArrived = true;
                    removeWaitingContainer();
                  }

                  try {
                    const cleanedText = removeCitations(partialAccumulator);
                    const formattedText = marked.parse(cleanedText);
                    responseContainer.innerHTML = formattedText;
                  } catch (e) {
                    console.error("Error parsing markdown:", e);
                  }
                }
              }
            }
          }
        }
      }

      if (!partialAccumulator) {
        removeWaitingContainer();
        responseContainer.textContent =
          "Det kan jag inte besvara, försök att omformulera din fråga.";
      }

      window.voiceflow?.chat?.interact?.({
        type: "complete",
        payload: {
          response: partialAccumulator,
          threadId: extractedThreadId,
        },
      });
    } catch (error) {
      removeWaitingContainer();
      responseContainer.textContent = `Error: ${error.message}`;
    }
  },
};
