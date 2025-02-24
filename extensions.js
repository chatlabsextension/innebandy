const SVG_Thumb = `<svg width="24px" height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="currentColor"></path></svg>`;

export const FormExtension = {
  name: "FormExtension",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_form" || trace.payload.name === "ext_form",
  render: ({ trace, element }) => {
    const disableFooterInputs = (isDisabled) => {
      const chatDiv = document.getElementById("voiceflow-chat");
      const shadowRoot = chatDiv?.shadowRoot;

      shadowRoot?.querySelectorAll(".vfrc-chat-input")?.forEach((element) => {
        element.disabled = isDisabled;
        element.style.pointerEvents = isDisabled ? "none" : "auto";
        element.style.opacity = isDisabled ? "0.5" : "";
      });

      shadowRoot
        ?.querySelectorAll(".c-bXTvXv.c-bXTvXv-lckiv-type-info")
        ?.forEach((button) => {
          button.disabled = isDisabled;
        });
    };

    const formContainer = document.createElement("form");

    formContainer.innerHTML = `
      <style>
        label {
          font-size: 0.8em;
          color: #888;
        }
        input[type="text"], input[type="email"], input[type="tel"] {
          width: 100%;
          border: none;
          border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
          background: transparent;
          margin: 5px 0;
          outline: none;
        }
        .phone {
          width: 150px;
        }
        .invalid {
          border-color: red;
        }
        .submit {
          background: linear-gradient(to right, #2e6ee1, #2e7ff1 );
          border: none;
          color: white;
          padding: 10px;
          border-radius: 5px;
          width: 100%;
          cursor: pointer;
        }
      </style>

      <label for="name">Name</label>
      <input type="text" class="name" name="name" required><br><br>

      <label for="email">Email</label>
      <input type="email" class="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" title="Invalid email address"><br><br>

      <label for="phone">Phone Number</label>
      <input type="tel" class="phone" name="phone" required pattern="\\d+" title="Invalid phone number, please enter only numbers"><br><br>

      <input type="submit" class="submit" value="Submit">
    `;

    formContainer.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = formContainer.querySelector(".name");
      const email = formContainer.querySelector(".email");
      const phone = formContainer.querySelector(".phone");

      if (
        !name.checkValidity() ||
        !email.checkValidity() ||
        !phone.checkValidity()
      ) {
        name.classList.add("invalid");
        email.classList.add("invalid");
        phone.classList.add("invalid");
        return;
      }

      formContainer.querySelector(".submit").remove();
      disableFooterInputs(false);

      window.voiceflow.chat.interact({
        type: "complete",
        payload: { name: name.value, email: email.value, phone: phone.value },
      });
    });

    element.appendChild(formContainer);

    disableFooterInputs(true);
  },
};

export const MapExtension = {
  name: "Maps",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_map" || trace.payload.name === "ext_map",
  render: ({ trace, element }) => {
    const GoogleMap = document.createElement("iframe");
    const { apiKey, origin, destination, zoom, height, width } = trace.payload;

    GoogleMap.width = width || "240";
    GoogleMap.height = height || "240";
    GoogleMap.style.border = "0";
    GoogleMap.loading = "lazy";
    GoogleMap.allowFullscreen = true;
    GoogleMap.src = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}&zoom=${zoom}`;

    element.appendChild(GoogleMap);
  },
};

export const VideoExtension = {
  name: "Video",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_video" || trace.payload.name === "ext_video",
  render: ({ trace, element }) => {
    const videoElement = document.createElement("video");
    const { videoURL, autoplay, controls } = trace.payload;

    videoElement.width = 240;
    videoElement.src = videoURL;

    if (autoplay) {
      videoElement.setAttribute("autoplay", "");
    }
    if (controls) {
      videoElement.setAttribute("controls", "");
    }

    videoElement.addEventListener("ended", function () {
      window.voiceflow.chat.interact({ type: "complete" });
    });
    element.appendChild(videoElement);
  },
};

export const TimerExtension = {
  name: "Timer",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_timer" || trace.payload.name === "ext_timer",
  render: ({ trace, element }) => {
    const { duration } = trace.payload || 5;
    let timeLeft = duration;

    const timerContainer = document.createElement("div");
    timerContainer.innerHTML = `<p>Time left: <span id="time">${timeLeft}</span></p>`;

    const countdown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdown);
        window.voiceflow.chat.interact({ type: "complete" });
      } else {
        timeLeft -= 1;
        timerContainer.querySelector("#time").textContent = timeLeft;
      }
    }, 1000);

    element.appendChild(timerContainer);
  },
};

export const FileUploadExtension = {
  name: "FileUpload",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_fileUpload" || trace.payload.name === "ext_fileUpload",
  render: ({ trace, element }) => {
    const fileUploadContainer = document.createElement("div");
    fileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 110, 225, 0.3);
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' style='display: none;'>
    `;

    const fileInput = fileUploadContainer.querySelector("input[type=file]");
    const fileUploadBox = fileUploadContainer.querySelector(".my-file-upload");

    fileUploadBox.addEventListener("click", function () {
      fileInput.click();
    });

    fileInput.addEventListener("change", function () {
      const file = fileInput.files[0];
      console.log("File selected:", file);

      fileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`;

      var data = new FormData();
      data.append("UPLOADCARE_PUB_KEY", trace.payload.apiKey);
      data.append("UPLOADCARE_STORE", "auto");
      data.append("file", file, file.name);

      fetch("https://upload.uploadcare.com/base/", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Upload failed: " + response.statusText);
          }
        })
        .then((result) => {
          fileUploadContainer.innerHTML =
            '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">';
          console.log("File uploaded:", result.file);

          const fileUUID = result.file;
          const fileURL =
            "https://ucarecdn.com/" +
            fileUUID +
            "/" +
            encodeURIComponent(file.name);

          window.voiceflow.chat.interact({
            type: "complete",
            payload: {
              file: fileURL,
            },
          });
        })
        .catch((error) => {
          console.error(error);
          fileUploadContainer.innerHTML = "<div>Error during upload</div>";
        });
    });

    element.appendChild(fileUploadContainer);
  },
};

export const KBUploadExtension = {
  name: "KBUpload",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_KBUpload" || trace.payload.name === "ext_KBUpload",
  render: ({ trace, element }) => {
    const apiKey = trace.payload.apiKey || null;
    const maxChunkSize = trace.payload.maxChunkSize || 1000;
    const tags = `tags=${JSON.stringify(trace.payload.tags)}&` || "";
    const overwrite = trace.payload.overwrite || false;

    if (apiKey) {
      const kbfileUploadContainer = document.createElement("div");
      kbfileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 110, 225, 0.3);
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' accept='.txt,.text,.pdf,.docx' style='display: none;'>
    `;

      const fileInput = kbfileUploadContainer.querySelector("input[type=file]");
      const fileUploadBox =
        kbfileUploadContainer.querySelector(".my-file-upload");

      fileUploadBox.addEventListener("click", function () {
        fileInput.click();
      });

      fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];

        kbfileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`;

        const formData = new FormData();
        formData.append("file", file);

        fetch(
          `https://api.voiceflow.com/v3alpha/knowledge-base/docs/upload?${tags}overwrite=${overwrite}&maxChunkSize=${maxChunkSize}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: apiKey,
            },
            body: formData,
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Upload failed: " + response.statusText);
              window.voiceflow.chat.interact({
                type: "error",
                payload: {
                  id: 0,
                },
              });
            }
          })
          .then((result) => {
            kbfileUploadContainer.innerHTML =
              '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">';
            window.voiceflow.chat.interact({
              type: "complete",
              payload: {
                id: result.data.documentID || 0,
              },
            });
          })
          .catch((error) => {
            console.error(error);
            kbfileUploadContainer.innerHTML = "<div>Error during upload</div>";
          });
      });
      element.appendChild(kbfileUploadContainer);
    }
  },
};

