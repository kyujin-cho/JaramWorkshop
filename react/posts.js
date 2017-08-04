import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {posts: []}
    }

    async componentDidMount() {
        const posts = await axios.get('/api/posts')
        this.setState({
            posts: posts.data
        })
    }

    render() {
        return (
        <div>
            <PostList posts={this.state.posts} />
            <button onClick={() => {window.location.href="/write"}}>글 작성</button>
        </div>
        )
    }
}

class PostList extends React.Component {
    render() {
        let posts = <div>Loading Posts... </div>
        console.log(this.props.posts)
         if(this.props.posts) {
            posts = this.props.posts.map((post, index) => {
                return <Post post={post} key={index} />
            })
        }
        return (
            <table className="postList">
                <thead>
                    <tr>
                       <th>번호</th>
                       <th>제목</th>
                       <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {posts}
                </tbody>
            </table>
        )
    }
}

class Post extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.post._id}</td>
                <td><a href={'/posts/' + this.props.post._id}>{this.props.post.title}</a></td>
                <td>{this.props.post.name}</td>
            </tr>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('container'))