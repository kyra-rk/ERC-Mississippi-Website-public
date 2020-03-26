/*Results component for Data Portal*/
import React, {Component} from 'react';
/*import ReactDOM from 'react-dom';*/
/*import prettyBytes from 'pretty-bytes';*/
import AnimatedNumber from 'react-animated-number';
import ReactTextTransition, { presets } from "react-text-transition";

const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);


class HomepageStats extends Component {

    static displayName = 'Demo'

    constructor() {
        super();

        this.state = {
            values: [48, 23121, 32, 2.9],
            captions:["Mississippi is ranked 48 among US States",
                      "Mississippi has a median income of $23,121",
                      "32% of people in Mississippi are college educated",
                      "Mississippi has a population of 2.9 million"],
            current_value: 48,
            current_caption:"Rank out of US States",
            updates: 0,
            caption_index: 0
        };
    }

    componentDidMount() {
        {/*this.interval = setInterval(() => this.update(), 3000);*/}
        {/*this.interval = setInterval(() => this.mountUnmount(), 11000);*/}
        this.interval = setInterval(() => {this.setState({
          caption_index: this.state.caption_index + 1,
        });}, 3000);
    }

    update() {
        const {updates, current_value, values} = this.state;
        var index = updates % 4
        this.setState({
            current_value: values[updates],
            updates: updates + 1
        });
    }

    mountUnmount() {
        const {updates} = this.state;

        this.setState({
            updates: updates + 1
        });
    }

    render() {
        const {current_value, captions} = this.state;

        return (
            <div style={{marginTop: 70, align:'center'}}>

                <h2>
                  {`${this.state.values[this.state.caption_index % captions.length]}`.split("").map((n, i) => (
                    <ReactTextTransition
                       key={i}
                       order={+n}
                       text={n}
                       className="big"
                       direction="down"
                       overflow
                       inline
                     />
                   ))}

                   <ReactTextTransition
                   text={captions[this.state.caption_index % captions.length]}
                   spring={presets.gentle}
                   style={{ height: "180px" }}
                   />
                </h2>

              {/*<h3>
                <ReactTextTransition
                text={captions[this.state.caption_index % captions.length]}
                spring={presets.gentle}
                style={{ height: "180px" }}
                />
              </h3>*/}

            </div>

        );
    }
}

export default HomepageStats
{/*ReactDOM.render(<Demo />, document.getElementById('appRoot'));*/}