export const DateExtension = {
  name: "Date",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_date" || trace.payload.name === "ext_date",
  render: ({ trace, element }) => {
    const formContainer = document.createElement("form");

    // Get current date and time
    let currentDate = new Date();
    let minDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 1);
    let maxDate = new Date();
    maxDate.setMonth(currentDate.getMonth() + 2);

    // Convert to ISO string and remove seconds and milliseconds
    let minDateString = minDate.toISOString().slice(0, 16);
    let maxDateString = maxDate.toISOString().slice(0, 16);

    formContainer.innerHTML = `
          <style>
            label {
              font-size: 0.8em;
              color: #888;
            }
            input[type="datetime-local"]::-webkit-calendar-picker-indicator {
                border: none;
                background: transparent;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
                bottom: 0;
                outline: none;
                color: transparent;
                cursor: pointer;
                height: auto;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                width: auto;
                padding:6px;
                font: normal 8px sans-serif;
            }
            .meeting input{
              background: transparent;
              border: none;
              padding: 2px;
              border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
              font: normal 14px sans-serif;
              outline:none;
              margin: 5px 0;
              &:focus{outline:none;}
            }
            .invalid {
              border-color: red;
            }
            .submit {
              background: linear-gradient(to right, #2e6ee1, #2e7ff1 );
              border: none;
              color: white;
              padding: 10px;
              border-radius: 5px;
              width: 100%;
              cursor: pointer;
              opacity: 0.3;
            }
            .submit:enabled {
              opacity: 1; /* Make the button fully opaque when it's enabled */
            }
          </style>
          <label for="date">Select your date/time</label><br>
          <div class="meeting"><input type="datetime-local" id="meeting" name="meeting" value="" min="${minDateString}" max="${maxDateString}" /></div><br>
          <input type="submit" id="submit" class="submit" value="Submit" disabled="disabled">
          `;

    const submitButton = formContainer.querySelector("#submit");
    const datetimeInput = formContainer.querySelector("#meeting");

    datetimeInput.addEventListener("input", function () {
      if (this.value) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    });
    formContainer.addEventListener("submit", function (event) {
      event.preventDefault();

      const datetime = datetimeInput.value;
      console.log(datetime);
      let [date, time] = datetime.split("T");

      formContainer.querySelector(".submit").remove();

      window.voiceflow.chat.interact({
        type: "complete",
        payload: { date: date, time: time },
      });
    });
    element.appendChild(formContainer);
  },
};

export const ConfettiExtension = {
  name: "Confetti",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_confetti" || trace.payload.name === "ext_confetti",
  effect: ({ trace }) => {
    const canvas = document.querySelector("#confetti-canvas");

    var myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });
    myConfetti({
      particleCount: 200,
      spread: 160,
    });
  },
};

export const FeedbackExtension = {
  name: "Feedback",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_feedback" || trace.payload.name === "ext_feedback",
  render: ({ trace, element }) => {
    const feedbackContainer = document.createElement("div");

    feedbackContainer.innerHTML = `
          <style>
            .vfrc-message--extension-Feedback {
                background: none;
            }

            .vfrc-feedback {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #FFFFFF;
            }

            .vfrc-feedback--description {
                font-size: 0.8em;
                color: grey;
                pointer-events: none;
            }

            .vfrc-feedback--buttons {
                display: flex;
            }

            .vfrc-feedback--button {
                margin: 0;
                padding: 0;
                margin-left: 0px;
                border: none;
                background: none;
                opacity: 0.2;
            }

            .vfrc-feedback--button:hover {
              opacity: 0.5; /* opacity on hover */
            }

            .vfrc-feedback--button.selected {
              opacity: 0.6;
            }

            .vfrc-feedback--button.disabled {
                pointer-events: none;
            }

            .vfrc-feedback--button:first-child svg {
                fill: gray; /* color for thumb up */
                stroke: none;
                border: none;
                margin-left: 6px;
            }

            .vfrc-feedback--button:last-child svg {
                margin-left: 4px;
                fill: gray; /* color for thumb down */
                stroke: none;
                border: none;
                transform: rotate(180deg);
            }
          </style>
          <div class="vfrc-feedback">
            <div class="vfrc-feedback--description">Was this helpful?</div>
            <div class="vfrc-feedback--buttons">
              <button class="vfrc-feedback--button" data-feedback="1">${SVG_Thumb}</button>
              <button class="vfrc-feedback--button" data-feedback="0">${SVG_Thumb}</button>
            </div>
          </div>
        `;

    feedbackContainer
      .querySelectorAll(".vfrc-feedback--button")
      .forEach((button) => {
        button.addEventListener("click", function (event) {
          const feedback = this.getAttribute("data-feedback");
          window.voiceflow.chat.interact({
            type: "complete",
            payload: { feedback: feedback },
          });

          feedbackContainer
            .querySelectorAll(".vfrc-feedback--button")
            .forEach((btn) => {
              btn.classList.add("disabled");
              if (btn === this) {
                btn.classList.add("selected");
              }
            });
        });
      });

    element.appendChild(feedbackContainer);
  },
};

export const CalendlyExtension = {
  name: "Calendly",
  type: "effect",
  match: ({ trace }) => {
    return (
      trace.type === "ext_calendly" || trace.payload.name === "ext_calendly"
    );
  },
  effect: ({ trace }) => {
    const { url } = trace.payload;
    if (url) {
      Calendly.initPopupWidget({ url });
    }
  },
};

