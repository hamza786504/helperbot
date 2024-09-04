document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm");
  const inputs = form.querySelectorAll("input");

  // Validation rules
  const validationRules = {
    f_name: /^[A-Za-z\s]+$/,
    l_name: /^[A-Za-z\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    company: /^.+$/,
    role: /^.+$/,
    tel: /^\d{10}$/, // Example pattern for phone numbers (10 digits)
    interest: /^.+$/,
  };

  function validateField(field) {
    const id = field.id;
    const value = field.value.trim();
    const pattern = validationRules[id];
    let isValid = true;

    if (pattern) {
      isValid = pattern.test(value);
    }

    if (isValid) {
      field.classList.remove("border-2", "border-danger");
    } else {
      field.classList.add("border-2", "border-danger");
    }
  }

  function handleInput(event) {
    validateField(event.target);
  }

  // Attach keyup event listener to all input fields
  inputs.forEach((input) => {
    input.addEventListener("keyup", handleInput);
  });

  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Function to get values by input ID
    function getFieldValue(id) {
      return document.getElementById(id)?.value.trim() || "";
    }

    // Function to validate fields and update UI
    function validateField(id, value) {
      const field = document.getElementById(id);
      let isValid = true;

      switch (id) {
        case "f_name":
        case "l_name":
          isValid = /^[A-Za-z\s]+$/.test(value);
          break;
        case "email":
          isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          break;
        case "tel":
          isValid = /^\d{10}$/.test(value); // Example pattern for phone numbers (10 digits)
          break;
        default:
          isValid = value.length > 0;
          break;
      }

      if (isValid) {
        field.classList.remove("border-2", "border-danger");
      } else {
        field.classList.add("border-2", "border-danger");
      }

      return isValid;
    }

    // Collect values from the form and validate
    const data = {
      f_name: getFieldValue("f_name"),
      l_name: getFieldValue("l_name"),
      email: getFieldValue("email"),
      company: getFieldValue("company"),
      role: getFieldValue("role"),
      tel: getFieldValue("tel"),
      interest: getFieldValue("interest"),
    };

    // Validate all fields before submission
    let formIsValid = true;
    for (const key in data) {
      const fieldId = key;
      const fieldValue = data[key];
      if (!validateField(fieldId, fieldValue)) {
        formIsValid = false;
      }
    }

    if (formIsValid) {
      // Disable the submit button
      submitButton.setAttribute("disabled", true);
      submitButton.textContent = "Submitting...";

      try {
        const response = await fetch("./backend/sendEmail.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message); // Show alert with the success message
          form.reset(); // Reset the form fields
        } else {
          console.error("Form submission failed:", response.statusText);
          alert("There was an issue with the form submission.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      } finally {
        // Re-enable the submit button and reset its text
        submitButton.removeAttribute("disabled");
        submitButton.textContent = "Submit";
      }
    } else {
      console.log(
        "Form contains errors. Please correct them before submitting."
      );
    }
  });

  document.getElementById("openVideoPanel").addEventListener("click", () => {
    document.getElementById("video_panel").classList.add("show");
  });

  document.getElementById("closeVideoPanel").addEventListener("click", () => {
    document.getElementById("video_panel").classList.remove("show");
  });

  document.getElementById("openSidebar").addEventListener("click", () => {
    document.getElementById("sidebar").classList.add("show");
  });

  document.getElementById("closeSidebar").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("show");
  });
});
