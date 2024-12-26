addTranscriptInput = () => {
    const transcriptLabel = document.createElement("label");
    transcriptLabel.innerText = "Transcript URL: ";
    const transcriptInput = document.createElement("input");
    transcriptInput.type = "text";
    transcriptLabel.appendChild(transcriptInput);
    document.querySelector("#transcript-inputs").appendChild(transcriptLabel);
}

generateURL = () => {
    const baseURL = document.querySelector("#input-base-url").value;
    const audioURL = document.querySelector("#input-audio-url").value;
    const transcriptURLs = Array.from(document.querySelectorAll("#transcript-inputs input")).map(input => input.value);
  
    let url = new String(baseURL);
    url += "/?save_mode=server";
    url += `&audio=${audioURL}`;
    // Check transcript type
    const transcriptType = document.querySelector("#transcript-type-select").value;
    for (let i = 0; i < transcriptURLs.length; i++) {
      url += `&${transcriptType}=${transcriptURLs[i]}`;
    }

    console.log(url);
  
    document.querySelector("#output-url").value = url;
}