document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const encryptButton = document.getElementById('encrypt-button');
    const decryptButton = document.getElementById('decrypt-button');
    const copyButton = document.getElementById('copy-button');
    const placeholderImage = document.getElementById('placeholder-image');
    const noMessage = document.getElementById('no-message');
    const instructionMessage = document.getElementById('instruction-message');

    const ENCRYPT_SUBSTITUTIONS = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };

    const DECRYPT_SUBSTITUTIONS = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };

    function encryptSubstitution(text) {
        let encryptedText = text;

        for (const [key, value] of Object.entries(ENCRYPT_SUBSTITUTIONS)) {
            const regex = new RegExp(key, 'g');
            encryptedText = encryptedText.replace(regex, value);
        }

        return encryptedText;
    }

    function decryptSubstitution(text) {
        let decryptedText = text;

        const sortedKeys = Object.keys(DECRYPT_SUBSTITUTIONS).sort((a, b) => b.length - a.length);

        for (const key of sortedKeys) {
            const regex = new RegExp(key, 'g');
            decryptedText = decryptedText.replace(regex, DECRYPT_SUBSTITUTIONS[key]);
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

    function handleTextOperation(operation) {
        const text = inputText.value.trim();

        if (text === '') {
            alert('Por favor, insira um texto para criptografar ou descriptografar.');
            return;
        }

        const finalText = operation(text);
        outputText.value = finalText;
        showOutput();
    }

    encryptButton.addEventListener('click', () => {
        handleTextOperation(encryptSubstitution);
        encryptButton.style.color = '#fff';
    });

    decryptButton.addEventListener('click', () => {
        handleTextOperation(decryptSubstitution);
    });

    copyButton.addEventListener('click', () => {
        const text = outputText.value;

        navigator.clipboard.writeText(text).then(() => {
            copyButton.style.color = '#fff';
            alert('Texto copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
            alert('Erro ao copiar texto. Tente novamente.');
        });
    });
});