export const MultiSelectExtension = {
  name: "MultiSelect",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_multiselect" ||
    trace.payload.name === "ext_multiselect",
  render: ({ trace, element }) => {
    const { options, maxSelections } = trace.payload;
    const multiSelectContainer = document.createElement("form");
    multiSelectContainer.classList.add("multi-select-form");

    element.innerHTML = "";

    multiSelectContainer.innerHTML = `
      <style>
        .multi-select-form {
          display: flex;
          flex-direction: column;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          font-family: 'Arial', sans-serif;
          max-width: 400px;
          margin: 20px auto;
        }
        .multi-select-options {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }
        .multi-select-options label {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 4px;
          background-color: #ffffff;
          border: 1px solid #ced4da;
          cursor: pointer;
          transition: background-color 0.3s, border-color 0.3s;
        }
        .multi-select-options input[type="checkbox"] {
          margin-right: 10px;
        }
        .multi-select-options label:hover {
          background-color: #e9ecef;
          border-color: #adb5bd;
        }
        .submit, .cancel {
          background-color: #007bff;
          border: none;
          color: white;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: 10px;
        }
        .submit:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }
        .submit:hover:not(:disabled) {
          background-color: #0056b3;
        }
        .cancel {
          background-color: #dc3545;
        }
        .cancel:hover {
          background-color: #c82333;
        }
        .button-group {
          display: flex;
          justify-content: space-between;
        }
        .error-message {
          color: #dc3545;
          font-size: 0.9em;
          margin-bottom: 10px;
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
      </style>
      <div class="multi-select-options">
        ${options
          .map(
            (option) => `
          <label>
            <input type="checkbox" name="options" value="${option}">
            ${option}
          </label>
        `
          )
          .join("")}
      </div>
      <div class="error-message" style="display: none;"></div>
      <div class="button-group">
        <button type="submit" class="submit" disabled>Select</button>
        <button type="button" class="cancel">Cancel</button>
      </div>
    `;

    const optionsContainer = multiSelectContainer.querySelector(
      ".multi-select-options"
    );
    const errorMessage = multiSelectContainer.querySelector(".error-message");
    const submitButton = multiSelectContainer.querySelector(".submit");
    const checkboxes = optionsContainer.querySelectorAll(
      'input[type="checkbox"]'
    );

    const updateSubmitButtonState = () => {
      const selected = optionsContainer.querySelectorAll(
        'input[name="options"]:checked'
      );
      submitButton.disabled = selected.length === 0;
    };

    const resetForm = () => {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      errorMessage.style.display = "none";
      submitButton.disabled = true;
    };

    resetForm();

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selected = optionsContainer.querySelectorAll(
          'input[name="options"]:checked'
        );
        if (selected.length > maxSelections) {
          checkbox.checked = false;
          errorMessage.style.display = "block";
          errorMessage.textContent = `You can select up to ${maxSelections} options only.`;
          multiSelectContainer.style.animation = "shake 0.5s";
          setTimeout(() => {
            multiSelectContainer.style.animation = "none";
          }, 500);
        } else {
          errorMessage.style.display = "none";
        }
        updateSubmitButtonState();
      });
    });

    multiSelectContainer.addEventListener("submit", function (event) {
      event.preventDefault();
      const selectedOptions = optionsContainer.querySelectorAll(
        'input[name="options"]:checked'
      );
      const selectedOptionsValues = Array.from(selectedOptions).map(
        (option) => option.value
      );
      window.voiceflow.chat.interact({
        type: "complete",
        payload: {
          options: selectedOptionsValues,
        },
      });
      resetForm();
    });

    const cancelButton = multiSelectContainer.querySelector(".cancel");
    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      resetForm();
      window.voiceflow.chat.interact({
        type: "cancel",
        payload: {
          options: [],
        },
      });
    });

    element.appendChild(multiSelectContainer);
  },
};

export const DisableInputExtension = {
  name: "DisableInput",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_disableInput" ||
    trace.payload.name === "ext_disableInput",
  effect: ({ trace }) => {
    const { isDisabled } = trace.payload;

    const disableInputs = (isDisabled) => {
      const chatDiv = document.getElementById("voiceflow-chat");
      const shadowRoot = chatDiv?.shadowRoot;

      if (!shadowRoot) return;

      const sendButton = shadowRoot.querySelector("#vfrc-send-message");
      if (sendButton) {
        sendButton.disabled = isDisabled;
        sendButton.style.pointerEvents = isDisabled ? "none" : "auto";
        sendButton.style.cursor = isDisabled ? "not-allowed" : "pointer";
      }

      const textAreas = shadowRoot.querySelectorAll(
        ".vfrc-chat-input, ._1kk1h6j6"
      );

      textAreas.forEach((element) => {
        element.disabled = false;
        element.style.pointerEvents = "auto";

        element.onkeydown = (event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            if (isDisabled) {
              event.preventDefault();
              event.stopPropagation();
            }
          }
        };
      });
    };

    disableInputs(isDisabled);
  },
};

export const BrowserDataExtension = {
  name: "BrowserData",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_browserData" ||
    trace.payload?.name === "ext_browserData",
  effect: async ({ trace }) => {
    const apiKey = trace.payload?.apiKey;
    if (!apiKey) {
      console.error("API key is missing from the payload.");
      return;
    }

    const getCookies = () => {
      const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=").map((c) => c.trim());
        acc[name] = value;
        return acc;
      }, {});
      return cookies;
    };

    const getBrowserInfo = () => {
      const userAgent = navigator.userAgent;
      let browserName = "Unknown";
      let browserVersion = "Unknown";

      if (/chrome/i.test(userAgent)) {
        browserName = "Chrome";
        browserVersion = userAgent.match(/chrome\/([\d.]+)/i)[1];
      } else if (/firefox/i.test(userAgent)) {
        browserName = "Firefox";
        browserVersion = userAgent.match(/firefox\/([\d.]+)/i)[1];
      } else if (/safari/i.test(userAgent)) {
        browserName = "Safari";
        browserVersion = userAgent.match(/version\/([\d.]+)/i)[1];
      } else if (/msie/i.test(userAgent) || /trident/i.test(userAgent)) {
        browserName = "Internet Explorer";
        browserVersion = userAgent.match(/(msie\s|rv:)([\d.]+)/i)[2];
      }

      return { browserName, browserVersion };
    };

    const getViewportSize = () => {
      const width = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const height = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      return { width, height };
    };

    const getIpData = async () => {
      const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
        const data = await response.json();
        return {
          ip: data.ip,
          country: data.country_name || "Unknown",
        };
      } catch (error) {
        console.error("Error fetching IP data:", error.message);
        return {
          ip: "Unavailable",
          country: "Unknown",
        };
      }
    };

    const { ip, country } = await getIpData();
    const url = window.location.href;
    const params = new URLSearchParams(window.location.search).toString();
    const cookies = getCookies();
    const timezone = new Date().toISOString();
    const time = new Date().toLocaleTimeString();
    const ts = Math.floor(Date.now() / 1000);
    const userAgent = navigator.userAgent;
    const { browserName, browserVersion } = getBrowserInfo();
    const lang = navigator.language;
    const supportsCookies = navigator.cookieEnabled;
    const platform = navigator.platform;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const { width: viewportWidth, height: viewportHeight } = getViewportSize();

    window.voiceflow.chat.interact({
      type: "complete",
      payload: {
        ip,
        country,
        url,
        params,
        cookies,
        timezone,
        time,
        ts,
        userAgent,
        browserName,
        browserVersion,
        lang,
        supportsCookies,
        platform,
        screenResolution: `${screenWidth}x${screenHeight}`,
        viewportSize: `${viewportWidth}x${viewportHeight}`,
      },
    });
  },
};

export const CustomImageExtension = {
  name: "CustomImage",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_custom_image" ||
    trace.payload.name === "ext_custom_image",
  render: ({ trace, element }) => {
    const { imgURL } = trace.payload;

    const style = document.createElement("style");
    style.textContent = `
      .vfrc-message--extension-CustomImage {
        background-color: #ffffff !important;
      }
      .custom-image-container {
        display: inline-block;
        width: 32px;
        height: 32px;
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
      }
      .custom-image-container img {
        display: block;
        width: 32px;
        height: 32px;
        margin-left: -10px; /* Adjust this value to move the image left */
        margin-top: 10px; /* Adjust this value to move the image down */
        border-radius: 20px; /* Apply border radius */
      }
    `;

    const div = document.createElement("div");
    div.className = "custom-image-container";

    const img = document.createElement("img");
    img.src = imgURL;
    img.alt = "BOTTY";

    div.appendChild(img);
    element.appendChild(style);
    element.appendChild(div);
  },
};

