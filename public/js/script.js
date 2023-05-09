const copyToClipBoard = () => {
  const inputResult = document.getElementById("result");
  const buttonCopy = document.getElementById("copy");
  inputResult.select();
  inputResult.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(inputResult.value);

  buttonCopy.style.backgroundColor = "green";
  buttonCopy.textContent = "Copied !";

  setTimeout(() => {
    buttonCopy.style.backgroundColor = "#272727";
    buttonCopy.textContent = "Copy!";
  }, 3000);
};
