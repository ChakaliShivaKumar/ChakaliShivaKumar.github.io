document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedbackForm");
    const confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal1"));
    const confirmSubmitButton = document.getElementById("confirmSubmit");

    let formData = {};

    feedbackForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Collect form data
        formData = {
            fullName: document.getElementById("fullName").value.trim(),
            email: document.getElementById("email").value.trim(),
            mobile: document.getElementById("mobile").value.trim(),
            place: document.getElementById("place").value.trim(),
            transportationType: document.getElementById("transportationType").value,
            serviceType: document.getElementById("serviceType").value,
            feedback: document.getElementById("feedback").value.trim(),
        };

        // Validate mandatory fields
        if (!formData.fullName || !formData.email || !formData.place || !formData.transportationType || !formData.serviceType || !formData.feedback) {
            alert("Please fill all required fields.");
            return;
        }

        // Show confirmation modal
        confirmationModal.show();
    });

    confirmSubmitButton.addEventListener("click", async () => {
        try {
            confirmationModal.hide();

            // Mock API endpoint
            const response = await fetch("http://localhost:3001/send-feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Your feedback has been successfully submitted!");
                feedbackForm.reset();
            } else {
                alert("There was an issue submitting your feedback. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});