export const RankOptionsExtension = {
  name: "RankOptions",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_rankoptions" ||
    trace.payload.name === "ext_rankoptions",
  render: ({ trace, element }) => {
    const { options } = trace.payload;

    const createForm = () => {
      const formContainer = document.createElement("form");
      formContainer.classList.add("rank-options-form");

      element.innerHTML = "";

      formContainer.innerHTML = `
        <style>
          .rank-options-form {
            display: flex;
            flex-direction: column;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            font-family: 'Arial', sans-serif;
            margin: 20px auto;
          }
          .rank-options-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .rank-options-list li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            margin-bottom: 10px;
            background-color: #ffffff;
            border: 1px solid #ced4da;
            border-radius: 4px;
            cursor: grab;
          }
          .submit-button {
            background-color: #007bff;
            border: none;
            color: white;
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-top: 10px;
          }
          .submit-button:hover {
            background-color: #0056b3;
          }
        </style>
        <h3>Drag and drop to rank options</h3>
        <ul class="rank-options-list">
          ${options
            .map(
              (option) => `
            <li data-value="${option}">
              <span>${option}</span>
            </li>
          `
            )
            .join("")}
        </ul>
        <button type="submit" class="submit-button">Submit</button>
      `;

      formContainer.addEventListener("submit", function (event) {
        event.preventDefault();
        const rankedOptions = Array.from(
          formContainer.querySelectorAll(".rank-options-list li")
        ).map((li) => li.dataset.value);
        window.voiceflow.chat.interact({
          type: "complete",
          payload: { rankedOptions },
        });
      });

      element.appendChild(formContainer);

      initializeSortable();
    };

    function initializeSortable() {
      const rankOptionsList = element.querySelector(".rank-options-list");
      if (rankOptionsList) {
        new Sortable(rankOptionsList, {
          animation: 150,
          onEnd: () => {},
          onMove: (evt) => {
            // Adjust the scroll position when dragging items
            const rect = evt.dragged.getBoundingClientRect();
            const containerRect = rankOptionsList.getBoundingClientRect();

            // Scroll down if dragging near the bottom of the container
            if (rect.bottom > containerRect.bottom - 20) {
              rankOptionsList.scrollTop += 5;
            }
            // Scroll up if dragging near the top of the container
            if (rect.top < containerRect.top + 20) {
              rankOptionsList.scrollTop -= 5;
            }
          },
        });
      }
    }

    if (typeof Sortable === "undefined") {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js";
      script.onload = () => {
        createForm();
      };
      script.onerror = () => {};
      document.head.appendChild(script);
    } else {
      createForm();
    }
  },
};

export const DropdownExtension = {
  name: "DropdownExtension",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_dropdown" || trace.payload.name === "ext_dropdown",
  render: ({ trace, element }) => {
    const disableFooterInputs = (isDisabled) => {
      const chatDiv = document.getElementById("voiceflow-chat");
      if (chatDiv) {
        const shadowRoot = chatDiv.shadowRoot;
        if (shadowRoot) {
          const textareas = shadowRoot.querySelectorAll("textarea");
          textareas.forEach((textarea) => {
            textarea.disabled = isDisabled;
            textarea.style.backgroundColor = isDisabled ? "#d3d3d3" : "";
            textarea.style.opacity = isDisabled ? "0.5" : "";
            textarea.style.pointerEvents = isDisabled ? "none" : "auto";
          });

          const buttons = shadowRoot.querySelectorAll(
            ".c-bXTvXv.c-bXTvXv-lckiv-type-info"
          );
          buttons.forEach((button) => {
            button.disabled = isDisabled;
            button.style.pointerEvents = isDisabled ? "none" : "auto";
          });
        }
      }
    };

    const formContainer = document.createElement("form");

    const dropdownOptions = trace.payload.options || [];

    formContainer.innerHTML = `
      <style>
        label {
          font-size: 0.8em;
          color: #888;
        }
        input[type="text"], select {
          width: 100%;
          border: none;
          border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
          background: transparent;
          margin: 5px 0;
          outline: none;
        }
        .invalid {
          border-color: red;
        }
        .submit {
          background: linear-gradient(to right, #2e6ee1, #2e7ff1 );
          border: none;
          color: white;
          padding: 10px;
          border-radius: 5px;
          width: 100%;
          cursor: pointer;
          opacity: 0.5;
          pointer-events: none;
        }
        .submit.enabled {
          opacity: 1;
          pointer-events: auto;
        }
        .dropdown-container {
          position: relative;
        }
        .dropdown-options {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          max-height: 150px;
          overflow-y: auto;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.1);
          z-index: 999;
          display: none;
        }
        .dropdown-options div {
          padding: 10px;
          cursor: pointer;
        }
        .dropdown-options div:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      </style>

      <label for="dropdown">Select an option</label>
      <div class="dropdown-container">
        <input type="text" class="dropdown-search" placeholder="Search..." autocomplete="off">
        <div class="dropdown-options">
          ${dropdownOptions
            .map((option) => `<div data-value="${option}">${option}</div>`)
            .join("")}
        </div>
        <input type="hidden" class="dropdown" name="dropdown" required>
      </div><br><br>

      <input type="submit" class="submit" value="Submit">
    `;

    const dropdownSearch = formContainer.querySelector(".dropdown-search");
    const dropdownOptionsDiv = formContainer.querySelector(".dropdown-options");
    const hiddenDropdownInput = formContainer.querySelector(".dropdown");
    const submitButton = formContainer.querySelector(".submit");

    const enableSubmitButton = () => {
      const isValidOption = dropdownOptions.includes(hiddenDropdownInput.value);
      if (isValidOption) {
        submitButton.classList.add("enabled");
      } else {
        submitButton.classList.remove("enabled");
      }
    };

    dropdownSearch.addEventListener("click", function () {
      dropdownOptionsDiv.style.display =
        dropdownOptionsDiv.style.display === "block" ? "none" : "block";
    });

    dropdownSearch.addEventListener("input", function () {
      const filter = dropdownSearch.value.toLowerCase();
      const options = dropdownOptionsDiv.querySelectorAll("div");
      options.forEach((option) => {
        const text = option.textContent.toLowerCase();
        option.style.display = text.includes(filter) ? "" : "none";
      });
      dropdownOptionsDiv.style.display = "block";
      hiddenDropdownInput.value = "";
      enableSubmitButton();
    });

    dropdownOptionsDiv.addEventListener("click", function (event) {
      if (event.target.tagName === "DIV") {
        const selectedValue = event.target.getAttribute("data-value");
        dropdownSearch.value = selectedValue;
        hiddenDropdownInput.value = selectedValue;
        dropdownOptionsDiv.style.display = "none";
        enableSubmitButton();
      }
    });

    formContainer.addEventListener("submit", function (event) {
      event.preventDefault();

      const dropdown = formContainer.querySelector(".dropdown");
      const isValidOption = dropdownOptions.includes(hiddenDropdownInput.value);

      if (!isValidOption) {
        dropdownSearch.classList.add("invalid");
        return;
      }

      formContainer.querySelector(".submit").remove();
      disableFooterInputs(false);

      window.voiceflow.chat.interact({
        type: "complete",
        payload: { dropdown: dropdown.value },
      });
    });

    element.appendChild(formContainer);

    disableFooterInputs(true);
  },
};

