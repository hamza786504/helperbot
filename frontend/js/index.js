document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const inputs = form.querySelectorAll('input');
    
    // Validation rules
    const validationRules = {
        f_name: /^[A-Za-z\s]+$/,
        l_name: /^[A-Za-z\s]+$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        company: /^.+$/,
        role: /^.+$/,
        tel: /^\d{10}$/, // Example pattern for phone numbers (10 digits)
        interest: /^.+$/
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
            field.classList.remove('border-2', 'border-danger');
        } else {
            field.classList.add('border-2', 'border-danger');
        }
    }

    function handleInput(event) {
        validateField(event.target);
    }

    // Attach keyup event listener to all input fields
    inputs.forEach(input => {
        input.addEventListener('keyup', handleInput);
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Validate all fields before submission
        let formIsValid = true;
        inputs.forEach(input => {
            validateField(input);
            if (input.classList.contains('border-danger')) {
                formIsValid = false;
            }
        });

        if (formIsValid) {
            const formData = new FormData(form);

            try {
                const response = await fetch('form-handler.php', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Form submitted successfully:', result);
                } else {
                    console.error('Form submission failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        } else {
            console.log('Form contains errors. Please correct them before submitting.');
        }
    });





    
    document.getElementById("openVideoPanel").addEventListener("click" , () => {
        document.getElementById("video_panel").classList.add('show');
    });

    document.getElementById("closeVideoPanel").addEventListener("click" , () => {
        document.getElementById("video_panel").classList.remove('show');
    });

    document.getElementById("openSidebar").addEventListener("click" , () => {
        document.getElementById("sidebar").classList.add('show');
    });

    document.getElementById("closeSidebar").addEventListener("click" , () => {
        document.getElementById("sidebar").classList.remove('show');
    });

    
});
