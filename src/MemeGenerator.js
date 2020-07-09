import React from "react"

class MemeGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            isLoaded: false,
            images: [],
            value: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                this.setState({
                    isLoaded: true,
                    images: memes,

                })

            })
    }

    handleChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const randomNumber = Math.floor(Math.random() * this.state.images.length);
        const randomImage = this.state.images[randomNumber].url;
        this.setState(
            {
                randomImage: randomImage
            }
        )
    }

    render() {

        if (!this.state.isLoaded) {
            return (
                <h1>Loading...</h1>
            )
        }
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input value={this.state.topText} 
                    name="topText" 
                    type="text" 
                    placeholder="Top Text"
                    onChange={this.handleChange}/>

                    <input value={this.state.bottomText} 
                    name="bottomText" 
                    type="text" 
                    placeholder="Bottom Text"
                    onChange={this.handleChange}/>
                    <button className="">Gennerate</button>
                </form>
                <div className="meme">
                    <img id="meme-img" src={this.state.randomImage} alt="..."/>
                    <h2 className="top">
                        {this.state.topText}
                    </h2>
                    <h2 className="bottom">
                        {this.state.bottomText}
                    </h2>
                </div>
            </div>


        )
    }
}

export default MemeGenerator