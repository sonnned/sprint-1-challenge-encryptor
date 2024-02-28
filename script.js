const textArea = document.querySelector('.text-wrapper-2');
const showText = document.querySelector('.show-text');
const rightView = document.querySelector('.overlap-group');
const encryptButton = document.querySelector('.button-2');
const decryptButton = document.querySelector('.button-3');
const copyButton = document.querySelector('.button-1');

let text = '';

const CONVERSION = {
  'a': 'ai',
  'e': 'enter',
  'i': 'imes',
  'o': 'ober',
  'u': 'ufat',
}

function veirfyHasNoUpperCaseOrSpecialCharactersOrNumbers(text) {
  const regex = /^[a-z\s]+$/;
  return regex.test(text);
}

function convertText(text) {

  if (!veirfyHasNoUpperCaseOrSpecialCharactersOrNumbers(text)) {
    alert('Please enter only lowercase letters and spaces');
  }

  let convertedText = '';
  for (let i = 0; i < text.length; i++) {
    const letter = text[i].toLowerCase();
    const convertedLetter = CONVERSION[letter] || letter;
    convertedText += convertedLetter;
  }
  return convertedText;
}

function encryptedToText(text) {
  const keys = Object.keys(CONVERSION);
  const values = Object.values(CONVERSION);

  for (let i = 0; i < values.length; i++) {
    while (text.includes(values[i])) {
      text = text.replace(values[i], keys[i]);
    }
  }
  return text;
}

textArea.addEventListener('input', (event) => {
  text = event.target.value;

  if (!text.length) {
    showText.innerHTML = '';
    rightView.style.justifyContent = "center";
    const rightViewChildren = rightView.children;
    for (let i = 0; i < rightViewChildren.length; i++) {
      rightViewChildren[i].style.display = 'flex';
    }
  }    
});

encryptButton.addEventListener('click', () => {
  if (text.length) {
    showText.innerHTML = convertText(text);

    rightView.style.justifyContent = "flex-start";
    copyButton.style.display = 'flex';
    const rightViewChildren = rightView.children;
    for (let i = 0; i < rightViewChildren.length; i++) {
      if (rightViewChildren[i].className !== 'show-text' && rightViewChildren[i].className !== 'button-1' && rightViewChildren[i].className !== 'button-container') {
        rightViewChildren[i].style.display = 'none';
      }
    }
  }
});

decryptButton.addEventListener('click', () => {
  if (text.length) {
    showText.innerHTML = encryptedToText(text);

    rightView.style.justifyContent = "flex-start";
    copyButton.style.display = 'flex';
    const rightViewChildren = rightView.children;
    for (let i = 0; i < rightViewChildren.length; i++) {
      if (rightViewChildren[i].className !== 'show-text' && rightViewChildren[i].className !== 'button-1' && rightViewChildren[i].className !== 'button-container') {
        rightViewChildren[i].style.display = 'none';
      }
    }
  }
});


copyButton.addEventListener('click', () => {
  const textToCopy = showText.innerHTML;
  if (textToCopy) {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      })
      .catch(err => {
        console.error('Unable to copy text:', err);
      });
  }
});
