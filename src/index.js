import React from 'react';
import { render } from 'react-dom';
import './index.css';

const PostButton = (props)  => {
  return (
    <button className="new-button" onClick={() => props.handleClick()}>{props.label}</button>
  );
};

const PostText  = (props) => {
  return (
    <div >{props.text}</div>
  );
};

const Post = (props) => {
  return (
    <div>
      <div className="text-output">
        <div className="quotes"><PostText text={props.quote} /></div>
        <div className="authors"><PostText text={props.author} /></div>
        <PostButton className="x" label="x" handleClick={props.removeItem} />
      </div>
    </div>
  );
};

const PostList = (props) => {
  
  console.log(props.postList);
  return (
    <ol className="quotes-list">
      {
        props.postList.filter((data)=>{
          if(props.search == null)
            return data
          else if (data.name.toLowerCase().includes(this.state.search.toLowerCase()) || data.quote.toLowerCase().includes(this.state.search.toLowerCase())){
            return data
          }
        }).map((item, index) =>
          <Post key={index}
            quote={item.quote}
            author={item.author}
            removeItem={() => props.removeItem(index)}
          />
        )
      }
    </ol>
  );
};


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: "",
      author: "",
      search: "",
      items: [{quote: "It is hard to fail, but it is worse never to have tried to succeed.", author: "Theodore Roosevelt"},
        {quote: "Genius is 1% talent and 99% hard work.", author: "Albert Einstein"},
        {quote: "Only put off until tomorrow what you are willing to die having left undone.", author: "Pablo Picasso"}
      ].sort((a,b)=>(a.author.localeCompare(b.author)))
    };
  }

  handleChange(event) {
    if (event.target.name === "quote") {
      this.setState({ quote: event.target.value });
    } else if (event.target.name === "author") {
      this.setState({ author: event.target.value });
    }
  }

  handlechange(event) {
    if (event.target.name === "quote") {
      this.setState({ search: event.target.value });
    } else if (event.target.name === "author") {
      this.setState({ search: event.target.value });
    }
  }

  addItem() {
    this.setState({items: [ ...this.state.items, { quote: this.state.quote, author: this.state.author} ].sort((a,b)=>(a.author.localeCompare(b.author))), quote: "", author: ""});
  }

  removeItem(index) {
    const items = this.state.items.filter((e, idx) => idx !== index); 
    this.setState({ items });
  }

  render() {
    const searchBox = (
      <div className="search-bar">
          <input 
            name="quote"
            value={this.state.quote} 
            placeholder="Search quote..."
            onChange={this.handlechange.bind(this)} 
          /><br></br>
          <input 
            name="author" 
            value={this.state.author} 
            placeholder="Search author..."
            onChange={this.handlechange.bind(this)} 
          />
          <PostList postList={this.state.items}
          removeItem={this.removeItem.bind(this)}
          />
      </div>
    );
   
    return (
      <div className='quotes-list'>
        <h1>Inspire Today</h1>
        <textarea 
          className="quote-input"
          name="quote" 
          value={this.state.quote} 
          placeholder="enter a quote"
          onChange={this.handleChange.bind(this)} 
        /><br></br>
        <input 
          className="author-input"
          name="author" 
          value={this.state.author} 
          placeholder="enter the author"
          onChange={this.handleChange.bind(this)} 
        /><br></br>
        <button className="add-button" onClick={() => this.addItem()}>add</button>
        {searchBox}
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
