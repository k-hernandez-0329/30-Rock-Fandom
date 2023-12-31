const seasonAPI = 'http://localhost:3000/seasons'

const episodeAPI = 'http://localhost:3000/episodes'

let newEpisodeList = []

fetch(seasonAPI)
    .then(res => res.json())
    .then(seasonList => {
        renderAllSeasons(seasonList)
        selectSeason(seasonList[0])
    })

function renderAllSeasons(seasonList) {
    seasonList.forEach(season => {
        renderOneSeason(season)
    })
}

function renderOneSeason(season) {

    const seasonList = document.getElementById('season-list')
    const posterDiv = document.createElement('div')

    const seasonPoster = document.createElement('img')
    const posterCaption = document.createElement('span')

    posterDiv.addEventListener("mouseover", (e) => {
        if (posterCaption.textContent === seasonName)
       { posterCaption.textContent = "Pick me!" }
       else {posterCaption.textContent = seasonName}
    });

    seasonPoster.src = season.image.medium
    seasonPoster.addEventListener('click', (e) => selectSeason(season))

    const seasonName = `Season ${season.number}`
    posterCaption.textContent = seasonName

    posterDiv.className = 'poster-div'
    posterDiv.append(seasonPoster)
    posterDiv.append(posterCaption)

    seasonList.append(posterDiv)

}

function selectSeason(season) {

    const selectedSeason = document.querySelector('.selected-season')
    const seasonName = document.getElementById('season-name')
    const seasonPoster = document.getElementById('season-poster')
    const seasonSummary = document.getElementById('season-summary')
    const episodeList = document.getElementById('episode-list')

    const leftDiv = document.querySelector('.left')
    const middleDiv = document.querySelector('.middle')
    const rightDiv = document.querySelector('.right')
    leftDiv.style.border = `5px solid ${season.color}`
    middleDiv.style.border = `5px solid ${season.color}`
    rightDiv.style.border = `5px solid ${season.color}`

    selectedSeason.id = season.number
    seasonName.textContent = `30 Rock: Season ${season.number}`
    seasonPoster.src = season.image.original
    seasonSummary.innerHTML = season.summary

    episodeList.innerHTML = ''

    


    fetch(episodeAPI)
        .then(res => res.json())
        .then(episodeList => {
            newEpisodeList = episodeList
            renderEpisodeList(newEpisodeList)
        })

    function renderEpisodeList(newEpisodeList) {
        newEpisodeList.forEach(episode => {
            const newKey = "onwatchlist";
            const newValue = false;
            episode[newKey] = newValue;
            renderOneEpisode(episode)
        })

    }

    function renderOneEpisode(episode) {

        const selectedSeason = document.querySelector('.selected-season')
        const episodeList = document.getElementById('episode-list')
        const episodeName = document.createElement('li')
        episodeName.addEventListener('click', (e) => addWatchlist(episode))

        if (parseInt(episode.season, 10) === parseInt(selectedSeason.id, 10)) {

            episodeName.textContent = episode.name
            episodeList.append(episodeName)

        }

        function addWatchlist(episode) {

            if (episode.onwatchlist === false) {
                const watchList = document.getElementById("watchlist")
                const episodeName = document.createElement('li')
                episodeName.textContent = `Season ${episode.season}: ${episode.name}`
                episodeName.addEventListener('click', (e) => {


                    if (confirm('Blerg! Shut it down!')) 
                    {e.target.remove();}
                    else { }
                })
                watchList.append(episodeName)
                episode.onwatchlist = true
            }

            else if (episode.onwatchlist === true) {
                alert("Good God Lemon! You already added this to Watchlist!")
            }
        }

    }

}

 const commentForm = document.getElementById('comment-form')
 const commentList = document.getElementById('comment-list')
   
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault()

        
        const newComment = document.createElement('li')
        
        
        newComment.textContent = e.target.comment.value 
        commentList.append(newComment)

        e.target.reset()
    }
    )