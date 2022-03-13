import React from 'react';

function importAll(r) {
    return r.keys().map(r);
  }
  
const QLearnImages = importAll(require.context('./Images/QLearn/', false, /\.(png|jpe?g|svg)$/));
const FilterImages = importAll(require.context('./Images/Filter/', false, /\.(png|jpe?g|svg)$/));
const MoneyPrinterImages = importAll(require.context('./Images/MoneyPrinter/', false, /\.(png|jpe?g|svg)$/));

export function About() {
    return(
        <>
            <div className="main-header">
                <div className="title">
                    <h1>Jayden Nikifork</h1>
                </div>
                <p>My E-Portfolio Site.</p>
            </div>
            <div className="about">
                <h1>About Me</h1>
                <p>
                    Hi, I'm Jayden Nikifork. I'm a first year engineering student at McMaster, planning to specialize in software engineering. I am super passionate about
                    developing software and coding and have created this E-Portfolio website to showcase my coding projects and real life accomplishments. I know
                    the languages C, Java, Python, JavaScript, HTML, CSS, and SQL, many of which I learned in Harvard CS50x. I also have experience using technologies such as 
                    React.js, MySQL, and Flask. For my future, I have aspirations of one day running my own software company to revolutionize the world's educational systems. 
                    Outside of coding I love althletics, especially weight lifting, and track &#38; field, in high school I competed on the track team, and was a leader of the 
                    school's fitness club. Please feel free to take a look around my website and enjoy your stay!
                </p>
            </div>
        </>
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
        return(
            <div className="project-image">
            <button className="prev" onClick={ this.nextImage }>&#60;</button>
                <img src={ this.props.images[this.state.index] } alt="ligma" />
                <button className="next" onClick={ this.nextImage }>&#62;</button>
            </div>
        )
    }
}

export function Projects() {
    return(
        <>
            <div className="main-header projects-title">
                <h1>Featured Work</h1>
            </div>
            <div className="project-container">
                <div className="project-info">
                    <h1>QLearn</h1>
                    <p>
                        I'm sure by now all of us students are tired of the annoying homemade homework websites we are forced to use in our classes. With QLearn, assigning and completing
                        homework is made easy. QLearn is a very simple userfriendly homework Learning Management System in which teachers can post custom announcements and problem sets for their
                        students. Likewise, students can then submit their answers to the problem sets which can then be viewed by the teacher.
                        <br /><br />
                        Developed using: Python, Flask, Jinja2, Bootstrap, MySQL, HTML, and CSS
                    </p>
                </div>
                <ImageShifter images={QLearnImages} />
            </div>
            <div className="project-container">
                <div className="project-info">
                    <h1>Money Printer</h1>
                    <p>
                        Everyone wishes they could discover a way to make quick passive income. Well, the console based application, Money Printer, might just be that. Money Printer is
                        a mock cryptocurrency trading bot that trades on a minutely timeframe. Money Printer acquires data on various coins via Kraken's crypto exchange API, and then calculates
                        formulas for common trading indicators such as the relative strength index. From there, Money Printer searches for trends and signals amongst the indicators in order
                        to determine the opportune buy and sell timings of cryptocurrencies. So far before fees, Money Printer actually has the ability to make money especially during
                        bullish markets, meaning it might be soon time to let it trade on my real portfolio...
                        <br /><br />
                        Developed using: Python, and Kraken exchange API
                    </p>
                </div>
                <ImageShifter images={MoneyPrinterImages} />
            </div>
            <div className="project-container">
                <div className='project-info'>
                    <h1>Photo Filter</h1>
                    <p>
                        Well, Photoshop has definitely beaten me to this idea... Anyways, photo filter is a console based application which can apply various imaging filters
                        to PNG files. The filters include, grayscale, blur, reflection, and edge detection. What the program does, is it takes in a PNG file and filter type via command line
                        arguement, and then writes a new PNG file with the requested filter applied to the requested image.
                        <br /><br />
                        Developed using: C
                    </p>
                </div>
                <ImageShifter images={FilterImages} />
            </div>
        </>
    );
}

export function Additional() {
    return(
        <>
            <div className="main-header projects-title">
                <h1>Additional Work</h1>
            </div>
            <div className="project-container">
                <div className='project-info'>
                    <h1>Spell Checker</h1>
                    <p>
                        Spell checkers are very common amongst many applications, soo why not make my own. Pretty much all this application does is take in 2 text files, one containing
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
        </>
    );
}