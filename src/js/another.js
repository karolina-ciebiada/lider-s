import '../scss/main.scss';
console.log("hello");

const ham = document.querySelector('.ham--js');

ham.addEventListener('click', () => {
    const nav = document.querySelector('.navigation--js');
    nav.classList.toggle('navigation--open');
});
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  if(!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
  }
});

const item = document.querySelector('.catalog__list-item--js');
const itemOne = document.querySelector('.catalog__list-item1--js');
const itemTwo = document.querySelector('.catalog__list-item2--js');
const itemThree = document.querySelector('.catalog__list-item3--js');
const itemFour = document.querySelector('.catalog__list-item4--js');

const info = document.querySelector('.catalog__info--js');
const infoOne = document.querySelector('.catalog__info--js1');
const infoTwo = document.querySelector('.catalog__info--js2');
const infoThree = document.querySelector('.catalog__info--js3');
const infoFour = document.querySelector('.catalog__info--js4');

const other = document.querySelector('.catalog__info');
const other1 = document.querySelector('.catalog__info1')
const other2 = document.querySelector('.catalog__info2')
const other3 = document.querySelector('.catalog__info3')
const other4 = document.querySelector('.catalog__info4')

item.addEventListener('click', () => {
    info.classList.toggle('catalog__info--open');
    other1.classList.remove('catalog__info--open');
    other2.classList.remove('catalog__info--open');
    other3.classList.remove('catalog__info--open');
    other4.classList.remove('catalog__info--open');
});



itemOne.addEventListener('click', () => {
    infoOne.classList.toggle('catalog__info--open');
    other.classList.remove('catalog__info--open');
    other2.classList.remove('catalog__info--open');
    other3.classList.remove('catalog__info--open');
    other4.classList.remove('catalog__info--open');
});



itemTwo.addEventListener('click', () => {
    infoTwo.classList.toggle('catalog__info--open');
    other1.classList.remove('catalog__info--open');
    other.classList.remove('catalog__info--open');
    other3.classList.remove('catalog__info--open');
    other4.classList.remove('catalog__info--open');
});

itemThree.addEventListener('click', () => {
  infoThree.classList.toggle('catalog__info--open');
  other1.classList.remove('catalog__info--open');
  other.classList.remove('catalog__info--open');
  other2.classList.remove('catalog__info--open');
  other4.classList.remove('catalog__info--open');
});

itemFour.addEventListener('click', () => {
  infoFour.classList.toggle('catalog__info--open');
  other1.classList.remove('catalog__info--open');
  other.classList.remove('catalog__info--open');
  other2.classList.remove('catalog__info--open');
  other3.classList.remove('catalog__info--open');
});



(function() {
  function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function validateHuman(honeypot) {
    if (honeypot) {  //if hidden form filled up
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }

  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;

    var fields = Object.keys(elements).filter(function(k) {
          return (elements[k].name !== "honeypot");
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      
      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    console.log(formData);
    return formData;
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var data = getFormData(form);         // get the values submitted in the form

    /* OPTION: Remove this comment to enable SPAM prevention, see README.md
    if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
      return false;
    }
    */

    if( data.email && !validEmail(data.email) ) {   // if email is not valid show error
      var invalidEmail = form.querySelector(".email-invalid");
      if (invalidEmail) {
        invalidEmail.style.display = "block";
        return false;
      }
    } else {
      disableAllButtons(form);
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          console.log(xhr.status, xhr.statusText);
          console.log(xhr.responseText);
          var formElements = form.querySelector(".form-elements")
          if (formElements) {
            formElements.style.display = "none"; // hide form
          }
          var formElementss = form.querySelector(".form-elementss")
          if (formElementss) {
            formElementss.style.display = "none"; // hide form
          }
          var thankYouMessage = form.querySelector(".thankyou_message");
          if (thankYouMessage) {
            thankYouMessage.style.display = "block";
          }
          return;
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
    }
  }
  
  function loaded() {
    console.log("Contact form submission handler loaded successfully.");
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();