export const CarouselExtension = {
  name: "Carousel",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_carousel" || trace.payload.name === "ext_carousel",
  render: ({ trace, element }) => {
    console.log("trace:", trace);
    console.log("element:", element);

    const { carouselItems } = trace.payload;
    console.log("carouselItems:", carouselItems);

    if (!carouselItems || !Array.isArray(carouselItems)) {
      console.error("Invalid carouselItems payload:", carouselItems);
      return;
    }

    const carouselWrapper = document.createElement("div");
    carouselWrapper.classList.add("carousel-wrapper");

    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel-container");

    // Ensure the container is scrollable
    carouselContainer.style.overflowX = "auto";
    carouselContainer.style.whiteSpace = "nowrap";

    carouselItems.forEach((item) => {
      console.log("Rendering item", item);

      const cardElement = document.createElement("div");
      cardElement.classList.add("carousel-card");

      const buttonsHTML = item.buttons
        .map((button) => {
          return `<button data-actions='${JSON.stringify(
            button.payload.actions
          )}'>${button.name}</button>`;
        })
        .join("");

      cardElement.innerHTML = `
        <style>
          .carousel-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }
          .carousel-container {
            display: flex;
            overflow-x: auto;
            gap: 10px;
            padding: 10px;
            scroll-behavior: smooth;
            white-space: nowrap;
            width: 100%;
          }
          .carousel-card {
            background-color: white;
            border: 1px solid #f1f1f1;
            border-radius: 8px;
            box-shadow: 0 5px 8px -8px rgba(0, 0, 0, 0.1), 0 2px 4px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 3px 1px rgba(0, 0, 0, 0.1);
            width: 268px;
            flex-shrink: 0;
            padding: 10px;
            display: inline-flex;
            flex-direction: column;
            background-color: #f9f9f9;
            white-space: normal;
            position: relative;
          }
          .carousel-card img {
            max-width: 100%;
            border-radius: 8px;
          }
          .carousel-card h3 {
            margin: 10px 0 5px;
            font-size: 1.2em;
            color: #000;
            word-break: break-word;
          }
          .carousel-card p {
            margin: 0;
            font-size: 0.9em;
            color: #666;
            word-break: break-word;
          }
          .carousel-card button {
            display: block;
            margin: 10px auto 0;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .carousel-card button:hover {
            background-color: #0056b3;
          }
          .carousel-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.5);
            border: none;
            color: white;
            padding: 10px;
            cursor: pointer;
            z-index: 1;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .carousel-arrow.left {
            left: 10px;
          }
          .carousel-arrow.right {
            right: 10px;
          }
        </style>
        <img src="${item.imageUrl}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description.text}</p>
        ${buttonsHTML}
      `;

      cardElement.querySelectorAll("button[data-actions]").forEach((button) => {
        button.addEventListener("click", () => {
          const actions = JSON.parse(button.getAttribute("data-actions"));
          console.log("Button actions:", actions);
          actions.forEach((action) => {
            if (action.type === "open_url") {
              window.open(action.url, "popup", "width=600,height=600"); // Open in a popup window
            } else {
              window.voiceflow.chat.interact({
                type: action.type,
                payload: action.payload,
              });
            }
          });
        });
      });

      carouselContainer.appendChild(cardElement);
    });

    const arrowLeft = document.createElement("button");
    arrowLeft.classList.add("carousel-arrow", "left");
    arrowLeft.innerHTML = "&#9664;"; // Left arrow
    arrowLeft.addEventListener("click", () => {
      carouselContainer.scrollBy({ left: -278, behavior: "smooth" });
      console.log("Left arrow clicked, scrolling left");
    });

    const arrowRight = document.createElement("button");
    arrowRight.classList.add("carousel-arrow", "right");
    arrowRight.innerHTML = "&#9654;"; // Right arrow
    arrowRight.addEventListener("click", () => {
      carouselContainer.scrollBy({ left: 278, behavior: "smooth" });
      console.log("Right arrow clicked, scrolling right");
    });

    carouselWrapper.appendChild(arrowLeft);
    carouselWrapper.appendChild(carouselContainer);
    carouselWrapper.appendChild(arrowRight);
    element.appendChild(carouselWrapper);

    console.log("Carousel rendered with arrows initialized");
  },
};

export const CustomScreenExtension = {
  name: "CustomScreen",
  type: "effect",
  match: ({ trace }) => {
    return (
      trace.type === "ext_customScreen" ||
      trace.payload.name === "ext_customScreen"
    );
  },
  effect: ({ trace }) => {
    const chatDiv = document.getElementById("voiceflow-chat");
    if (chatDiv) {
      const shadowRoot = chatDiv.shadowRoot;
      if (shadowRoot) {
        const inputContainer = shadowRoot.querySelector(
          "._1be70ce0"
        );
        const dialogContainer = shadowRoot.querySelector(".vfrc-footer._1hoini32");

        if (inputContainer && dialogContainer) {
          const overlay = document.createElement("div");
          overlay.style.position = "absolute";
          overlay.style.top = "0";
          overlay.style.left = "0";
          overlay.style.width = "100%";
          overlay.style.height = "100%";
          overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
          overlay.style.zIndex = "1000";

          const customContainer = document.createElement("div");
          customContainer.style.position = "absolute";
          customContainer.style.zIndex = "1000";
          customContainer.style.width = "100%";
          customContainer.style.bottom = "0";

          customContainer.innerHTML = `
            <style>
              .custom-header {
                box-sizing: border-box;
                box-shadow: rgba(48, 31, 6, 0.04) 0px -2px 8px;
                opacity: 0;
                transform: translateY(100%);
                height: 210px;
                transition: all 0.5s ease-out;
                overflow: hidden;
                border-width: 1px;
                border-style: solid;
                border-color: rgb(232, 232, 235);
                border-image: initial;
                border-radius: 16px 16px 0px 0px;
                background: rgb(255, 255, 255);
                padding: 20px 15px;
                text-align: left;
                font-family: "Open Sans";
                z-index: 4; 
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                color: rgba(0, 0, 0, 0.85);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .custom-header.show {
                transform: translateY(0);
                opacity: 1;
              }
              .custom-header.hide {
                transform: translateY(100%);
                opacity: 0;
              }
              .custom-buttons {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0px;
              }
              .custom-button {
                background: none;
                border: none;
                width: 100%;
                height: 100%;
                text-align: left;
                font-size: 16px;
                line-height: 1.25;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                color: rgba(0, 0, 0, 0.85);
                padding: 10px 0;
                margin: 4px 2px;
                transition: background-color 0.3s ease;
                font-family: 'Open Sans';
              }
              .custom-button:hover {
                background-color: rgba(0, 0, 0, 0.1);
              }
              .custom-underline {
                width: calc(100% - 16px); 
                height: 1px;
                background-color: rgba(0, 0, 0, 0.1);
                margin-left: 8px; 
                margin-right: 8px; 
                margin-top: -4px; 
              }
              .custom-button.skip {
                margin: 0px 0 0;
                border: 1px solid transparent;
                font-size: 16px;
                font-weight: 500;
                border-radius: 8px;
                line-height: 20px;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: transparent;
                color: rgba(0, 0, 0, 0.85);
                transition: none;
              }
            </style>
            <div class="custom-header">
              <p style="margin-bottom: 10px;">Please choose one of the options:</p>
              <div class="custom-buttons">
                <button class="custom-button" id="email-btn" data-selection="email">Email Address</button>
                <div class="custom-underline"></div>
                <button class="custom-button" id="order-id-btn" data-selection="order_number">Order Number</button>
                <div class="custom-underline"></div>
              </div>
              <div style="margin-top: auto;">
                <button class="custom-button skip" id="skip-btn" data-selection="skip">Skip</button>
              </div>
            </div>
          `;

          dialogContainer.appendChild(overlay);
          dialogContainer.appendChild(customContainer);

          setTimeout(() => {
            customContainer
              .querySelector(".custom-header")
              .classList.add("show");
          }, 10);

          const slideDownAndRemove = () => {
            customContainer
              .querySelector(".custom-header")
              .classList.remove("show");
            customContainer
              .querySelector(".custom-header")
              .classList.add("hide");

            setTimeout(() => {
              customContainer.remove();
              overlay.remove();
            }, 500);
          };

          const handleSelection = (selection) => {
            window.voiceflow.chat.interact({
              type: "selection_made",
              payload: { selection },
            });
            slideDownAndRemove();
          };

          customContainer
            .querySelectorAll(".custom-button")
            .forEach((button) => {
              button.addEventListener("click", () => {
                const selection = button.getAttribute("data-selection");
                handleSelection(selection);
              });
            });
        }
      }
    }
  },
};

