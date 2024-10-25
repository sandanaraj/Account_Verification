let generatedOtp;

function generateOtp() {
  const accountNumber = document.getElementById('accountNumber').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent='';
  if (!accountNumber && !phoneNumber) {
    alert('Please enter either an account number or a phone number.');
    return;
  }

  if (accountNumber && (!/^\d{15}$/.test(accountNumber))) {
    errorMessage.textContent = 'Account number must be 15 digits of Number(0-9)';
    return;
  }

  else if (phoneNumber && (!/^\d{10}$/.test(phoneNumber))) {
    errorMessage.textContent = 'Phone number must be 10 digits of Number(0-9)';
    return;
  }

  generatedOtp = Math.floor(1000 + Math.random() * 9000);
  document.getElementById('otpDisplay').textContent = `OTP: ${generatedOtp}`;


  localStorage.setItem('generatedOtp', generatedOtp);
  document.getElementById('otpPopup').style.display = 'block';
}

function copyOtp() {
  navigator.clipboard.writeText(generatedOtp).then(() => {
    alert("OTP copied to clipboard!");
    window.location.href = "verify.html"; 
  }).catch((error) => {
    console.error("Failed to copy OTP:", error);
  });
}
function copyOtpv() {
  navigator.clipboard.writeText(generatedOtp).then(() => {
    document.getElementById('otpPopup').style.display = 'none';

  }).catch((error) => {
    console.error("Failed to copy OTP:", error);
  });
}

function verifyOtp() {
    const enteredOtp = document.getElementById('otpInput').value.trim();
    let g=localStorage.getItem("generatedOtp");
    if (enteredOtp === g) {
      alert("OTP verified successfully!");
      localStorage.removeItem('generatedOtp');
      window.location.href="voice.html";
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  }

  function regenerateOtp()
  {
    generatedOtp = Math.floor(1000 + Math.random() * 9000);
  document.getElementById('otpDisplay').textContent = `OTP: ${generatedOtp}`;

  localStorage.setItem('generatedOtp', generatedOtp);
  document.getElementById('otpPopup').style.display = 'block';
  }


function resendOtp() {
    regenerateOtp(); // Generate a new OTP and update the popup
    const resendBtn = document.getElementById('resend-btn');
  const timerText = document.getElementById('timer');
  let countdown = 30;

  resendBtn.disabled = true;
  timerText.textContent = `Please wait ${countdown} seconds to resend`;

  countdownInterval = setInterval(() => {
    countdown--;
    timerText.textContent = `Please wait ${countdown} seconds to resend`;

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      resendBtn.disabled = false;
      timerText.textContent = ''; 
    }
  }, 1000);
  }