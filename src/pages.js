import React from 'react';

function importAll(r) {
    return r.keys().map(r);
  }
  
const QLearnImages = importAll(require.context('./Images/QLearn/', false, /\.(png|jpe?g|svg)$/));
const FilterImages = importAll(require.context('./Images/Filter/', false, /\.(png|jpe?g|svg)$/));
const MoneyPrinterImages = importAll(require.context('./Images/MoneyPrinter/', false, /\.(png|jpe?g|svg)$/));
const CollisionSimImages = importAll(require.context('./Images/CollisionSim/', false, /\.(png|jpe?g|svg|gif)$/));

export function About() {
    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className="main-header">
                <div className="title">
                    <h1>Jayden Nikifork</h1>
                </div>
                <p>My E-Portfolio Site.</p>
            </div>
            <div className="about">
                <h1>About Me</h1>
                <p>
                    Hi, I'm Jayden Nikifork. I'm a computer science student at the University of Waterloo. I am super passionate about
                    developing software and coding, so I created this E-Portfolio website to showcase my projects. I know
                    the languages C/C++, Java, Python, JavaScript, HTML, CSS, and SQL, and I also have experience using technologies such as 
                    ReactJS, Node.js, Firebase, MySQL, Django, and Flask. For my future, I have aspirations of one day running my own software company to revolutionize the world's educational systems. 
                    Outside of coding I love althletics, especially weight lifting, and track &#38; field. In high school I competed on the track team, and was a leader of the 
                    school's fitness club. Please feel free to take a look around my website and enjoy your stay!
                </p>
            </div>
        </div>
    );
}

class ImageShifter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    nextImage = () => {
        this.setState({ index: (this.state.index + 1) % this.props.images.length });
    }

    prevImage = () => {
        this.setState({ index: (this.state.index - 1) % this.props.images.length });
    }

    render() {
        if (this.props.images.length > 1) {
            return(
                <div className="project-image">
                <button className="prev" onClick={ this.nextImage }>&#60;</button>
                    <img src={ this.props.images[this.state.index] } alt="project pics" />
                    <button className="next" onClick={ this.nextImage }>&#62;</button>
                </div>
            )
        }
        else {
            return(
                <div className="project-image">
                    <img src={ this.props.images[this.state.index] } alt="project pics" />
                </div>
            )
        }
    }
}

export function Projects() {
    return(
        <>
            <div className='page'>
                <div className="main-header">
                    <div className='projects-title'>
                        <h1>Featured Projects</h1>
                    </div>
                </div>
                <div className="project-container">
                    <div className="project-info">
                        <h1>QLearn</h1>
                        <p>
                            QLearn is a userfriendly learning management system (LMS) inspired by the numerous LMSs I've used as a university student. I typically find that most
                            LMSs lack either an announcements page or a homework assignment page, so I figured I could develop one with both features. Along with those
                            features, QLearn has teacher and student sign up and multi-class enrollment. 
                            <br /><br />
                            Developed using: Python, Flask, Jinja2, Bootstrap, MySQL, HTML, and CSS
                        </p>
                    </div>
                    <ImageShifter images={QLearnImages} />
                </div>
                <div className="project-container">
                    <div className='project-info'>
                        <h1><a href='https://JaydenNikifork.github.io/collision-sim/' className='project-link'>Collision Sim</a><a href='https://github.com/JaydenNikifork/collision-sim' className='github-link'></a></h1>
                        <p>
                            A simulation of 2D inelastic collisions of circles. Upon page load, 4-6 circles are spawned with random attributes such as position,
                            velocity, size, and colour. The graphics were constructed using the React Konva library. Each of the circles are free to move and collide with each other and the edges of the site's viewport. The collision
                            equation factors in each of the circles' directional velocities, radii, and masses to determine the new directional velocities of the
                            circles. In order to make the collisions inelastic, I simply multiplied the final velocities of the circles by a factor of 0.8 in order
                            for them to lose energy. To regain energy however, I implemented a feature which allows the user to increase the velocities of the circles
                            by scrolling either on the x or y direction of the page. To improve the visual effect of the scrolling I used the Smooth-Scrollbar library.
                            Also, I'm sure you already realized it, but I implemented this project as the background for this website!
                            <br /><br />
                            Developed using: JavaScript, HTML, CSS, and React.js
                        </p>
                    </div>
                    <ImageShifter images={CollisionSimImages} />
                </div>
                <div className="project-container">
                    <div className="project-info">
                        <h1>Money Printer</h1>
                        <p>
                            Money Printer is a console based cryptocurrency paper trading bot. The bot is fed minutely price data from the Kraken Cryptocurrency Exchange
                            which is used to calculate trading indicators such as the RSI and MFI which are then used to make trading decisions. The bot typically performs
                            best in markets with clear trends with its highest account gains being 10% in one day. These result have been quite promising and with further
                            optimization it might be time to let Money Printer trade on my real portfolio...
                            <br /><br />
                            Developed using: Python, and Kraken exchange API
                        </p>
                    </div>
                    <ImageShifter images={MoneyPrinterImages} />
                </div>
            </div>
        </>
    );
}

