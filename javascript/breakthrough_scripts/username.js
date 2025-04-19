export default function Username(sendAlert) {

    this.sendAlert = sendAlert;
    this.name = 'Anonymous';

    if (localStorage.getItem('username')) {
        this.name = localStorage.getItem('username');
    }

    this.form = undefined;
    this.timeoutId = undefined;
    this.regex = new RegExp("^[A-Za-z]+$");

    this.display = function(main) {

        main.innerHTML = `
            <div id="usernameForm" class="gap-0-5 flex col content">
                <div class="flex justify-center question">
                    <svg class="first" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                </div>
                <h1 class="text-center">Profile</h1>
                <form id="username-form" class="flex col">
                    <label for="username-input" class="font-0-8">Change Username:</label>
                    <div>
                        <input class="b-1-2 c-2 boldonse" type="text" id="username-input" pattern="^[A-Za-z]+$" value="" placeholder="${this.name}" name="username" minlength="1" maxlength="16" required>
                        <button class="b-1-2 c-1 bg-2 boldonse" type="submit">Update</button>
                    </div>
                </form>
            </div>
        `;
        
        this.form = document.getElementById('username-form');
        this.currentName = document.getElementById('username-current');
    
        this.form.addEventListener('submit', (event) => {
    
            event.preventDefault();
    
            let data = new FormData(this.form);
            let name = data.get('username');
    
            if (name.length > 0 && name.length < 17 && this.regex.test(name)) {
    
                localStorage.setItem('username', name);
                
                let input = this.form[0];
                input.value = '';
                this.name = input.placeholder = name;
    
                this.sendAlert('#16A34A', 'Success!');

            } else {
    
                this.sendAlert('#F10040', 'Error.');
    
            }
    
        });
    
    }

}