export const SkipButtonExtension = {
  name: "SkipButton",
  type: "effect",
  match: ({ trace }) => {
    return (
      trace.type === "ext_skipButton" || trace.payload.name === "ext_skipButton"
    );
  },
  effect: ({ trace }) => {
    const chatDiv = document.getElementById("voiceflow-chat");
    if (chatDiv) {
      const shadowRoot = chatDiv.shadowRoot;
      if (shadowRoot) {
        const footerContainer = shadowRoot.querySelector(
          ".vfrc-footer--watermark.c-cejRVw"
        );

        if (footerContainer) {
          const skipButtonContainer = document.createElement("div");
          skipButtonContainer.innerHTML = `
            <style>
              .skip-button-container {
                width: 100%;
                display: flex;
                justify-content: center;
                background-color: white;
                padding: 10px 0;
              }
              .skip-button {
                margin: 0px;
                border: 1px solid transparent;
                font-size: 1rem;
                font-weight: 500;
                border-radius: 8px;
                line-height: 20px;
                padding: 10px 17px;
                box-sizing: border-box;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: transparent;
                color: rgba(0, 0, 0, 0.85);
                transition: background-color 333ms ease-in-out, color 333ms ease-in-out;
              }
              .skip-button:hover {
                background-color: rgba(46, 110, 225, 0.2);
                color: rgba(0, 0, 0, 1);
              }
            </style>
            <div class="skip-button-container">
              <button class="skip-button" id="skip-btn">Skip</button>
            </div>
          `;

          footerContainer.appendChild(skipButtonContainer);

          const handleSkip = () => {
            window.voiceflow.chat.interact({
              type: "selection_made",
              payload: { selection: "skip" },
            });
            skipButtonContainer.remove();
          };

          skipButtonContainer
            .querySelector("#skip-btn")
            .addEventListener("click", handleSkip);
        }
      }
    }
  },
};

export const SettingsScreenExtension = {
  name: "SettingsScreen",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_settingsScreen" ||
    trace.payload.name === "ext_settingsScreen",
  effect: ({ trace }) => {
    const chatDiv = document.getElementById("voiceflow-chat");
    if (chatDiv) {
      const shadowRoot = chatDiv.shadowRoot;
      if (shadowRoot) {
        if (shadowRoot.querySelector(".kebab-menu")) {
          return;
        }

        const header = shadowRoot.querySelector(".vfrc-header.c-iCDrnV");
        const inputContainer = shadowRoot.querySelector(
          ".vfrc-chat-input.c-cNrVYs"
        );
        const dialogContainer = shadowRoot.querySelector(".vfrc-chat--dialog");

        if (header && inputContainer && dialogContainer) {
          const kebabMenu = document.createElement("div");
          kebabMenu.innerHTML = `
            <style>
              .kebab-menu {
                position: relative;
                cursor: pointer;
                padding: 10px;
                z-index: 10;
              }
              .overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 99;  /* Ensure the overlay is behind the settings screen */
                display: none;
              }
              .settings-screen {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                background: white;
                display: flex;
                flex-direction: column;
                z-index: 100;  /* Ensure it is above the overlay */
                padding: 0;
                border-radius: 16px 16px 0 0;
                box-shadow: rgba(48, 31, 6, 0.1) 0px -2px 8px;
                transform: translateY(100%);
                opacity: 0;
                transition: transform 320ms cubic-bezier(0.45, 1.29, 0.64, 1), opacity 320ms ease-out;
              }
              .settings-screen.show {
                transform: translateY(0);
                opacity: 1;
              }
              .settings-header {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 15px;
              }
              .settings-title {
                font-size: 18px;
                font-weight: bold;
                text-align: center;
                margin: 0 auto;
              }
              .close-settings {
                position: absolute;
                top: 0px;
                right: 0px;
                margin: 6px 8px;
                height: 32px;
                width: 32px;
                background: none;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .close-settings svg {
                fill: #666666;
              }
              .settings-modal {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: stretch;
              }
              .settings-modal hr {
                width: calc(100% - 40px);
                margin: 0 20px;
                border: none;
                border-top: 1px solid #ddd;
              }
              .settings-modal button {
                background: none;
                border: none;
                padding: 15px 20px;
                font-size: 16px;
                text-align: left;
                cursor: pointer;
                font-family: 'Space Grotesk', sans-serif;
                display: flex;
                align-items: center;
              }
              .settings-modal button .icon {
                margin-right: 10px;
              }
              .settings-modal button:hover {
                background-color: rgba(0, 0, 0, 0.05);
              }
              .settings-footer {
                display: flex;
                justify-content: center;
                font-size: 12px;
                color: #888;
                padding: 10px 0;
              }
              .settings-footer a {
                color: #888;
                text-decoration: none;
                margin: 0 5px;
              }
              .settings-footer a:hover {
                text-decoration: underline;
              }
            </style>
            <div class="kebab-menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,7a2,2,0,1,0-2-2A2,2,0,0,0,12,7Zm0,10a2,2,0,1,0,2,2A2,2,0,0,0,12,17Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"></path>
              </svg>
            </div>
            <div class="overlay"></div>
            <div class="settings-screen">
              <div class="settings-header">
                <span class="settings-title">Settings</span>
                <button class="close-settings">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                  </svg>
                </button>
              </div>
              <div class="settings-modal">
                <hr>
                <button id="change-language">
                  <span class="icon">🌐</span>Change language
                </button>
                <button id="email-transcript">
                  <span class="icon">✉️</span>Email transcript
                </button>
                <hr>
              </div>
              <div class="settings-footer">
                <a href="https://www.google.com" target="_blank">Privacy</a> • <a href="https://www.google.com" target="_blank">Terms</a>
              </div>
            </div>
          `;

          header.insertBefore(kebabMenu, header.firstChild);

          const overlay = kebabMenu.querySelector(".overlay");
          const settingsScreen = kebabMenu.querySelector(".settings-screen");
          dialogContainer.appendChild(overlay); // Append the overlay to the dialog container
          dialogContainer.appendChild(settingsScreen); // Append the settings screen to the dialog container

          kebabMenu
            .querySelector(".kebab-menu")
            .addEventListener("click", (event) => {
              event.stopPropagation();
              settingsScreen.classList.toggle("show");
              overlay.style.display = settingsScreen.classList.contains("show")
                ? "block"
                : "none";
            });

          settingsScreen
            .querySelector(".close-settings")
            .addEventListener("click", () => {
              settingsScreen.classList.remove("show");
              overlay.style.display = "none";
            });

          settingsScreen
            .querySelector("#change-language")
            .addEventListener("click", () => {
              window.voiceflow.chat.interact({
                type: "change_language",
                payload: { action: "change_language" },
              });
              settingsScreen.classList.remove("show");
              overlay.style.display = "none";
            });

          settingsScreen
            .querySelector("#email-transcript")
            .addEventListener("click", () => {
              window.voiceflow.chat.interact({
                type: "email_transcript",
                payload: { action: "email_transcript" },
              });
              settingsScreen.classList.remove("show");
              overlay.style.display = "none";
            });

          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                  if (
                    node.nodeType === 1 &&
                    node.matches(
                      ".vfrc-chat.c-ealvbK.c-ealvbK-hMxnbF-withPrompt-true"
                    )
                  ) {
                    settingsScreen.classList.remove("show");
                    overlay.style.display = "none";
                  }
                });
              }
            });
          });

          observer.observe(shadowRoot, { childList: true, subtree: true });
        }
      }
    }
  },
};

