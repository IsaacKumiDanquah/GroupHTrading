var username = null;
var password = null;
var emailresend = null;

// new user
var nRegCode = null;
var nFullname = null;
var nEmail = null;
var nMobile = null;
var nUsername = null;
var nPassword = null;
var nConfirm = null;

var localEmailCode = '1';
var userEmailCode = '0';

$(document).ready(function () {
  $('#aeMsuccessw').on('hidden.bs.modal', function () {
    openPageReplace('index.html');
  });

  $('#form').submit(function (e) {
    e.preventDefault();
    showSpin();


    showAEMsuccessw("FEEDBACK SUBMITTED SUCCESSFULLY!","THANK YOU FOR YOUR FEEDBACK")


  });

  // form2
  $('#form2').submit(function (e) {
    e.preventDefault();
    showSpin();

    getInput();

    // alert(emailresend)
    getLoginDetails();


  });
  $('#form3').submit(function (e) {
    e.preventDefault();
    showSpin();

    getInput();

    if (localEmailCode != userEmailCode) {
      getOTP();
      const c1 = (document.getElementById('container4').style.display =
        'block');
      const c2 = (document.getElementById('container3').style.display = 'none');
    } else {
      saveNewUser();
    }
  });

  $('#form4').submit(function (e) {
    e.preventDefault();
    showSpin();

    getInput();

    var emailCode = $('#emailCode').val();

    if (!aeEmpty(emailCode)) {
      userEmailCode = emailCode;
    }

    if (userEmailCode == localEmailCode) {
      showAEMsuccess('Email verified successfully.');
      const form1 = (document.getElementById('container3').style.display =
        'block');
      const form2 = (document.getElementById('container4').style.display =
        'none');
    } else {
      showAEMerror('Invalid Code');
    }
  });

  $('#username').keyup(function () {
    hideSpin();

    $('#error').css('display', 'none');

    $('#container').height('260');
  });

  $('#password').keyup(function () {
    hideSpin();

    $('#error').css('display', 'none');

    $('#container').height('260');
  });

  $('#btCarType').click(function () {
    const form1 = (document.getElementById('container1').style.display =
      'none');
    const form2 = (document.getElementById('container2').style.display =
      'block');
  });

  $('#btWasher').click(function () {
    const form1 = (document.getElementById('container1').style.display =
      'none');
    const form2 = (document.getElementById('container3').style.display =
      'block');
  });

  $('#lblogin').click(function () {
    const form1 = (document.getElementById('container1').style.display =
      'block');
    const form2 = (document.getElementById('container2').style.display =
      'none');
  });

  $('#lblogin2').click(function () {
    const form1 = (document.getElementById('container1').style.display =
      'block');
    const form2 = (document.getElementById('container2').style.display =
      'none');
  });

  $('#lblogin3').click(function () {
    const form1 = (document.getElementById('container1').style.display =
      'block');
    const form2 = (document.getElementById('container3').style.display =
      'none');
  });

  $('#lblogin4').click(function () {
    const form1 = (document.getElementById('container3').style.display =
      'block');
    const form2 = (document.getElementById('container4').style.display =
      'none');
  });

  $('#lbnewuser').click(function () {
    const form1 = (document.getElementById('container3').style.display =
      'block');
    const form2 = (document.getElementById('container1').style.display =
      'none');
  });

  $('#lbforgot').click(function () {
    const form1 = (document.getElementById('container2').style.display =
      'block');
    const form2 = (document.getElementById('container1').style.display =
      'none');
  });
});

