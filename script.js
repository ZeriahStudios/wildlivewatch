async function loadCams() {
  const url = "https://raw.githubusercontent.com/ZeriahStudios/wildlivewatch/main/Website%20URL.csv";
  const response = await fetch(url);
  const text = await response.text();

  const [headerLine, ...lines] = text.trim().split("\n");
  const headers = headerLine.split(",");

  const data = lines
    .filter(line => line.trim()) // skip empty lines
    .map(line => {
      const values = line.split(",");
      return headers.reduce((obj, header, i) => {
        obj[header.trim()] = values[i]?.trim();
        return obj;
      }, {});
    });

  return data;
}

loadCams().then(cams => {
  const container = document.getElementById("cam-container");

  cams.forEach(cam => {
    const wrapper = document.createElement("div");
    wrapper.className = "cam-block";

    const label = document.createElement("h3");
    label.textContent = cam.Name;

    const iframe = document.createElement("iframe");
    iframe.src = cam.URL;
    iframe.width = "480";
    iframe.height = "270";
    iframe.allowFullscreen = true;

    wrapper.appendChild(label);
    wrapper.appendChild(iframe);
    container.appendChild(wrapper);
  });
});