export const StripeBuyButtonExtension = {
  name: "StripeBuyButton",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_stripeBuyButton" ||
    trace.payload.name === "ext_stripeBuyButton",
  render: ({ trace, element }) => {
    const { publishableKey, buyButtonId, sessionId } = trace.payload;

    // Log the payload values
    console.log("Received Payload:", trace.payload);
    console.log("Publishable Key:", publishableKey);
    console.log("Buy Button ID:", buyButtonId);
    console.log("Session ID:", sessionId);

    if (!publishableKey || !buyButtonId || !sessionId) {
      console.log("Error: Missing publishableKey, buyButtonId, or sessionId");
      window.voiceflow.chat.interact({
        type: "error",
        payload: { message: "Missing required data for Stripe payment." },
      });
      return;
    }

    // Create a container for the Stripe button
    const stripeButtonContainer = document.createElement("div");

    // Append the container to the element
    element.appendChild(stripeButtonContainer);

    // Create the Stripe script
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    script.onload = () => {
      console.log("Stripe script loaded.");

      // Create the Stripe Buy Button element
      const stripeButton = document.createElement("stripe-buy-button");
      stripeButton.setAttribute("buy-button-id", buyButtonId);
      stripeButton.setAttribute("publishable-key", publishableKey);

      // Append the Stripe Buy Button to the container
      stripeButtonContainer.appendChild(stripeButton);

      console.log("Stripe Buy Button added to the DOM.");
    };

    // Append the script to the container
    stripeButtonContainer.appendChild(script);

    // Function to monitor payment status
    const checkPaymentStatus = async (sessionId) => {
      try {
        const stripe = require("stripe")(trace.payload.secretKey);
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        console.log("Stripe Session Data:", session);

        if (session.payment_status === "paid") {
          console.log("Payment Status: Paid");
          window.voiceflow.chat.interact({
            type: "complete",
            payload: { status: "paid" },
          });
        } else {
          console.log(
            "Payment Status: Not paid, polling again in 5 seconds..."
          );
          setTimeout(() => checkPaymentStatus(sessionId), 5000);
        }
      } catch (error) {
        console.error("Error retrieving session:", error);
      }
    };

    console.log("Checking Payment Status for Session ID:", sessionId);
    checkPaymentStatus(sessionId);
  },
};

export const PlaceholderExtension = {
  name: "Placeholder",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_placeholder" ||
    trace.payload.name === "ext_placeholder",
  effect: ({ trace }) => {
    const chatDiv = document.getElementById("voiceflow-chat");
    const shadowRoot = chatDiv.shadowRoot;
    const textarea = shadowRoot.querySelector("textarea");
    const button = shadowRoot.querySelector(
      ".vfrc-chat-input--button.c-iSWgdS"
    );

    const fadeDuration = trace.payload.fadeDuration ?? 0;
    const blankDuration = trace.payload.blankDuration ?? 0;

    const newPlaceholder = trace.payload.placeholder || "Ask a question...";

    const applyPlaceholderAnimation = (element, newPlaceholder) => {
      if (element.placeholder === newPlaceholder) {
        return;
      }

      element.style.transition = `opacity ${fadeDuration}ms ease`;
      element.style.opacity = "0";

      setTimeout(() => {
        if (newPlaceholder) {
          element.placeholder = newPlaceholder;
        }
        element.style.opacity = "1";
      }, fadeDuration + blankDuration);
    };

    const applyButtonAnimation = (element) => {
      element.style.transition = `opacity ${fadeDuration}ms ease`;
      element.style.opacity = "0";

      setTimeout(() => {
        element.style.opacity = "1";
      }, fadeDuration + blankDuration);
    };

    applyPlaceholderAnimation(textarea, newPlaceholder);
    applyButtonAnimation(button);
  },
};

export const DelayEffectExtension = {
  name: "DelayEffect",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_delay" || trace.payload.name === "ext_delay",
  effect: async ({ trace }) => {
    const { delay } = trace.payload;

    await new Promise((resolve) => setTimeout(resolve, delay));

    window.voiceflow.chat.interact({ type: "complete" });
  },
};

export const ActivateAvatarExtension = {
  name: "ActivateAvatar",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_activateAvatar" ||
    trace.payload.name === "ext_activateAvatar",
  effect: ({ trace }) => {
    const { isActive } = trace.payload;

    const chatDiv = document.getElementById("voiceflow-chat");

    const shadowRoot = chatDiv?.shadowRoot;

    if (!shadowRoot) {
      return;
    }

    const styleTagId = "activate-avatar-style";
    let styleTag = shadowRoot.getElementById(styleTagId);

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleTagId;
      shadowRoot.appendChild(styleTag);
    }

    if (isActive) {
      styleTag.textContent = `
        .c-kIbiaN-iiTsXc-size-small.c-kIbiaN-ibnslvF-css {
          display: block !important;
        }
        .vfrc-typing-indicator {
          display: flex !important;  
          align-items: center !important; 
          justify-content: center !important;
        }
      `;
    } else {
      styleTag.textContent = `
        .c-kIbiaN-iiTsXc-size-small.c-kIbiaN-ibnslvF-css {
          display: none !important;
        }
        .vfrc-typing-indicator {
          display: none !important;
        }
      `;
    }
  },
};

export const LanguageDetectionExtension = {
  name: "BrowserData",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_language" || trace.payload.name === "ext_language",
  effect: async ({ trace }) => {
    const lang = navigator.language || navigator.userLanguage;

    window.voiceflow.chat.interact({
      type: "event",
      payload: {
        lang,
      },
    });
  },
};

