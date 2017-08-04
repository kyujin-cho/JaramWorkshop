import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {post: {}, comments: [], current_comment: -1, name: '', password: '', contents: '', postPassword: '', commentPassword: '', isShowingDeleteField: false}
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
        document.querySelector('.delete_area').setAttribute('style', 'display: none;')
        document.querySelector('.comment_delete_area').setAttribute('style', 'display: none;')
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

    onPostPasswordChange(e) {
        e.preventDefault()
        this.setState({
            postPassword: e.target.value
        })
    }
    
    onCommentPasswordChange(e) {
        e.preventDefault()
        this.setState({
            commentPassword: e.target.value
        })
    }

    async deletePost(e) {
        e.preventDefault()
        const request_body = {
            headers: {
                'X-Password': this.state.postPassword
            }
        }
        const response = await axios.delete('/api/posts/' + this.state.post.id, request_body)
        if(response.data.success)
            window.location.href = '/posts'
        else
            alert('비밀번호가 틀렸어요')
    }

    async deleteComment(e) {
        e.preventDefault()
        const request_body = {
            headers: {
                'X-Password': this.state.commentPassword
            }
        }
        const response = await axios.delete('/api/comments/' + this.state.comments[this.state.current_comment].id, request_body)
        if(response.data.success) {
            this.refreshComment()
            this.toggleCommentDeleteArea(-1)
        } else {
            alert('비밀번호가 틀렸어요')
        }
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

    toggleCommentDeleteArea(id) {
        this.setState({
            current_comment: id
        })
        if(this.state.current_comment === -1)
            document.querySelector('.comment_delete_area').setAttribute('style', 'display: none;')
        else
            document.querySelector('.comment_delete_area').removeAttribute('style')
    }

    render() {
        return (
        <div>
            <h1>{'제목:' + this.state.post.title}</h1>
            <h2>{'작성자:' + this.state.post.name}</h2>
            <span>{this.state.post.contents}</span>
            <br />
            <button onClick={() => {
                this.setState({
                    isShowingDeleteField: !this.state.isShowingDeleteField
                }) 
                if(this.state.isShowingDeleteField)
                    document.querySelector(".delete_area").setAttribute("style", "display: none;")
                else
                    document.querySelector(".delete_area").removeAttribute("style")
            }}>삭제하기</button>
            <div className="delete_area">
                <label htmlFor="">글 삭제</label>
                <label htmlFor="post_password">비밀번호를 입력하세요</label>
                <input type="password" onChange={this.onPostPasswordChange.bind(this)} name="post_password" id="post_password"></input>
                <button onClick={this.deletePost.bind(this)}>확인</button>
            </div>

            <div className="comment_delete_area">
                <label htmlFor="">댓글 삭제</label>
                <br />
                <label htmlFor="comment_password">비밀번호를 입력하세요</label>
                <input type="password" onChange={this.onCommentPasswordChange.bind(this)} name="comment_password" id="comment_password"></input>
                <button onClick={this.deleteComment.bind(this)}>확인</button>
                <button onClick={() => {
                    this.toggleCommentDeleteArea(-1)
                }} >취소</button>
            </div>
            
            <h1>댓글</h1>
            <CommentList comments={this.state.comments} delete={this.toggleCommentDeleteArea.bind(this)} />
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
                return <Comment comment={comment} key={index} index={index} delete={this.props.delete} />
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
                <li>{'제목:' + this.props.comment.name} </li>
                <li>{'내용:' + this.props.comment.contents} </li>
                <li><button onClick={() => {
                    this.props.delete(this.props.index)
                }}>삭제</button></li>
            </ul>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('container'))