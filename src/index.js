import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import _ from 'lodash'

import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyDftM6K1uxXSE5DDZ_V2cqgSmfTBpoWnX4';

YTSearch({key: API_KEY, term: 'barca'}, (videos) => {
	console.log(videos);
});

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [], 
			selectedVideo: null
		};

		this.videoSearch('barca');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos, 
				selectedVideo: videos[0]
			});
		});	
	}

	render() {
		const videoSearch = _.debounce(term => this.videoSearch(term), 300);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList 
					onVideoSelect={video => this.setState({ selectedVideo: video })}
					videos={this.state.videos} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));