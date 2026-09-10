export const getCurrentDate = () => {
    const currentDate = new Date().toLocaleDateString(
        "th-TH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
    return currentDate;
}
