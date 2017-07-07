
import YouTube from 'react-youtube';
var React = require('react');
var Qlist = require('./components/Qlist.js');
var Firebase = require('./components/FirebaseClient.js');
var MenuFlat = require('./MenuFlat');
var MenuCollapse = require('./MenuCollapse');
var Rates = require('./components/Rates');

var WINDOW_WIDTH_MOBILE = 480;
var WINDOW_WIDTH_TABLET_PORTRAIT = 768;
var WINDOW_WIDTH_TABLET_LANDSCAPE = 1024;
var WINDOW_WIDTH_LAPTOP = 1600;
var WINDOW_HEIGHT = 540;

var iframe = {
    "height": WINDOW_HEIGHT,
    "width": "70%",
    "margin-right": 0,
    "margin-left": 0,
    "margin-top":0,
    "float": "left"
};
var queue_large = {
	"width": "30%",
	"float": "left",
	"margin-right": "0%",
	"margin-top": "0%"
};

var queue_medium = {
	"width": "80%",
	"float": "left",
	"margin-left": "10%",
	"margin-top": "10%"
};

var rate_large = {
    "width": "70%",
    "float": "left",
    "margin-top": 540 - WINDOW_HEIGHT
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: new Array(),
            counter: new Array(),
            qlist: new Array(),
            urlIndex: 0,
            urls: new Array(),
            height: null,
            width: null,
            player: null,
            hour: null
        };

        this.updateDimensions=this.updateDimensions.bind(this);
        this.onReadyVideo=this.onReadyVideo.bind(this);
        this.playNext=this.playNext.bind(this);
        this.clearAllEntries=this.clearAllEntries.bind(this);
        this.setCurrentHour=this.setCurrentHour.bind(this);
        this.getCurrentHour=this.getCurrentHour.bind(this);
        this.contains = this.contains.bind(this);
    }

    componentWillMount() {
        this.updateDimensions();
        var items = this.state.queue;
        var counters = this.state.counter;
        var firebaseRef = Firebase.database().ref();
        var qlistRef = firebaseRef.child('Qlist');
        var urlRef = firebaseRef.child('VideoURL');

        qlistRef.on("child_added", function (snapshot) {
            var Qentry = snapshot.val().queueNumber;
            var Centry = snapshot.val().servedCounter.split("/");

            this.contains({counter: Centry[Centry.length - 1], queue: Qentry});
        }.bind(this));
        qlistRef.on("child_changed", function (snapshot) {
            var Qentry = snapshot.val().queueNumber;
            var Centry = snapshot.val().servedCounter.split("/");
            document.getElementById('audio').play();

            this.contains({counter: Centry[Centry.length - 1], queue: Qentry});
        }.bind(this));
        qlistRef.on("child_removed", function (snapshot) {
            var Qentry = snapshot.val().queueNumber;

            if (items.indexOf(Qentry) != -1) {
                items.splice(items.indexOf(Qentry), 1);
                counters.splice(items.indexOf(Qentry), 1);
            }
            this.setState({
                "queue": items,
                "counter": counters
            });
        }.bind(this));
        urlRef.on("child_added", function (snapshot) {
            var url = snapshot.val().url;
            var urls_ = this.state.urls;
            urls_.push(url);
            this.setState({
                "urls": urls_
            });
        }.bind(this));
    }
    clearAllEntries() {
        var firebaseRef = Firebase.database().ref();
        var qlistRef = firebaseRef.child('Qlist');

        firebaseRef.update({
            "Qserving": 0,
            "Qtotal": 0,
            "baseNumber": 0
        });

        qlistRef.remove();
    }
    updateDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }
    getCurrentHour() {
        var date = new Date();
        return date.getHours();
    }
    setCurrentHour() {
        var hour_=this.getCurrentHour();
        this.setState({
            hour: hour_
        });
        if(this.state.hour < 6) {
            this.clearAllEntries();
        }
    }

    contains(entry) {
        let array = this.state.qlist;
        let items = this.state.queue;
        let counters = this.state.counter;
        for (let i=0;i<array.length; i++) {
            if(array[i].split('/')[1] == entry['counter']) {
                array.splice(i,1);
                items.splice(i,1);
                counters.splice(i,1);
            }
        }
        if(entry.counter != '-1') {
            array.push('/'+entry.counter+'/'+entry.queue);
            items.push(entry.queue);
            counters.push(entry.counter);
        }
        this.setState({
            qlist: array,
            queue: items,
            counters: counters
        });
        console.log(this.state.qlist);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        var interval = setInterval(this.setCurrentHour,3600000);
        this.setState({
            intervalID: interval
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
        clearInterval(this.state.intervalID);
    }

    onReadyVideo(event) {
        this.setState({
            player: event.target
        });
        this.state.player.playVideo();
    }

    playNext(event) {
        this.state.player.seekTo(-1);
        var index = this.state.urlIndex;
        index = (index+1)%1;
        console.log(index);
        this.setState({
            urlIndex: index
        });
    }

    render() {
        console.log('value in app is'+this.state.qlist);
        iframe["height"] = this.state.width*0.7/1.77;
        rate_large["margin-top"] = iframe["height"] - this.state.height;
        if (this.state.width > WINDOW_WIDTH_MOBILE) {
            return (<div>
                    <MenuFlat />
                    <div style = {iframe}>
                        <YouTube videoId={this.state.urls[this.state.urlIndex]} onReady = {this.onReadyVideo} onEnd = {this.playNext} opts={{playerVars: {autoplay: 1},height: iframe["height"], width: '100%'}}/>
                    </div>
                    <div style={this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT ? queue_large : queue_medium}>
                        <Qlist queue={this.state.queue} counter = {this.state.counter} height = {this.state.height}/>
                    </div>
                    <div style = {rate_large}>
                        <Rates/>
                    </div>
                </div>
            );
        } else {
            return (<div>
                    <MenuCollapse />
                    <div>
                        <YouTube videoId={this.state.urls[this.state.urlIndex]} onEnd={this.playNext}/>
                    </div>
                    <div style={this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT ? queue_large : queue_medium}>
                        <Qlist queue={this.state.queue} counter = {this.state.counter}/>
                    </div>
                </div>
            );
        }
    }
}
