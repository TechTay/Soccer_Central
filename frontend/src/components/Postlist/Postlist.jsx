import Post from "../post/Post";


const PostList = (props) => {
    return (<ul>
        {props.posts.map( post => <Post post={post}/>)}
    </ul>)
}

export default PostList