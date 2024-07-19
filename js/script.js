document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const encryptButton = document.getElementById('encrypt-button');
    const decryptButton = document.getElementById('decrypt-button');
    const copyButton = document.getElementById('copy-button');
    const placeholderImage = document.getElementById('placeholder-image');
    const noMessage = document.getElementById('no-message');
    const instructionMessage = document.getElementById('instruction-message');

    inputText.value = '';

    inputText.addEventListener('focus', () => {
        inputText.value = '';
    });

    function encryptSubstitution(text) {
        const substitutions = {
            'a': 'ai',
            'e': 'enter',
            'i': 'imes',
            'o': 'ober',
            'u': 'ufat'
        };

        let encryptedText = text;

        const sortedSubstitutions = Object.entries(substitutions).sort((a, b) => b[1].length - a[1].length);

        for (const [key, value] of sortedSubstitutions) {
            const regex = new RegExp(key, 'g');
            encryptedText = encryptedText.replace(regex, value);
        }

        return encryptedText;
    }

    function decryptSubstitution(text) {
        const substitutions = {
            'ai': 'a',
            'enter': 'e',
            'imes': 'i',
            'ober': 'o',
            'ufat': 'u'
        };

        let decryptedText = text;

        const sortedSubstitutions = Object.entries(substitutions).sort((a, b) => b[0].length - a[0].length);

        for (const [key, value] of sortedSubstitutions) {
            const regex = new RegExp(key, 'g');
            decryptedText = decryptedText.replace(regex, value);
        }

        return decryptedText;
    }

    function showOutput() {
        placeholderImage.style.display = 'none';
        noMessage.style.display = 'none';
        instructionMessage.style.display = 'none';
        outputText.style.display = 'block';
        copyButton.style.display = 'block';
    }

    encryptButton.addEventListener('click', () => {
        const text = inputText.value;
        const finalEncryptedText = encryptSubstitution(text);
        outputText.value = finalEncryptedText;
        showOutput();
    });

    decryptButton.addEventListener('click', () => {
        const text = inputText.value;
        const finalDecryptedText = decryptSubstitution(text);
        outputText.value = finalDecryptedText;
        showOutput();
    });

    copyButton.addEventListener('click', () => {
        const text = outputText.value;

        navigator.clipboard.writeText(text).then(() => {
            alert('Texto copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
        });
    });
});
