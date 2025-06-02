// Function to limit digits as user types
function limitDigits() {
    const numberInput = document.getElementById('mobileNumber');
    const countryCodeInput = document.getElementById('countryCode');

    // Clean inputs: remove all non-digit characters
    const cleanedNumber = numberInput.value.replace(/\D/g, '');
    const cleanedCountryCode = countryCodeInput.value.replace(/\D/g, '');

    // Calculate total digits
    const totalDigits = cleanedNumber.length + cleanedCountryCode.length;

    // If total digits exceed 15, truncate the mobile number input
    if (totalDigits > 15) {
        const excessDigits = totalDigits - 15;
        numberInput.value = cleanedNumber.substring(0, cleanedNumber.length - excessDigits);
    }
}

// Add event listener to mobile number input
document.getElementById('mobileNumber').addEventListener('input', limitDigits);
// Add event listener to country code input as well to adjust limit on number input
document.getElementById('countryCode').addEventListener('input', limitDigits);

function generateLink() {
    const numberInput = document.getElementById('mobileNumber');
    const waLinkElement = document.getElementById('waLink');
    const resultDiv = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');
    const countryCodeInput = document.getElementById('countryCode');

    // Basic validation: check if the input is not empty
    if (numberInput.value.trim() === "") {
        alert("Please enter a mobile number.");
        resultDiv.classList.add('hidden');
        copyButton.style.display = 'none'; // Ensure copy button is hidden
        return;
    }

    // Clean the input: remove all non-digit characters from the mobile number
    let cleanedNumber = numberInput.value.replace(/\D/g, '');

    // Get and format the country code
    let countryCode = countryCodeInput.value.trim();
    if (countryCode === "") {
        countryCode = "+91"; // Default to +91 if empty
    }
    // Ensure the country code starts with a '+' and get its digits
    const countryCodeDigits = countryCode.replace(/\D/g, '');
    if (!countryCode.startsWith('+')) {
        countryCode = '+' + countryCode;
    }

    // If the cleaned mobile number starts with the country code digits, remove them
    if (cleanedNumber.startsWith(countryCodeDigits)) {
        cleanedNumber = cleanedNumber.substring(countryCodeDigits.length);
    }

    // Combine country code and cleaned number
    const formattedNumber = countryCode + cleanedNumber;

    // Validation: Check if the total number of digits exceeds 15
    const totalDigits = cleanedNumber.length + countryCodeDigits.length;
    if (totalDigits > 15) {
        alert("The total number of digits (including country code) cannot exceed 15.");
        resultDiv.classList.add('hidden');
        copyButton.style.display = 'none'; // Ensure copy button is hidden
        return;
    }

    const waLink = `https://wa.me/${formattedNumber}`;

    waLinkElement.href = waLink;
    waLinkElement.textContent = waLink;

    // Show the result area and copy button
    resultDiv.classList.remove('hidden');
    copyButton.style.display = 'inline-block';
}

function copyLink() {
    const waLinkElement = document.getElementById('waLink');
    const textToCopy = waLinkElement.textContent;
    const toaster = document.getElementById('toaster');

    navigator.clipboard.writeText(textToCopy).then(() => {
        // Show the toaster
        toaster.textContent = "Link copied to clipboard!";
        toaster.className = "toaster show"; // Add the 'show' class

        // Hide the toaster after 3 seconds
        setTimeout(() => {
            toaster.className = toaster.className.replace("show", ""); // Remove the 'show' class
        }, 3000);

    }).catch(err => {
        console.error('Failed to copy link: ', err);
        // You might want to show a different message in the toaster for errors
        toaster.textContent = "Could not copy link.";
         toaster.className = "toaster show"; // Add the 'show' class

        // Hide the toaster after 3 seconds
        setTimeout(() => {
            toaster.className = toaster.className.replace("show", ""); // Remove the 'show' class
        }, 3000);
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered: ', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed: ', error);
            });
    });
} 