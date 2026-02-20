const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
let filesArray = [];
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("hover");
});
dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("hover");
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("hover");
  const files = Array.from(e.dataTransfer.files);
  addFiles(files);
});
dropArea.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => addFiles(Array.from(fileInput.files)));
function addFiles(files) {
  files.forEach(file => {
    if(!filesArray.some(f => f.name === file.name && f.size === file.size)){
      filesArray.push(file);
    }
  });
  renderFiles();
}
function renderFiles() {
  fileList.innerHTML = "";
  filesArray.forEach((file, index) => {
    const fileItem = document.createElement("div");
    fileItem.className = "file-item";
    fileItem.innerHTML = `
      <span>${file.name} (${(file.size/1024).toFixed(2)} KB)</span>
      <button onclick="removeFile(${index})">Remove</button>
    `;
    fileList.appendChild(fileItem);
  });
}
function removeFile(index) {
  filesArray.splice(index, 1);
  renderFiles();
}
