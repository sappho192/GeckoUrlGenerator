var inputIndex = 1;

addTranscriptInput = () => {
    const transcriptDiv = document.createElement("div");
    transcriptDiv.id = `transcript-div-${inputIndex}`;

    const transcriptLabel = document.createElement("label");
    transcriptLabel.innerText = "Transcript URL: ";
    const transcriptInput = document.createElement("input");
    transcriptInput.type = "text";
    transcriptInput.id = `transcript-input-${inputIndex}`;
    transcriptLabel.appendChild(transcriptInput);
    transcriptDiv.appendChild(transcriptLabel);

    const transcriptTypeSelect = document.createElement("select");
    transcriptTypeSelect.id = `transcript-type-select-${inputIndex}`;
    const rttmOption = document.createElement("option");
    rttmOption.value = "rttm";
    rttmOption.innerText = "RTTM";
    const jsonOption = document.createElement("option");
    jsonOption.value = "json";
    jsonOption.innerText = "JSON";
    transcriptTypeSelect.appendChild(rttmOption);
    transcriptTypeSelect.appendChild(jsonOption);
    transcriptDiv.appendChild(transcriptTypeSelect);

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
    // Check transcript type
    for (let i = 0; i < transcriptURLs.length; i++) {
      const transcriptType = document.querySelector(`#transcript-type-select-${i}`).value;
      url += `&${transcriptType}=${transcriptURLs[i]}`;
    }

    console.log(url);
  
    document.querySelector("#output-url").value = url;
}