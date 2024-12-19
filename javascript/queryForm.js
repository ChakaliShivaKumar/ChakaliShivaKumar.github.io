document.addEventListener("DOMContentLoaded", () => {
    const queryForm = document.getElementById("queryForm");
    const confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal1"));
    const confirmSubmitButton = document.getElementById("confirmSubmit");

    let formData = {};

    queryForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Collect form data
        formData = {
            fullName: document.getElementById("fullName").value.trim(),
            email: document.getElementById("email").value.trim(),
            mobile: document.getElementById("mobile").value.trim(),
            place: document.getElementById("place").value.trim(),
            transportationType: document.getElementById("transportationType").value,
            serviceType: document.getElementById("serviceType").value,
            query: document.getElementById("query").value.trim(),
        };

        // Validate mandatory fields
        if (!formData.fullName || !formData.email || !formData.place || !formData.transportationType || !formData.serviceType || !formData.query) {
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
            const response = await fetch("https://lezit-query.onrender.com/send-query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Your query has been successfully submitted!");
                queryForm.reset();
            } else {
                alert("There was an issue submitting your query. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting query:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});
