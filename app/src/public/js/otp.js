const send = document.querySelector('.sendBtn');
const confirm = document.querySelector('.confirmBtn');
const phone = document.getElementById('phone-number');
const phoneContainer = document.querySelector('.phoneSec');
const otpContainer = document.querySelector('.otpSec');
const otpInput = document.querySelectorAll('.otp-input .input');
const boxVerify = document.querySelector('.box-verify');
const expireText = document.querySelector('.expire');

// OTP
let expire;
let OTP;
let countdown;
let phoneNum = '';

send.addEventListener('click', () => {

    // 기본 expire
    resetStateOTP();

    // 핸드폰 11자리
    const phoneNumberExist = phone.value
        .match(/^\d{11}$/g);

    if (phoneNumberExist) {
        phoneContainer.classList.add('pass');
        otpContainer.classList.remove('pass');

        // 문구 초기화
        alertText('.phoneSec .text-danger', '');

        document.querySelector('.phone').textContent = formatPhoneNumber(phoneNumberExist);

        OTP = randomOTP();

        formatOTP();

        handleCountDonw();

        alert(`OTP : ${OTP}`);

    } else {
        alertText('.phoneSec .text-danger', '-를 제외한 번호를 입력해주세요.');
    }
});

// OTP 부분
otpInput.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        const element = e.target;

        if (element.value.match(/\d/)) {
            phoneNum += element.value;
            alertText('.otpSec .text-danger', '');

            if (element.nextElementSibling) {
                element.nextElementSibling.focus();
            }
        } else {
            alertText('.otpSec .text-danger', '올바른 숫자를 입력해주세요.')
        }
    });
});

confirm.addEventListener('click', () => {
    const icon = boxVerify.querySelector('.fa-solid');
    otpContainer.classList.add('pass');
    boxVerify.classList.add('active');

    if (OTP === phoneNum) {
        icon.classList.remove('fa-circle-xmark');
        icon.classList.add('fa-circle-check');
        boxVerify.querySelector('p').innerHTML = `인증에 성공했습니다. <br>`;

        setTimeout("locateRegister()", 1000);

    } else {
        icon.classList.add('fa-circle-xmark');
        boxVerify.querySelector('p').innerHTML = `인증에 실패했습니다. <br>
        <span class='returnBtn'>다시 시도하기</span>`;
    }
});

// 다시 시도
boxVerify.addEventListener('click', (e) => {
    const element = e.target;

    if (element.classList.contains('returnBtn')) {
        otpContainer.classList.remove('pass');
        boxVerify.classList.remove('active');

        activeStateOTP();

        formatOTP();
    }

});

function handleCountDonw() {
    countdown = setInterval(() => {
        expire--;
        if (expire === 0) {
            clearInterval(countdown)
            OTP = null;
            console.log(OTP);
        }
        expireText.textContent = expire < 10 ? '0' + expire + '초' : expire + '초';
    }, 1000);
}

function alertText(element, text) {
    document.querySelector(`${element}`).textContent = text;
}

function randomOTP() {
    let random = '';
    Array.from({ length: 6 }, () => {
        random += Math.floor(Math.random() * 10).toString();
    });
    return random;
}

function resetStateOTP() {
    clearInterval(countdown);
    expire = 30;
    OTP = null;
    phoneNum = '';

    otpInput.forEach(input => {
        input.value = '';
    });
}

function formatOTP() {
    return document.querySelector('.otp-text').textContent = OTP;
}

function formatPhoneNumber(number) {
    return number.toString().slice(0, 7) + '***';
}

function activeStateOTP() {
    resetStateOTP();

    OTP = randomOTP();

    handleCountDonw();

    alert(`OTP : ${OTP}`);
}

function locateRegister() {
    location.replace("/");
}