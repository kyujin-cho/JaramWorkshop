import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {post: {}, comments: [], name: '', password: '', contents: ''}
    }

    async refreshComment() {
        console.log(this.state.post)
        const comments = await axios.get('/api/posts/' + this.state.post.id + '/comments')
        this.setState({
            comments: comments.data
        })
        console.log(comments.data)
    }
    async componentDidMount() {
        const path = window.location.pathname
        const num = path.match(/\/posts\/[0-9]+/)[0].replace('/posts/', '')
        const post = await axios.get('/api/posts/' + num)
        this.setState({
            post: post.data
        })
        await this.refreshComment()
    }

    onNameChange(e) {
        e.preventDefault()
        this.setState({
            name: e.target.value
        })
    }

    onPasswordChange(e) {
        e.preventDefault()
        this.setState({
            password: e.target.value
        })
    }

    onContentsChange(e) {
        e.preventDefault()
        this.setState({
            contents: e.target.value
        })
    }

    async sendComment(e) {
        e.preventDefault()
        const request_body = {
            name: this.state.name,
            contents: this.state.contents,
            password: this.state.password,
            post_id: this.state.post.id
        }
        console.log(request_body)
        const response = await axios.post('/api/comments', request_body)
        await this.refreshComment()
    }

    render() {
        return (
        <div>
            <h1>{'제목:' + this.state.post.title}</h1>
            <h2>{'작성자:' + this.state.post.name}</h2>
            <span>{this.state.post.contents}</span>
            <CommentList comments={this.state.comments} />
            <div>
                <label htmlFor="name">이름</label>
                <input type="text" onChange={this.onNameChange.bind(this)} id="name" name="name"></input>
                <label htmlFor="password">비밀번호</label>
                <input type="password" onChange={this.onPasswordChange.bind(this)} id="password" name="password"></input>
                <label htmlFor="contents">내용</label>
                <input onChange={this.onContentsChange.bind(this)} id="contents" name="contents"></input>
                <button onClick={this.sendComment.bind(this)}>전송</button>
            </div>
        </div>
        )
    }
}

class CommentList extends React.Component {
    render() {
        let comments = <div>Loading Posts... </div>
         if(this.props.comments) {
            comments = this.props.comments.map((comment, index) => {
                return <Comment comment={comment} key={index} />
            })
        }
        return (
            <ul>
                {comments}
            </ul>
        )
    }
}

class Comment extends React.Component {
    render() {
        return (
            <ul>
                <li>{this.props.comment.name} </li>
                <li>{this.props.comment.contents} </li>
            </ul>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('container'))