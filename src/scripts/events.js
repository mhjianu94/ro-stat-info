export const handleClick = () => {
    console.log("Butonul a fost apăsat!");
}

document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('ButtonTest');
    if (button) {
        button.addEventListener('click', handleClick);
    }
});

