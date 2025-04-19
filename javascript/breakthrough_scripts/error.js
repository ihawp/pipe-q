export default function Error() {
    this.display = function(main, navigation) {
        main.innerHTML = `
            <section id="error404">
                <h1 class="text-center">Error 404: Page does not exist.</h1>
            </section>
        `;
    }
}