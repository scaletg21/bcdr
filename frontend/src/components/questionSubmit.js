   async function handleSumbitNo(e) {
        e.preventDefault()
        try {
            let response = await createAnswer(noData)
            //console.log(response)

            if (response.data.success) {
                navigate('/step3')
            }

            // Update status with successful submission data
            setSubmissionStatus({
                isSubmitting: false,
                isSubmitted: true,
                error: null,
            });
        } catch (error) {
            console.error('Error submitting form:', error);

            // Update status with error information
            setSubmissionStatus({
                isSubmitting: false,
                isSubmitted: false,
                error: error.response?.data?.message || 'An error occurred while submitting your data.',
            });
        }

    }