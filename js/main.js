const newsBoxes = document.getElementById('news-boxes');

// Grabs an array of news data from API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'newsx.p.rapidapi.com',
		'X-RapidAPI-Key': '8428b84edcmshf01bf1574f2b107p19470cjsndb8888e29baa'
	}
};

fetch('https://newsx.p.rapidapi.com/search?limit=10&skip=0', options)
	.then(response => response.json())
	.then(response => mapNews(response))
	.catch(err => console.error(err));

// Map out each API news data and render it inside newsBox div
function mapNews(resp) {
    return resp.map(data => {
        const newsBox = document.createElement('div');
        newsBox.classList.add('news-box');
        newsBox.innerHTML = `
            <img class="news-img" src="${data.image}" alt="${data.title}">
            <div class="content-box">
                <h1 class="news-title"><a href="${data.url}">${data.title}</a></h1>
                <p class="news-summary">${shortenContent(data.summary)}</p>
            </div>
        `
        newsBoxes.appendChild(newsBox);
    })
}

// summary will be shortened to ... after 15th word
function shortenContent(content) {
    if(content.length > 15) {
        return content.split(' ').slice(0, 15).join(' ') + '...';
    }
    else {
        return content;
    }
}