function myAjax1() {
  $.ajax({
    type: 'post',
    data: {
      id: id,
    },
    cache: false,
    url: '',
    dataType: 'text',
    success: function (data, status) {
      //alert(data);
    },
    error: function (xhr, status, error) {
      // alert(error);
    },
  });
}
function sendOTP() {
  $("#useremail").text(nEmail)
  return
  $.ajax({
    type: 'post',
    data: {
      code: localEmailCode,
      receiver: nEmail,
    },
    cache: false,
    url: 'sendEmailOTP.php',
    dataType: 'text',
    success: function (data, status) {
     
      $("#useremail").text(nEmail)
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
}

function getOTP() {
sendOTP();
  return


  $.ajax({
    type: 'post',
    cache: false,
    url: 'indexC32.php',
    dataType: 'text',
    success: function (data, status) {
      localEmailCode = data;
      sendOTP();
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
}

function saveNewUser() {
  showSpin();

  if (nPassword != nConfirm) {
    //alert(1)
    showAEMerror(
      'CONFRIM PASSWORD DO NOT MATCH WITH PASSWORD',
      'PASSWORD MISMATCH'
    );
    return;
  }



  showAEMsuccessw();

  return

  $.ajax({
    type: 'post',
    data: {
      nRegCode: nRegCode,
      nFullname: nFullname,
      nEmail: nEmail,
      nMobile: nMobile,
      nUsername: nUsername,
      nPassword: nPassword,
    },
    cache: false,
    url: 'indexC3.php',
    dataType: 'text',
    success: function (data, status) {
      // alert(data)


      hideSpin();
      if (data == 1) {
       
      } else if (data == 3) {
        $('#nUsername').val('');
        showAEMerror(
          'Please use a different username',
          'username already taken'
        );
        return;
      } else if (data == 4) {
        $('#nRegCode').val('');
        showAEMerror(
          'PLEASE YOUR REGISTRATION CODE IS NOT VALID.',
          'INVALID REGISTRATION CODE'
        );
        return;
      }
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
}
function sendPassword(username, password) {
  showSpin();
  hideSpin();
  showAEMsuccess('Password recovery sent successfully!');

  return


  $.ajax({
    type: 'post',
    data: {
      receiver: emailresend,
      username: username,
      password: password,
    },
    cache: false,
    url: 'sendEmaiLPassword.php',
    dataType: 'text',
    success: function (data, status) {
      hideSpin();
      showAEMsuccess('Password recovery sent successfully!');
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
}

function getLoginDetails() {


  sendPassword(username, password);

  return

  $.ajax({
    type: 'post',
    data: {
      email: emailresend,
    },
    cache: false,
    url: 'indexC2.php',
    dataType: 'text',
    success: function (data, status) {
      if (!aeEmpty(data)) {
        var output = data.split('|');
        var username = output[0];
        var password = output[1];
        // alert(username);
        //  alert(password)

       
      }
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
}

function getuser() {
  openPageReplace('viewItems.html');
  return 
  $.ajax({
    type: 'post',
    data: {
      username: username,
      password: password,
    },
    cache: false,
    url: 'index__.php',
    dataType: 'text',
    success: function (data, status) {
      hideSpin();

      if (data == 900) {
        openPageReplace('adminPage.php');
        return;
      }
      if (data == 1) {
        openPageReplace('userPage.php');
        return;
      } else {
        showAEMerror(
          'Invalid login attempt try again',
          'Invalid login attempt'
        );
      }
    },
    error: function (xhr, status, error) {
      alert(error);

      $('#error').css('display', 'block');

      $('#container').height('22rem');
    },
  });
}

function getInput() {
  username = $('#username').val();
  emailresend = $('#emailresend').val();
  password = $('#password').val();
  username = trimV(username);
  password = trimV(password);
  emailresend = trimV(emailresend);

  // new user
  nRegCode = $('#nRegCode').val();
  nFullname = $('#nFullname').val();
  nEmail = $('#nEmail').val();
  nMobile = $('#nMobile').val();
  nUsername = $('#nUsername').val();
  nPassword = $('#nPassword').val();
  nConfirm = $('#nConfirm').val();

  nRegCode = trimV(nRegCode);
  nFullname = trimV(nFullname);
  nEmail = trimV(nEmail);
  nMobile = trimV(nMobile);
  nUsername = trimV(nUsername);
  nPassword = trimV(nPassword);
  nConfirm = trimV(nConfirm);
  n1 = nFullname.toUpperCase();
  nFullname = n1;

  //
}

function validate_mobile_g(mobile) {
  var phoneRe = /^[0-9]{10}$/;
  var digits = mobile.replace(/\D/g, '');
  return phoneRe.test(digits);
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function aeEmpty(e) {
  var ee = '';
  try {
    ee = e.trim();
  } catch (error) {
    return true;
  }
  try {
    switch (e) {
      case '':
      case 0:
      case '0':
      case null:
      case false:
      case undefined:
        return true;
      default:
        return false;
    }
  } catch (error) {
    return true;
  }
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function showErrorText(message) {
  $('#error_message').text(message);
  $('#error_message').show();
}

function hideErrorText() {
  $('#error_message').text('');
  $('#error_message').hide();
}

function showSpin() {
  document.getElementById('spin').style.visibility = 'visible';
}
function hideSpin() {
  document.getElementById('spin').style.visibility = 'hidden';
}

function openPage_blank(url) {
  window.open(url, '_blank');
}
function openPage(url) {
  window.open(url);
}

function showAEMsuccess(aeBody, aeTitle) {
  if (!aeEmpty(aeTitle)) {
    $('#aeAlertTitle').text(aeTitle);
  }

  if (!aeEmpty(aeBody)) {
    $('#aeAlertBody').text(aeBody);
  }
  $('#aeMsuccess').modal('show');
}

function showAEMsuccessw(aeBody, aeTitle) {
  if (!aeEmpty(aeTitle)) {
    $('#aeAlertTitlew').text(aeTitle);
  }

  if (!aeEmpty(aeBody)) {
    $('#aeAlertBodyw').text(aeBody);
  }
  $('#aeMsuccessw').modal('show');
}

function showAEMerror(aeBody, aeTitle) {
  if (!aeEmpty(aeTitle)) {
    $('#aeMerrorTitle').text(aeTitle);
  }

  if (!aeEmpty(aeBody)) {
    $('#aeMerrorBody').text(aeBody);
  }
  $('#aeMerror').modal('show');
}

function showMYesNo(aeBody) {
  if (!aeEmpty(aeBody)) {
    $('#aeMBody').text(aeBody);
  }
  $('#aeMyesNo').modal('show');
}

function passwordConfirm(a, b) {
  return a == b;
}

function trimV(a) {
  try {
    a = a.trim();
  } catch (error) {}
  return a;
}

function refreshPage() {
  location.reload();
}

function showCodeField() {
  $('#codeHide').show();
}
function hideCodeField() {
  $('#codeHide').hide();
}

function validateGhanaCard(ghanaCard) {
  if (aeEmpty(ghanaCard)) {
    return false;
  }
  ghanaCard = ghanaCard.toUpperCase();
  var i = ghanaCard.length;

  if (i < 8) {
    return false;
  }

  if (i > 20) {
    return false;
  }

  ii = ghanaCard.substring(0, 4);

  if (!passwordConfirm(ii, 'GHA-')) {
    return false;
  }

  return true;
}

function openPageReplace(url) {
  location.href = url;
}

function validatePassword(password) {
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  var m =
    'must be at least 8 characters long ' +
    ' and contains at least one lowercase letter, one ' +
    'uppercase letter, one number, and one special character';

  return passwordRegex.test(password);
}

function checkImageFileSize(id) {
  var file = document.getElementById(id).files[0];
  if (file.size > 1258291) {
    showAEMerror('FILE TOO LARGE');

    return false;
  }
  if (!file.type.startsWith('image/')) {
    showAEMerror('CHOOSE IMAGE FILE ONLY');
    return false;
  }
  return true;
}

function changeImageSRC(fileID, imageTagID) {
  var file = document.getElementById(fileID).files[0];
  document.getElementById(imageTagID).src = URL.createObjectURL(file);
}

function isFilePDF(fileId) {
  var input = document.getElementById(fileId);
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var size = file.size / 1024 / 1024; // size in MB
    var type = file.type;

    if (type !== 'application/pdf') {
      aeModelTitle = 'CHOOSE PDF ONLY';
      aeModelBody = 'ONLY PDF FILES ARE ALLOWED';

      $('#aeMBody').text(aeModelBody);
      $('#aeMTitle').text(aeModelTitle);
      $('#aeModelPassive').modal('show');

      document.getElementById(fileId).value = '';
      return false;
      return false;
    } else if (size > 2) {
      aeModelTitle = 'PICTURE SIZE TOO LARGE';
      aeModelBody =
        'Your picture size is too large.' +
        'we can only accept pictures that are not more than 2mb';

      $('#aeMBody').text(aeModelBody);
      $('#aeMTitle').text(aeModelTitle);
      $('#aeModelPassive').modal('show');
      document.getElementById(fileId).value = '';

      return false;
      return false;
    } else {
      return true;
    }
  }
}

function isFileImage(fileId) {
  var input = document.getElementById(fileId);
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var size = file.size / 1024 / 1024; // size in MB
    var type = file.type;
    if (!type.startsWith('image')) {
      aeModelTitle = 'ONLY IMAGE FILE ALLOWED';
      aeModelBody = 'Please Choose Image File';
      $('#aeMBody').text(aeModelBody);
      $('#aeMTitle').text(aeModelTitle);
      $('#aeModelPassive').modal('show');
      document.getElementById(fileId).value = '';

      return false;
    } else if (size > 2) {
      aeModelTitle = 'FILE TOO LARGE';
      aeModelBody = 'Please Your file is too large';
      $('#aeMBody').text(aeModelBody);
      $('#aeMTitle').text(aeModelTitle);
      $('#aeModelPassive').modal('show');
      document.getElementById(fileId).value = '';
      return false;
    } else {
      return true;
    }
  }
}
$('#exitIcon').click(function () {
  openPageReplace('index.html');
});