var inputIndex = 1;

addTranscriptInput = () => {
    const transcriptDiv = document.createElement("div");
    transcriptDiv.id = `transcript-div-${inputIndex}`;
    transcriptDiv.className = "input-group mb-3";

    const transcriptPrepend = document.createElement("div");
    transcriptPrepend.className = "input-group-prepend";
    transcriptPrepend.innerHTML = "<span class=\"input-group-text\" id=\"inputGroup-sizing-default\">Transcript URL:</span>";
    transcriptDiv.appendChild(transcriptPrepend);

    const transcriptInput = document.createElement("input");
    transcriptInput.type = "text";
    transcriptInput.id = `transcript-input-${inputIndex}`;
    transcriptInput.className = "form-control";
    transcriptDiv.appendChild(transcriptInput);

    const transcriptTypeSelect = document.createElement("select");
    transcriptTypeSelect.id = `transcript-type-select-${inputIndex}`;
    transcriptTypeSelect.className = "form-control";
    const rttmOption = document.createElement("option");
    rttmOption.value = "rttm";
    rttmOption.innerText = "RTTM";
    const jsonOption = document.createElement("option");
    jsonOption.value = "json";
    jsonOption.innerText = "JSON";
    transcriptTypeSelect.appendChild(rttmOption);
    transcriptTypeSelect.appendChild(jsonOption);
    
    const transcriptAppend = document.createElement("div");
    transcriptAppend.className = "input-group-append";
    transcriptAppend.appendChild(transcriptTypeSelect);
    transcriptDiv.appendChild(transcriptAppend);

    document.querySelector("#transcript-inputs").appendChild(transcriptDiv);
    inputIndex++;
}

generateURL = () => {
    const baseURL = document.querySelector("#input-base-url").value;
    const audioURL = document.querySelector("#input-audio-url").value;
    const transcriptURLs = [];
    for (let i = 0; i < inputIndex; i++) {
      transcriptURLs.push(document.querySelector(`#transcript-input-${i}`).value);
    }
  
    let url = new String(baseURL);
    url += "/?save_mode=server";
    url += `&audio=${audioURL}`;

    const rttmList = [];
    const jsonList = [];
    // Check transcript type
    for (let i = 0; i < transcriptURLs.length; i++) {
      const transcriptType = document.querySelector(`#transcript-type-select-${i}`).value;
      if (transcriptType === "rttm") {
        rttmList.push(transcriptURLs[i]);
      } else if (transcriptType === "json") {
        jsonList.push(transcriptURLs[i]);
      }
    }

    for (let i = 0; i < rttmList.length; i++) {
      if (i === 0) {
        url += `&rttm=${rttmList[i]}`;
      } else {
        url += `;${rttmList[i]}`;
      }
    }

    for (let i = 0; i < jsonList.length; i++) {
      if (i === 0) {
        url += `&json=${jsonList[i]}`;
      } else {
        url += `;${jsonList[i]}`;
      }
    }

    console.log(url);
  
    document.querySelector("#output-url").value = url;
}