class UserInfo {
    constructor(accessToken) {
        this.accessToken = accessToken;
        this.user;

        if (this.accessToken !== null) {
            //this.getUserInfo()
            let userInfo;
            fetch('https://api.spotify.com/v1/me', {
                headers: {'Authorization': 'Bearer ' + this.accessToken}
            }).then((response) => response.json()).then((data) => {
                userInfo = data;
                this.user=data;
                return true;
            });
            this.user = userInfo;

            //this.getUserPlaylists()

            fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
                headers: {'Authorization': 'Bearer ' + this.accessToken}
            }).then((response) => response.json())
                .then((data) => {
                    let playlists = data.items;
                    let mapPlaylists = new Map();
                    if (playlists) {
                        playlists.forEach((playlist, index) => {
                            mapPlaylists.set(playlist.id, playlist);
                        });
                    }
                    this.playlists = mapPlaylists;
                    this.ownedPlaylists = Array.from(this.playlists).filter((playlist) => playlist[1].owner.id === this.user.id)
                    this.collaborativePlaylists = Array.from(this.playlists).filter((playlist) => playlist[1].collaborative === true)
                    this.followedPlaylists = Array.from(this.playlists).filter((playlist) => playlist[1].owner.id !== this.user.id)
                    this.editablePlaylists = this.ownedPlaylists.join(this.collaborativePlaylists);
                });
        }
    }

    getUserInfo() {
        this.user = fetch('https://api.spotify.com/v1/me', {
            headers: {'Authorization': 'Bearer ' + this.accessToken}
        }).then((response) => response.json()).then((data) => {
            this.user = data;
            return true;
        });
    }

    getUserPlaylists() {
        fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
            headers: {'Authorization': 'Bearer ' + this.accessToken}
        }).then((response) => response.json())
            .then((data) => {
                let playlists = data.items;
                let mapPlaylists = new Map();
                if (playlists) {
                    playlists.forEach((playlist, index) => {
                        mapPlaylists.set(playlist.id, playlist);
                    });
                }
                this.playlists = mapPlaylists;
                this.ownedPlaylists = Array.from(this.playlists).filter((playlist) => playlist[1].owner.id === this.user.id)
                this.collaborativePlaylists = Array.from(this.playlists).filter((playlist) => playlist[1].collaborative === true)
                this.followedPlaylists = Array.from(this.playlists).filter((playlist) => playlist[1].owner.id !== this.user.id)
                this.editablePlaylists = this.ownedPlaylists.join(this.collaborativePlaylists);
            });
    }

    updatePlaylists(songs, playlists) {
        const songsUris = songs.join(',');
        let playlistsPromises = [];
        playlists.forEach((playlist, index) => {
            let api_url = 'https://api.spotify.com/v1/playlists/' + playlist[0] + '/tracks?uris=' + songsUris;
            playlistsPromises[index] = fetch(api_url, {
                method: 'POST',
                headers: {'Authorization': 'Bearer ' + this.accessToken, 'Accept': 'application/json'}
            }).then((response) => response.json()).then((data) => {
                return true;
            }).catch(err => console.log('There was an error:' + err));
        });

        Promise.all(playlistsPromises).then(() => {
            alert("Playlists updated");
        });
        return true;
    }
}

export default UserInfo;
