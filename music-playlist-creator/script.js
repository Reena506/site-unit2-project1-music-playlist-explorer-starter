const container = document.querySelector('.playlist-cards');

const createCards = (playlists) => {
  container.innerHTML = '';
  playlists.forEach(p => {
    const card = document.createElement('div');
    card.className = 'playlist-card';
    card.innerHTML = `
      <img src="${p.playlist_art}" alt="${p.playlist_name}" />
      <h3>${p.playlist_name}</h3>
      <p>${p.playlist_author}</p>

      <div class="like-container">
        <span class="like-count">${p.likes}</span>
        <button class="like-btn" data-id="${p.playListID}">❤️</button>
      </div>

      <button class="delete-btn" data-id="${p.playListID}">🗑️ Delete</button>
    `

    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('like-btn')) {
        openModal(p);
      }
    });
    container.appendChild(card);
  });

  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
 const id = +e.target.dataset.id;
      const playlist = playlists.find(pl => pl.playListID === id);
      if (!btn.classList.contains('liked')) {
        playlist.likes++;
        btn.classList.add('liked');
        btn.textContent = '❤️';
      } else {
        playlist.likes--;
        btn.classList.remove('liked');
        btn.textContent = '🎵';
      }
      btn.previousElementSibling.textContent = playlist.likes;
    });
  });


document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = +e.target.dataset.id;
      const index = playlists.findIndex(pl => pl.playListID === id);
      if (index !== -1) {
        playlists.splice(index, 1); 
        createCards(playlists);
      }})})}














const openModal = (playlist) => {
  const modal = document.querySelector('#modal');
  modal.classList.add('show');
  modal.querySelector('.modal-img').src = playlist.playlist_art;
  modal.querySelector('.modal-title').textContent = playlist.playlist_name;
  modal.querySelector('.modal-creator').textContent = playlist.playlist_author;

  const songContainer = modal.querySelector('.modal-songs');
  songContainer.innerHTML = '';
  playlist.songs.forEach(song => {
    const songDiv = document.createElement('div');
    songDiv.className = 'songsec';
    songDiv.innerHTML = `
      <h4>${song.title}</h4>
      <p>${song.artist}</p>
      <p>${song.duration}</p>
    `;
    songContainer.appendChild(songDiv);
  });





  document.getElementById('shuffle-btn').onclick = () => {
    playlist.songs.sort(() => Math.random() - 0.5);
    openModal(playlist);
  };
};

const modal=document.querySelector('#modal')
if (modal){
modal.addEventListener('click', (e) => {
  if (e.target.id === 'modal' || e.target.classList.contains('modal-close')) {
    document.querySelector('#modal').classList.remove('show');
  }
});}

createCards(playlists);


function showRandomPlaylist(playlists) {
 const randomIndex = Math.floor(Math.random() * playlists.length);
 const playlist = playlists[randomIndex];


 const imgElem = document.getElementById('playlist_art');
 imgElem.src = playlist.playlist_art;
 imgElem.alt = playlist.playlist_name;


 const nameElem = document.getElementById('playlist-name');
 nameElem.textContent = playlist.playlist_name;


  const songsElem = document.getElementById('playlist-songs');
 songsElem.innerHTML = ''; 


 playlist.songs.forEach(song => {
   const li = document.createElement('li');
   li.textContent = `${song.title} - ${song.artist}`;
   songsElem.appendChild(li);
 });
}

showRandomPlaylist(playlists);


 
