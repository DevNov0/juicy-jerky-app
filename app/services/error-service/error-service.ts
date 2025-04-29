export const ErrorService = {
    logError: (error: any) => {
        console.error("Zachycena chyba:", error);
    },

    handleError: (error: any) => {
        const message = typeof error === "string" ? error : "Něco se pokazilo.";
        alert(message); // Lze nahradit toastem nebo flashMessage
    },
};