export function Additional() {
    return(
        <>
            <div className='page'>
                <div className="main-header">
                    <div className='projects-title'>
                        <h1>Additional Projects</h1>
                    </div>
                </div>
                <div className="project-container">
                    <div className='project-info'>
                        <h1>Photo Filter</h1>
                        <p>
                            Well, Photoshop has definitely beaten me to this idea... Anyways, photo filter is a console based application which can apply various imaging filters
                            to SVG files. The filters include, grayscale, blur, reflection, and edge detection. What the program does, is it takes in a SVG file and filter type via command line
                            arguement, and then writes a new PNG file with the requested filter applied to the requested image.
                            <br /><br />
                            Developed using: C
                        </p>
                    </div>
                    <ImageShifter images={FilterImages} />
                </div>
                <div className="project-container">
                    <div className='project-info'>
                        <h1>Spell Checker</h1>
                        <p>
                            Spell checkers are very common amongst many applications, soo why not make my own. Pretty much all this application does is take in 2 text file locations as input, one containing
                            a piece of text to be spell checked, and another that contains a dictionary, then a list of words that are spelled wrong are printed in the console. The 
                            application then formats the dictionary into a hash table which significantly reduces runtime. From there the program runs through the text and checks each 
                            word to see if it also exists in the hash table, if not the word is considered misspelled and is printed in the console.
                            <br /><br />
                            Developed using: C
                        </p>
                    </div>
                </div>
                <div className="project-container">
                    <div className='project-info'>
                        <h1>Battleship</h1>
                        <p>
                        Player vs. AI Battleship game
                        <br />
                        Developed using: Java
                        </p>
                    </div>
                </div>
                <div className="project-container">
                    <div className='project-info'>
                        <h1>Chess</h1>
                        <p>
                        2 Player Chess game
                        <br />
                        Developed using: Java
                        </p>
                    </div>
                </div>
                <div className="project-container">
                    <div className='project-info'>
                        <h1>Sudoku</h1>
                        <p>
                        Developed using: Python
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

const buttonList = [
    ["About Me", 0],
    ["Featured Projects", 1],
    ["Additional Projects", 2],
  ];
  
 export class Page extends React.Component {
    constructor() {
      super();
      this.pages = [
        <About />,
        <Projects />,
        <Additional />
      ];
      this.buttons = buttonList.map(function(item, index) {
        return(
          <button className="button" key={index} onClick={() => this.handleClick(index)}>{item[0]}</button>
        );
      }, this);
      this.state = {
        page: this.pages[0]
      };
    }  
    
    handleClick(index) {
      this.setState({page: this.pages[index]});
    }
  
    render() {
      return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div className="tab-bar">
            {this.buttons}
          </div>
          {this.state.page}
        </div>
      );
    }
  }