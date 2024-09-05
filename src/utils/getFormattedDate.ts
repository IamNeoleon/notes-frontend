export const getFormattedDate = (date: string) => {
    const receivedDate = new Date(date);
    const year = receivedDate.getFullYear();
    const month = (receivedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = receivedDate.getDate().toString().padStart(2, '0');
    const hours = receivedDate.getHours().toString().padStart(2, '0');
    const minutes = receivedDate.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

    return formattedDate;
}