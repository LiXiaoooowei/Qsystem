
import YouTube from 'react-youtube';
var React = require('react');
var Qlist = require('./components/Qlist.js');
var Firebase = require('./components/FirebaseClient.js');
var MenuFlat = require('./MenuFlat');
var MenuCollapse = require('./MenuCollapse');

var WINDOW_WIDTH_MOBILE = 480;
var WINDOW_WIDTH_TABLET_PORTRAIT = 768;
var WINDOW_WIDTH_TABLET_LANDSCAPE = 1024;
var WINDOW_WIDTH_LAPTOP = 1600;

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

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: new Array(),
            counter: new Array(),
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
            if (Centry[Centry.length - 1] != -1) {
                items.push(Qentry);
                counters.push(Centry[Centry.length - 1]);
            }
            this.setState({
                "queue": items,
                "counter": counters
            });
        }.bind(this));
        qlistRef.on("child_changed", function (snapshot) {
            var Qentry = snapshot.val().queueNumber;
            var Centry = snapshot.val().servedCounter.split("/");

            items.push(Qentry);
            counters.push(Centry[Centry.length - 1]);

            this.setState({
                "queue": items,
                "counter": counters
            });
        }.bind(this));
        qlistRef.on("child_removed", function (snapshot) {
            var Qentry = snapshot.val().queueNumber;
            var Centry = snapshot.val().servedCounter;
            if (items.indexOf(Qentry) != -1) {
                items.splice(items.indexOf(Qentry), 1);
                counters.splice(counters.indexOf(Centry), 1);
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
    clearAllEntries() {
        var firebaseRef = Firebase.database().ref();
        var qlistRef = firebaseRef.child('Qlist');
        var user1Ref = firebaseRef.child('Users').child("Wo0HpwlrfyXPeU242P4onM9kF8X2");
        var user2Ref = firebaseRef.child('Users').child("fSnr6zLUouVvFTdJMe7lDXT5G8y1");
        firebaseRef.update({
            "Qserving": 0,
            "Qtotal": 0,
            "baseNumber": 0
        });
        user1Ref.update({
            "serving": 0
        });
        user2Ref.update({
            "serving": 0
        });
        qlistRef.remove();
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

    playNext() {
        var index = this.state.urlIndex;
        index = (index+1)%3;
        this.setState({
            urlIndex: index
        });
    }

    render() {
        if (this.state.width > WINDOW_WIDTH_MOBILE) {
            return (<div>
                    <MenuFlat />
                    <div>
                        <YouTube videoId={this.state.urls[this.state.urlIndex]} onEnd={this.playNext} opts={{playerVars: {autoplay: 1}}}/>
                    </div>
                    <div style={this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT ? queue_large : queue_medium}>
                        <Qlist queue={this.state.queue} counter={this.state.counter}/>
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
                        <Qlist queue={this.state.queue} counter={this.state.counter}/>
                    </div>
                </div>
            );
        }
    }
}
