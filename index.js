const seasonAPI = 'http://localhost:3000/seasons'

const episodeAPI = 'http://localhost:3000/episodes'

fetch(seasonAPI)
    .then(res => res.json())
    .then(seasonList => {
        renderAllSeasons(seasonList)
        selectSeason(seasonList[0])
    })

function renderAllSeasons(seasonList) {
    seasonList.forEach(season => renderOneSeason(season))
}

function renderOneSeason(season) {

    const seasonList = document.getElementById('season-list')
    const seasonLink = document.createElement('img')

    seasonLink.src = season.image.medium
    seasonLink.addEventListener('click', (e) => selectSeason(season))

    seasonList.append(seasonLink)
}

function selectSeason(season) {

    const selectedSeason = document.querySelector('.selected-season')
    const seasonName = document.getElementById('season-name')
    const seasonPoster = document.getElementById('season-poster')
    const seasonSummary = document.getElementById('season-summary')
    const episodeList = document.getElementById('episode-list')

    selectedSeason.id = season.number
    seasonName.textContent = `30 Rock: Season ${season.number}`
    seasonPoster.src = season.image.medium
    seasonSummary.innerHTML = season.summary

    episodeList.innerHTML = ''

    fetch(episodeAPI)
        .then(res => res.json())
        .then(episodeList => renderEpisodeList(episodeList))

    function renderEpisodeList(episodeList) {
        episodeList.forEach(episode => renderOneEpisode(episode))
    }

    function renderOneEpisode(episode) {

        const selectedSeason = document.querySelector('.selected-season')
        const episodeList = document.getElementById('episode-list')
        const episodeName = document.createElement('li')


        if (parseInt(episode.season, 10) === parseInt(selectedSeason.id, 10)) {

            // console.log(episode.season)
            // console.log(selectedSeason.id)

            episodeName.textContent = episode.name
            episodeList.append(episodeName)

        }

    }

}

