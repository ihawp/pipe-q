import { makeFetch, monthIntToString, convertIntToRoman } from './functions.js';

export async function LeaderboardFetch() {
    let q = await makeFetch('http://localhost/project1/php/fetchLeaderboard.php');
    if (q) return q;
}

export default function Leaderboard() {

    this.display = (main, data) => {

        let string = `
            <div id="leaderboard-container">
                <table class="leaderboard flex col">
                    <thead class="leaderboard guide font-0-8 flex c-2">
                        <tr>
                            <td class="rank">Rank</td>
                            <td class="username">Username</td>
                            <td class="enemies">Enemies Defeated</td>
                            <td class="round">Round Lost</td>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        data.forEach((item, key) => {

            string += '<tr class="leaderboard '

            switch (key) {
                case (0):
                    string += 'first';
                    break;
                case (1):
                    string += 'second';
                    break;
                case (2):
                    string += 'third';
                    break;
            }

            let date = new Date(item.timestamp);
            let minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            let hours = date.getHours();
            let amPM = 'AM';
            if (hours > 12) {
                hours -= 12;
                amPM = 'PM';
            }

            string += `
                    font-0-8 flex c-2" title="${monthIntToString(date.getMonth())} ${date.getDate()}, ${date.getFullYear()} ${hours}:${minutes} ${amPM}">
                    <td class="rank">#${key + 1}</td>
                    <td class="username font-0-8">${item.username}</td>
                    <td class="enemies">${item['enemies_defeated']}</td>
                    <td class="round">${convertIntToRoman(item['round_lost'])}</td>
                </tr>
            `
        });

        string += `</tbody></table></div>`;

        main.innerHTML = string;
    }
}

// Could make leaderboard fetch data from leaderboard.php so that it is single page application (or maybe my ihawp.com/api link)