// This extension shows a waiting animation with customizable text and delay
// Also checking for the vf_done value to stop/hide the animation if it's true
export const WaitingAnimationExtension = {
  name: "WaitingAnimation",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_waitingAnimation" ||
    trace.payload.name === "ext_waitingAnimation",
  render: async ({ trace, element }) => {
    window.vf_done = true;
    await new Promise((resolve) => setTimeout(resolve, 250));

    const text = trace.payload?.text || "Please wait...";
    const delay = trace.payload?.delay || 8000;

    const waitingContainer = document.createElement("div");
    waitingContainer.innerHTML = `
      <style>
        .vfrc-message--extension-WaitingAnimation {
          background-color: transparent !important;
          background: none !important;
        }
        .waiting-animation-container {
          font-family: Arial, sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #fffc;
          display: flex;
          align-items: center;
        }
        .waiting-text {
          display: inline-block;
          margin-left: -20px;
        }
        .waiting-letter {
          display: inline-block;
          animation: shine 1s linear infinite;
        }
        @keyframes shine {
          0%, 100% { color: #fffc; }
          50% { color: #000; }
        }
        }
      </style>
      <div class="waiting-animation-container">
        <div class="spinner"></div>
        <span class="waiting-text">${text
          .split("")
          .map((letter, index) =>
            letter === " "
              ? " "
              : `<span class="waiting-letter" style="animation-delay: ${
                  index * (1000 / text.length)
                }ms">${letter}</span>`
          )
          .join("")}</span>
      </div>
    `;

    element.appendChild(waitingContainer);

    // Send continue signal to Voiceflow
    window.voiceflow.chat.interact({
      type: "continue",
    });

    let intervalCleared = false;
    window.vf_done = false;

    const removeParentElement = () => {
      const chatDiv = document.getElementById("voiceflow-chat");
      const shadowRoot = chatDiv?.shadowRoot;

      // Find the parent container of the WaitingAnimation message
      const parentElement = shadowRoot?.querySelector(
        ".vfrc-system-response:has(.vfrc-message--extension-WaitingAnimation._1ddzqsn7)"
      );
      if (parentElement) {
        parentElement.remove(); // Completely remove the parent element
      }
    };

    const checkDoneInterval = setInterval(() => {
      if (window.vf_done) {
        clearInterval(checkDoneInterval);
        waitingContainer.style.display = "none";
        window.vf_done = false;

        // Remove the parent element when the animation finishes
        removeParentElement();
      }
    }, 100);

    setTimeout(() => {
      if (!intervalCleared) {
        clearInterval(checkDoneInterval);
        waitingContainer.style.display = "none";

        // Remove the parent element after the delay
        removeParentElement();
      }
    }, delay);
  },
};

// This extension triggers a "done" action,
// typically used to signal the completion of a task
// and hide a previous WaitingAnimation
export const DoneAnimationExtension = {
  name: "DoneAnimation",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_doneAnimation" ||
    trace.payload?.name === "ext_doneAnimation",
  run: async () => {
    // Add a 1-second delay before execution
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Continue the flow in Voiceflow
    window.voiceflow.chat.interact({
      type: "continue",
    });

    // Set vf_done to true
    window.vf_done = true;

    // Dynamically hide the WaitingAnimation message
    const chatDiv = document.getElementById("voiceflow-chat");
    const shadowRoot = chatDiv?.shadowRoot;

    const waitingMessage = shadowRoot?.querySelector(
      ".vfrc-message.vfrc-message--extension-WaitingAnimation._1ddzqsn7"
    );

    if (waitingMessage) {
      waitingMessage.style.display = "none";
    }

    // Optional additional delay
    await new Promise((resolve) => setTimeout(resolve, 250));
  },
};

export const FeedbackSpintsoExtension = {
  name: "Custom_Feedback",
  type: "response",
  match: ({ trace }) =>
    trace.type === "Custom_Feedback" ||
    trace.payload.name === "Custom_Feedback",
  render: ({ trace, element }) => {
    console.log(`Trace from FeedbackExtension: `, trace);

    // Helper function to determine language from URL
    const getLanguageFromURL = () => {
      const url = window.location.href;
      if (url.includes("/de/")) return "de";
      if (url.includes("/fr/")) return "fr";
      if (url.includes("/it/")) return "it";
      if (url.includes("/es/")) return "es";
      if (url.includes("/sv/")) return "sv";
      return "en";
    };

    const feedbackTexts = {
      en: "Please click how satisfied you are with your help via our virtual assistant.",
      de: "Bitte klicken Sie, wie zufrieden Sie mit der Hilfe über unseren virtuellen Assistenten sind.",
      fr: "Veuillez cliquer pour indiquer à quel point vous êtes satisfait de l'aide via notre assistant virtuel.",
      sv: "Var vänlig klicka på hur nöjd du är med hjälpen via vår virtuella assistent.",
      es: "Por favor, haga clic en qué tan satisfecho está con la ayuda a través de nuestro asistente virtual.",
      it: "Per favore, fai clic su quanto sei soddisfatto dell'aiuto tramite il nostro assistente virtuale.",
    };

    const language = getLanguageFromURL();

    const feedbackContainer = document.createElement("div");
    feedbackContainer.innerHTML = `
      <div style="margin: 0 auto;">
        <!-- Feedback Text -->
        <div style="text-align: left; font-size: 16px; font-weight: bold; margin-bottom: 10px;">
          ${feedbackTexts[language]}
        </div>
        <!-- Feedback Icons -->
        <div id="feedback-icons" style="display: flex; justify-content: flex-start; gap: 20px;">
          <!-- Green Happy Face -->
          <div class="card green-card" data-value="Green" style="width: 50px; height: 70px; background-color: #32CD32; cursor: pointer; border-radius: 5px; display: flex; align-items: center; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" fill="#32CD32" />
              <circle cx="8.5" cy="10" r="1.5" fill="black" />
              <circle cx="15.5" cy="10" r="1.5" fill="black" />
              <path d="M9 15c1.5 1 4 1 5.5 0" stroke="black" stroke-width="2" />
            </svg>
          </div>
          <!-- Yellow Neutral Face -->
          <div class="card yellow-card" data-value="Yellow" style="width: 50px; height: 70px; background-color: #FFD700; cursor: pointer; border-radius: 5px; display: flex; align-items: center; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" fill="#FFD700" />
              <circle cx="8.5" cy="10" r="1.5" fill="black" />
              <circle cx="15.5" cy="10" r="1.5" fill="black" />
              <path d="M8.5 15h7" stroke="black" stroke-width="2" />
            </svg>
          </div>
          <!-- Red Sad Face -->
          <div class="card red-card" data-value="Red" style="width: 50px; height: 70px; background-color: #FF4500; cursor: pointer; border-radius: 5px; display: flex; align-items: center; justify-content: center;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" fill="#FF4500" />
              <circle cx="8.5" cy="10" r="1.5" fill="black" />
              <circle cx="15.5" cy="10" r="1.5" fill="black" />
              <path d="M9 16c1.5 -1 4 -1 5.5 0" stroke="black" stroke-width="2" />
            </svg>
          </div>
        </div>
      </div>
    `;

    const feedbackIcons = feedbackContainer.querySelectorAll(".card");
    feedbackIcons.forEach((icon) => {
      icon.addEventListener("click", function () {
        const feedbackValue = this.getAttribute("data-value");
        console.log(`Clicked on ${feedbackValue} card`);
        window.voiceflow.chat.interact({
          type: "complete",
          payload: { feedback: feedbackValue },
        });
      });
    });

    element.appendChild(feedbackContainer);
  },
};

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
              tool_choice: { type: "file_search" }, 
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
            body: JSON.stringify({
              assistant_id: assistantId,
              stream: true
            }),
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
