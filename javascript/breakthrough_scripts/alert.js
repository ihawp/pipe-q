export default function Alert() {

    this.alert = document.getElementById('alert-container');

    this.createAlert = function(color, message, fontSize) {
        let alert = document.createElement('div');
        if (fontSize != '') {
            alert.style.fontSize = fontSize;
        }
        alert.classList.add('alert');
        alert.style.backgroundColor = color;
        alert.innerText = message;
        return alert;
    }

    this.sendAlert = (color, message, fontSize) => {

        let alert = this.createAlert(color, message, fontSize);
        this.alert.insertAdjacentElement('beforeend', alert);
        setTimeout(() => alert.remove(), 2000);

    }

}